import { useQuery } from "react-query";
import { useSraechCOntext } from "../../context/searchContext";
import * as apiClient from "../../apis/api-clients";
import { useState } from "react";
import { HotelType } from "../../../../../backend/types";
import SearchResaultCard from "../../components/searchReasualtCard/SearchResaultCard";
import PaginatioN from "../../components/pagination";
import StarRatingFilter from "../../components/starRating cpnent/idex";
import TypeFilter from "../../components/TypeFilter/TypeFilter";
import FacilitiesFilter from "../../components/faciltiesFilter";
import PriceFIlter from "../../components/priceFIlter";
const Search = () => {
  const search = useSraechCOntext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const handelFaciltiyChangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facility = event.target.value;
    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((star) => star != facility)
    );
  };
  const handelStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star != starRating)
    );
  };
  const handletypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typs = event.target.value;
    setTypes((prev) =>
      event.target.checked
        ? [...prev, typs]
        : prev.filter((star) => star != typs)
    );
  };
  const searchParams: apiClient.SearchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    stars: selectedStars,
    types: types,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    page: page.toString(),
    sortOption,
  };
  const fetchHotels = async () => {
    // Assuming apiClient.seachHotels(searchParams) returns a promise
    return apiClient.seachHotels(searchParams);
  };
  const data = useQuery(["searchHotels", searchParams], fetchHotels);

  if (data?.data?.data) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              filter By
            </h3>
            <StarRatingFilter
              selectedStarts={selectedStars}
              onChange={handelStarChange}
            />
            <TypeFilter selectedtypes={types} onChange={handletypesChange} />
            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handelFaciltiyChangeChange}
            />
            <PriceFIlter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {data?.data?.data[1].pagnation
                ? data?.data?.data[1].pagnation
                : ""}{" "}
              Total Hotles
              {search.destination ? ` in ${search.destination}` : ""}
            </span>
            <select
              className="p-2 border rounded-md"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
            >
              <option value="">Sort</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                price per Night(low to high)
              </option>
              <option value="pricePerNightDesc">
                price per Night(high to low)
              </option>
            </select>
          </div>
          {data?.data?.data[0]
            ? data?.data?.data[0].map((hotel: HotelType) => (
                <SearchResaultCard hotel={hotel} />
              ))
            : ""}

          <div>
            <PaginatioN
              page={
                data?.data?.data[1].pagnation ? data?.data?.data[1].page : 1
              }
              pages={
                data?.data?.data[1].pagnation ? data?.data?.data[1].pages : 1
              }
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    );
  }
};
export default Search;
