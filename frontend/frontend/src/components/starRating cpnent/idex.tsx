type Props = {
  selectedStarts: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const StarRatingFilter = ({ selectedStarts, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label htmlFor="" className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStarts.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
