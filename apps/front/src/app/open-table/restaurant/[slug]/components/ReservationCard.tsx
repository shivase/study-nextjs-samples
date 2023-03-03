'use client';

import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';

import { partySizes, times } from '@/app/open-table/data';
import useAvailabilities from '@/app/open-table/hooks/useAvailabilities';
import { convertToDisplayTime } from '@/app/open-table/utils/convertToDisplayTime';

type ReservationCardProps = {
  open_time: string;
  close_time: string;
  slug: string;
};

const ReservationCard: FC<ReservationCardProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data, loading, fetchAvailabilities } = useAvailabilities();
  const [time, setTime] = useState(props.open_time);
  const [partySize, setPartySize] = useState('2');
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0]);
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  };

  const handleClick = async () => {
    fetchAvailabilities({ slug: props.slug, day, time, partySize });
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithInWindow: typeof times = [];

    let isWithinWindow = false;
    times.forEach((time) => {
      if (time.time === props.open_time) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithInWindow.push(time);
      }
      if (time.time === props.close_time) {
        isWithinWindow = false;
      }
    });

    return timesWithInWindow;
  };

  return (
    <div className="fixed w-[30%] rounded bg-white p-3 shadow">
      <div className="border-b pb-2 text-center font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="size">Party size</label>
        <select
          name=""
          className="border-b py-3 font-light"
          id="size"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}>
          {partySizes.map((party) => (
            <option key={party.label} value={party.value}>
              {party.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[48%] flex-col">
          <label htmlFor="date">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="w-24 border-b py-3 text-reg font-light"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex w-[48%] flex-col">
          <label htmlFor="time">Time</label>
          <select
            name=""
            id="time"
            className="border-b py-3 font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}>
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="h-16 w-full rounded bg-red-600 px-4 font-bold text-white"
          onClick={handleClick}
          disabled={loading}>
          {loading ? <CircularProgress color="inherit" /> : 'Find a Time'}
        </button>
      </div>
      {data?.length && (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="mt-2 flex flex-wrap">
            {data.map((time) => {
              return time.available ? (
                <Link
                  key={time.time}
                  href={`/open-table/reserve/${props.slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="mb-3 mr-3 w-24 cursor-pointer rounded bg-red-600 p-2 text-center text-white">
                  <p className="text-sm font-bold">{convertToDisplayTime(time.time)}</p>
                </Link>
              ) : (
                <p className="mb-3 mr-3 w-24 rounded bg-gray-300 p-2"></p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
