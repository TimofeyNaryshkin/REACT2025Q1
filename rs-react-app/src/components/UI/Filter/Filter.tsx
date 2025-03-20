import { memo } from 'react';
import { FilterProps } from 'src/types/types';

const Filter = memo(function Filter({ regions, onChange }: FilterProps) {
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
});

export default Filter;
