import { FC } from 'react';

type TitleProps = {
  name: string;
};

const Title: FC<TitleProps> = ({ name }) => {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="text-6xl font-bold">{name}</h1>
    </div>
  );
};

export default Title;
