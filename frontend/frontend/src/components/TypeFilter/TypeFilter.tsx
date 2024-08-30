import React from "react";
type Props = {
  selectedtypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
import { hotelTypes } from "../../../config/hotel-options-config";

const TypeFilter = ({ selectedtypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold">Facilities</h4>
      {hotelTypes.map((type) => (
        <label htmlFor="" className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedtypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default TypeFilter;
