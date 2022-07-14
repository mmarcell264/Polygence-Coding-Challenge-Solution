import React from "react";

import {
  FiltersWrapper,
  Orderings,
  CurrencyFilters,
  CurrencyButton,
} from "../styles/ComponentStyles";

export default function CurrencyFilter({ setOrdering, setFilter }) {


  function handleChange(e) {
    const { value } = e.target;

    setOrdering(value);
  }

  function handleClick(e) {
    const { name } = e.target;

    setFilter(name)
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleChange}>
            <option value="-date">Sort by Date descending (default)</option>
            <option value="date">Sort by Date ascending</option>
            <option value="-amount_in_huf">Sort by Amount descending</option>
            <option value="amount_in_huf">Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton name="" onClick={handleClick}>
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton name="HUF " onClick={handleClick}>
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton name="USD" onClick={handleClick}>
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
