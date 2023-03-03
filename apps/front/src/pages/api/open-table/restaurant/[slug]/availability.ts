import { NextApiResponse, NextApiRequest } from 'next';

import { prisma } from '@/app/open-table/lib/prisma';
import { findAvailableTables } from '@/services/restaurant/findAvailableTables';

type AvailabilityQueryDAO = {
  slug: string;
  day: string;
  time: string;
  partySize: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { slug, day, time, partySize } = req.query as AvailabilityQueryDAO;

    if (!day || !time || !partySize || !slug) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!restaurant) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      });
    }

    const searchTimesWithTables = await findAvailableTables({ day, time, restaurant, res });

    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: 'Invalid data provided',
      });
    }

    const availabilities = searchTimesWithTables
      .map((t) => {
        const sumSeats = t.tables.reduce((sum, table) => {
          return sum + table.seats;
        }, 0);

        return {
          time: t.time,
          available: sumSeats >= parseInt(partySize),
        };
      })
      .filter((availability) => {
        const timeIsAfterOpeningHour =
          new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restaurant.open_time}`);
        const timeIsBeforeClosingHour =
          new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restaurant.close_time}`);

        return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
      });

    return res.json(availabilities);
  } else {
    return res.status(400).json({
      errorMessage: 'Invalid method',
    });
  }
};

export default handler;
