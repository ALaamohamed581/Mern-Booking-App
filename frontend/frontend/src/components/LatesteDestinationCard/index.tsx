import { Link } from "react-router-dom";

type Props = {
  hotel: any;
};

const LatesteDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden hidden-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel ? hotel.Images[0] : ""}
          className="w-full h-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rouded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatesteDestinationCard;
