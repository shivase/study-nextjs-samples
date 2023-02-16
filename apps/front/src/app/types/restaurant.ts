import { Restaurant, Review } from 'database';

import { Time } from '../utils/21.1 convertToDisplayTime';

export type RestaurantInfo = {
  reviews: Review[];
} & Pick<
  Restaurant,
  'id' | 'name' | 'images' | 'description' | 'slug' | 'open_time' | 'close_time'
>;

export type AvailableTime = {
  time: Time;
  available: boolean;
};
