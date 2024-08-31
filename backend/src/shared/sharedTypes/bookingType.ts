export interface bookingsType {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCoast: number;
  email: string;
}
