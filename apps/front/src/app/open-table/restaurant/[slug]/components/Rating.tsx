import { Review } from 'database';
import { FC } from 'react';

import Stars from '@/app/open-table/components/Stars';
import { calculateReviewRatingAverage } from '@/app/open-table/utils/calculateReviewRatingAverage';

type RatingProps = {
  reviews: Review[];
};

const Rating: FC<RatingProps> = ({ reviews }) => {
  const rating = calculateReviewRatingAverage(reviews).toFixed(1);

  return (
    <div className="flex items-end">
      <div className="mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="ml-3 text-reg">{rating}</p>
      </div>
      <div>
        <p className="ml-4 text-reg">
          {reviews.length} Review{reviews.length > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
  Rating;
};

export default Rating;
