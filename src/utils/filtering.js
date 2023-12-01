const filtering = (data, filterValue, setFilterValue) => {
  const newFilter = data;
  if (newFilter.value.trim().length === 0) {
    newFilter.value = null;
  }
  setFilterValue({ ...filterValue, [newFilter.key]: newFilter.value });
};

export default filtering;
