'use client';

import { CircularProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import useReservation from '../../../hooks/useReservation';

type FormProps = {
  slug: string;
  date: string;
  partySize: string;
};

const Form: FC<FormProps> = ({ slug, date, partySize }) => {
  const { loading, createReservation } = useReservation();
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    booker_first_name: '',
    booker_last_name: '',
    booker_phone: '',
    booker_email: '',
    booker_occasion: '',
    booker_request: '',
  });

  useEffect(() => {
    if (
      inputs.booker_first_name &&
      inputs.booker_last_name &&
      inputs.booker_phone &&
      inputs.booker_email
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const [day, time] = date.split('T');
    await createReservation({
      slug,
      day,
      time,
      partySize,
      ...inputs,
    });
  };

  return (
    <div className="mt-10 flex w-[660px] flex-wrap justify-between">
      <input
        type="text"
        name="booker_first_name"
        value={inputs.booker_first_name}
        className="mb-4 w-80 rounded border p-3"
        placeholder="First name"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="booker_last_name"
        value={inputs.booker_last_name}
        className="mb-4 w-80 rounded border p-3"
        placeholder="Last name"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="booker_phone"
        value={inputs.booker_phone}
        className="mb-4 w-80 rounded border p-3"
        placeholder="Phone number"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="booker_email"
        value={inputs.booker_email}
        className="mb-4 w-80 rounded border p-3"
        placeholder="Email"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="booker_occasion"
        value={inputs.booker_occasion}
        className="mb-4 w-80 rounded border p-3"
        placeholder="Occasion (optional)"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="booker_request"
        value={inputs.booker_request}
        className="mb-4 w-80 rounded border p-3"
        placeholder="Requests (optional)"
        onChange={handleChangeInput}
      />

      <button
        className="w-full rounded bg-red-600 p-3 font-bold text-white disabled:bg-gray-300"
        disabled={disabled || loading}
        onClick={handleSubmit}>
        {loading ? <CircularProgress color="inherit" /> : 'Complete reservation'}
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy
        Policy. Standard text message rates may apply. You may opt out of receiving text messages at
        any time.
      </p>
    </div>
  );
};

export default Form;
