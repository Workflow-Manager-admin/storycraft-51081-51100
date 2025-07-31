import React from "react";

type GenreSelectProps = {
  genres: string[];
  value: string;
  onChange: (val: string) => void;
};

/** 
 * PUBLIC_INTERFACE
 * GenreSelect - Dropdown for genre.
 */
export default function GenreSelect({ genres, value, onChange }: GenreSelectProps) {
  return (
    <label className="block text-sm font-medium mb-1" htmlFor="genre">
      Genre
      <select
        id="genre"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full mt-1 rounded border border-foreground/10 px-3 py-2 bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary focus:outline-none"
      >
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </label>
  );
}
