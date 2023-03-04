'use client';

import { BsFillMoonFill } from 'react-icons/bs';
import { MdLightMode } from 'react-icons/md';

import useTheme from '../hooks/useTheme';

export const DarkModeSwitch = () => {
  const { currentTheme, setTheme } = useTheme();

  return currentTheme === 'dark' ? (
    <MdLightMode
      className="cursor-pointer text-lg hover:text-amber-500"
      onClick={() => setTheme('light')}
    />
  ) : (
    <BsFillMoonFill
      className="cursor-pointer text-lg hover:text-amber-500"
      onClick={() => setTheme('dark')}
    />
  );
};
