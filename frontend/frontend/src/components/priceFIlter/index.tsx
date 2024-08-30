type Props = {
  selectedPrice: number | undefined;
  onChange: (value?: number) => void;
};

const PriceFIlter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Price</h4>

      <select
        className="p-2 rounded-md w-full"
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
        value={selectedPrice}
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 400, 800, 1000].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFIlter;
