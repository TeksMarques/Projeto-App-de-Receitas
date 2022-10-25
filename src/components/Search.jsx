import React from 'react';

export default function Search() {
  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Pesquise por receitas"
      />
    </form>
  );
}
