import { FilterProps } from 'src/types/types';

export default function Filter({ regions, onChange }: FilterProps) {
  return (
    <>
      <select
        onChange={(e) => onChange(e.target.value)}
        name="regions"
        id="regions"
      >
        <option defaultChecked>All</option>
        {regions.map((region) => (
          <option key={region}>{region}</option>
        ))}
      </select>
    </>
  );
}
