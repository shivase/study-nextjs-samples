/* eslint-disable complexity */
import { Booking } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/app/open-table/lib/prisma';
import { findAvailableTables } from '@/app/open-table/services/restaurant/findAvailableTables';

type ReserveQueryDAO = {
  slug: string;
  day: string;
  time: string;
  partySize: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { slug, day, time, partySize } = req.query as ReserveQueryDAO;

    if (!day || !time || !partySize || !slug) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      });
    }

    const {
      booker_first_name,
      booker_last_name,
      booker_email,
      booker_phone,
      booker_occasion,
      booker_request,
    } = req.body as Pick<
      Booking,
      | 'booker_first_name'
      | 'booker_last_name'
      | 'booker_phone'
      | 'booker_email'
      | 'booker_occasion'
      | 'booker_request'
    >;

    if (!booker_first_name || !booker_last_name || !booker_email || !booker_email) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: 'Restaurant not Found',
      });
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}%${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}%${restaurant.close_time}`)
    ) {
      return res.status(400).json({
        errorMessage: 'Restaurant is not open at that time',
      });
    }

    const searchTimesWithTables = await findAvailableTables({ day, time, restaurant, res });

    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      });
    }

    const searchTimeWithTables = searchTimesWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });

    if (!searchTimeWithTables) {
      return res.status(400).json({
        errorMessage: 'No availability, cannot book',
      });
    }

    const tablesCount: { 2: number[]; 4: number[] } = {
      2: [],
      4: [],
    };

    searchTimeWithTables.tables.forEach((table) => {
      if (table.seats === 2) {
        tablesCount[2].push(table.id);
      } else {
        tablesCount[4].push(table.id);
      }
    });

    const tablesToBooks: number[] = [];
    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
      if (seatsRemaining >= 3) {
        if (tablesCount[4].length) {
          tablesToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        } else {
          tablesToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        }
      } else {
        if (tablesCount[2].length) {
          tablesToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining = seatsRemaining - 2;
        } else {
          tablesToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining = seatsRemaining - 4;
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: booker_email,
        booker_phone: booker_phone,
        booker_first_name: booker_first_name,
        booker_last_name: booker_last_name,
        booker_occasion: booker_occasion,
        booker_request: booker_request,
        restaurant_id: restaurant.id,
      },
    });

    const bookingsOnTablesData = tablesToBooks.map((table_id) => {
      return {
        table_id,
        booking_id: booking.id,
      };
    });

    await prisma.bookingsOnTables.createMany({
      data: bookingsOnTablesData,
    });

    res.status(200).json(booking);
  } else {
    return res.status(400).json({
      errorMessage: 'Invalid method',
    });
  }
};

export default handler;
