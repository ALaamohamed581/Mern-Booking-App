export interface HotelFormData {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  ImagesFiles: FileList;
  Images: string[];
  adultCount: number;
  childCount: number;
}
