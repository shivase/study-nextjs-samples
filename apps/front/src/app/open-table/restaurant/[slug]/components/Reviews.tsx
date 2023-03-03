import { Review } from 'database';
import { FC } from 'react';

import ReviewCard from './ReviewCard';

type ReviewsPros = {
  reviews: Review[];
};

const Reviews: FC<ReviewsPros> = ({ reviews }) => {
  return (
    <div>
      <h1 className="mt-10 mb-7 border-b-2 pb-5 text-3xl font-bold">
        What {reviews.length} {reviews.length === 1 ? 'person' : 'people'} are saying
      </h1>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
