import { FilterProps } from 'src/types/types';

export default function Filter({ regions, onChange }: FilterProps) {
  return (
    <label>
      {'Region '}
      <select
        onChange={(e) => onChange(e.target.value)}
        name="regions"
        id="regions"
      >
        <option>All</option>
        {regions.map((region) => (
          <option key={region}>{region}</option>
        ))}
      </select>
    </label>
  );
}
