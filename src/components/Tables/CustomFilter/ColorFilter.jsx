import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ColorFilter.css';

const ColorFilter = (props) => {
  const data = props.data.map(({ color }) => color);
  const [allPriority, setAllPriority] = useState(data);

  useEffect(() => {
    setAllPriority(data);
  }, [props.data]);
  const [activePriority, setActivePriority] = useState(allPriority[0]);
  console.log(props);
  console.log(props.column.getFilterIndex());
  return (
    <div className='btn-group'>
      <button
        type='button'
        className='btn btn-danger dropdown-toggle custom-button'
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
      <ul className='dropdown-menu custom-dropdown'>
        {allPriority.map((color, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setActivePriority(color);
                props.column.setFilterValue(color);
              }}
              className='btn custom-dropdown-button'
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: color,
              }}
            />
          </li>
        ))}
      </ul>
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
