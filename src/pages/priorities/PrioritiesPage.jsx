import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import PriorityModal from '../../components/priorityModal/PriorityModal';
import { prioritiesSelector } from '../../store/Priorities/prioritiesSlice';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import Table from '../../components/Table/Table';
import ColorFilter from '../../components/priorityModal/ColorFilter/ColorFilter';
import {
  deletePriority,
  getPriorities,
} from '../../store/Priorities/prioritiesSaga';
import filtering from '../../utils/filtering';

const FilterInputName = ({ titleValue, handlerTitleValue }) => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
    value={titleValue ?? ''}
    onChange={(e) => handlerTitleValue({ value: e.target.value, key: 'title' })}
  />
);

const FilterInputWeight = ({ weightValue, handlerWeightValue }) => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите номер'
    value={weightValue ?? ''}
    onChange={(e) =>
      handlerWeightValue({ value: e.target.value, key: 'weight' })
    }
  />
);

const PrioritiesPage = () => {
  const priorities = useSelector(prioritiesSelector.selectAll);
  const isLoading = useSelector((state) => state.priorities.isLoading);
  const currentPage = useSelector((state) => state.priorities.currentPage);
  const totalPages = useSelector((state) => state.priorities.totalPages);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState({
    title: null,
    weight: null,
    color: null,
  });

  useEffect(() => {
    const firstPage = {
      ...filterValue,
      page: 1,
    };
    dispatch(getPriorities(firstPage));
  }, [dispatch, filterValue]);

  const data = [
    {
      key: 'title',
      name: 'Наименование',
      filter: (
        <FilterInputName
          titleValue={filterValue.title}
          handlerTitleValue={(filteredData) =>
            filtering(filteredData, filterValue, setFilterValue)
          }
        />
      ),
    },
    {
      key: 'weight',
      name: 'Номер приоритета',
      filter: (
        <FilterInputWeight
          weightValue={filterValue.weight}
          handlerWeightValue={(filteredData) =>
            filtering(filteredData, filterValue, setFilterValue)
          }
        />
      ),
    },
    {
      key: 'color',
      name: 'Цвет',
      customStyle: { flex: 0, minWidth: '70px' },
      filter: (
        <ColorFilter
          data={priorities}
          activePriority={filterValue.color}
          handlerColorValue={(filteredData) =>
            filtering(filteredData, filterValue, setFilterValue)
          }
        />
      ),
      customTag: 'div',
      customCell: (color) => ({
        width: '20px',
        height: '20px',
        backgroundColor: color,
      }),
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  const handlerDelete = (deleteData) => {
    dispatch(deletePriority(deleteData));
  };

  const getNextPage = () => {
    const notFirstPage = {
      ...filterValue,
      page: currentPage + 1,
    };
    dispatch(getPriorities(notFirstPage));
  };

  return (
    <>
      <PriorityModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={priorities}
          actions={actions}
          bulkDelete={handlerDelete}
          page={currentPage}
          totalPages={totalPages}
          isLoadingData={isLoading}
          getNextPage={getNextPage}
        />
        <div className='d-flex justify-content-center mt-4'>
          <button
            className='custom__add-table-button'
            onClick={() => {
              dispatch(openModal());
              dispatch(setCurrentType({ type: 'add' }));
            }}
          >
            {t('prioritiesModal.buttonAdd')}
          </button>
        </div>
      </div>
    </>
  );
};

export default PrioritiesPage;
