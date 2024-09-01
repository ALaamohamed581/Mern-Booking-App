import { useQuery } from "react-query";
import * as apiClient from "../../apis/api-clients";
import LatesteDestinationCard from "../../components/LatesteDestinationCard";
const Home = () => {
  const { data: hotles } = useQuery("fetchhotels", apiClient.fetchHotels);

  if (hotles) {
    console.log(hotles);
    const topRow = hotles.slice(0, 2) || [];
    const bottomRow = hotles.slice(2) || [];
    return (
      <div className="space-y-3">
        <h2 className="text-3xl">Latest Destinations</h2>
        <p>Most Reacent hotels by our hosts</p>
        <div className="grid gap-4 ">
          <div className="grid md:grid-cols-2 gap-4 ">
            {topRow.map((hotel: any) => {
              return <LatesteDestinationCard hotel={hotel} key={hotel._id} />;
            })}
          </div>
          <div className="grid md:grid-cols-3 gap-4 ">
            {bottomRow.map((hotel: any) => {
              return <LatesteDestinationCard hotel={hotel} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
