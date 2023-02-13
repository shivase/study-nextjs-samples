import { Review } from 'database';
import Image from 'next/image';
import { FC } from 'react';

import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';

import emptyStart from '~/icons/empty-star.png';
import fullStart from '~/icons/full-star.png';
import halfStart from '~/icons/half-star.png';

type StarsProps = {
  reviews: Review[];
  rating?: number;
};

const Stars: FC<StarsProps> = ({ reviews, rating }) => {
  const rate = rating ?? calculateReviewRatingAverage(reviews);

  const renderStarts = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rate - i).toFixed(1));
      if (difference >= 1) stars.push(fullStart);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStart);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStart);
        else stars.push(fullStart);
      } else stars.push(emptyStart);
    }

    return stars.map((star) => {
      return <Image key={star.src} src={star} alt="" className="mr-1 h-4 w-4" />;
    });
  };

  return <div className="flex items-center">{renderStarts()}</div>;
};

export default Stars;
