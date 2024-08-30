export interface HotelType {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  Images: string[];
  lastUpdated: Date;
}

export interface hotelSearchReposne {
  data: [
    HotelType[],
    pagnation: {
      total: number;
      page: number;
      pages: number;
    }
  ];
  success: boolean;
  code: number;
  message: string;
}
