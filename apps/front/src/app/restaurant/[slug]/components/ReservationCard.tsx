'use client';

const ReservationCard = () => {
  return (
    <div className="fixed w-[15%] rounded bg-white p-3 shadow">
      <div className="border-b pb-2 text-center font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="size">Party size</label>
        <select name="" className="border-b py-3 font-light" id="size">
          <option value="">1 person</option>
          <option value="">2 people</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex w-[48%] flex-col">
          <label htmlFor="date">Date</label>
          <input type="text" className="w-28 border-b py-3 font-light" id="date" />
        </div>
        <div className="flex w-[48%] flex-col">
          <label htmlFor="time">Time</label>
          <select name="" id="time" className="border-b py-3 font-light">
            <option value="">7:30 AM</option>
            <option value="">9:30 AM</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="h-16 w-full rounded bg-red-600 px-4 font-bold text-white">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
