export interface Data {
  reviews: number;
  parkinglot: boolean;
  phone: string;
  image: string;
  restauranttype: string;
  businessname: string;
  address: string;
  slug: string;
  email: string;
  id: number;
  reviewsList: ReviewsList[];
}
[];
export interface ReviewsList {
  id: number;
  author: string;
  comment: string;
  stars: number;
}
[];
