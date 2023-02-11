import { FC } from 'react';

type ImageProps = {
  images: string[];
};

const Images: FC<ImageProps> = ({ images }) => {
  return (
    <div>
      <h1 className="mt-10 mb-7 border-b pb-5 text-3xl font-bold">
        {images.length} photo{images.length > 1 ? 's' : ''}
      </h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <img key={image} className="mr-1 mb-1 h-44 w-56" src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Images;
