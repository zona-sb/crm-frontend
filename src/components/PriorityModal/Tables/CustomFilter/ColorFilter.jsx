import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ColorFilter.css';

const ColorFilter = (props) => {
  const [allPriority, setAllPriority] = useState(
    props.data.map(({ color }) => color)
  );
  const [activePriority, setActivePriority] = useState(allPriority[0]);
  console.log(allPriority);
  console.log(props.column.getFilterIndex());
  return (
    <div className='btn-group dropup'>
      <button
        type='button'
        className='btn btn-secondary dropdown-toggle'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <div
          style={{
            width: '15px',
            height: '15px',
            backgroundColor: activePriority,
          }}
        />
      </button>
      <div className='dropdown-menu'>
        {allPriority.map((color, index) => (
          <div
            key={index}
            style={{
              width: '15px',
              height: '15px',
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// getAggregationFn
// :
// () => {…}
// getAutoAggregationFn
// :
// () => {…}
// getAutoFilterFn
// :
// () => {…}
// getAutoSortDir
// :
// () => {…}
// getAutoSortingFn
// :
// () => {…}
// getCanFilter
// :
// () => {…}
// getCanGlobalFilter
// :
// () => {…}
// getCanGroup
// :
// () => {…}
// getCanHide
// :
// () => {…}
// getCanMultiSort
// :
// () => {…}
// getCanPin
// :
// () => {…}
// getCanResize
// :
// () => {…}
// getCanSort
// :
// () => {…}
// getFacetedMinMaxValues
// :
// () => {…}
// getFacetedRowModel
// :
// () => {…}
// getFacetedUniqueValues
// :
// () => {…}
// getFilterFn
// :
// () => {…}
// getFilterIndex
// :
// () => {…}
// getFilterValue
// :
// () => {…}
// getFirstSortDir
// :
// () => {…}
// getFlatColumns
// :
// () => {…}
// getGroupedIndex
// :
// () => {…}
// getIsFiltered
// :
// () => column.getFilterIndex() > -1
// getIsGrouped
// :
// () => {…}
// getIsPinned
// :
// () => {…}
// getIsResizing
// :
// () => {…}
// getIsSorted
// :
// () => {…}
// getIsVisible
// :
// () => {…}
// getLeafColumns
// :
// () => {…}
// getNextSortingOrder
// :
// multi => {…}
// getPinnedIndex
// :
// () => {…}
// getSize
// :
// () => {…}
// getSortIndex
// :
// () => {…}
// getSortingFn
// :
// () => {…}
// getStart
// :
// position => {…}
// getToggleGroupingHandler
// :
// () => {…}
// getToggleSortingHandler
// :
// () => {…}
// getToggleVisibilityHandler
// :
// () => {…}
// id
// :
// "color"
// parent
// :
// undefined
// pin
// :
// position => {…}
// resetSize
// :
// () => {…}
// setFilterValue
// :
// value => {…}
// toggleGrouping
// :
// () => {…}
// toggleSorting
// :
// (desc, multi) => {…}
// toggleVisibility
// :
// value => {…}

export default ColorFilter;
