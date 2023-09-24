import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
import StatusModal from '../../components/statusModal/StatusModal';
import Table from '../../components/Table/Table';
import { deleteStatus, getStatuses } from '../../store/Statuses/statusesSaga';
import filtering from '../../utils/filtering';

const FilterInputName = ({ titleValue, handlerTitleValue }) => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    value={titleValue ?? ''}
    onChange={(e) =>
      handlerTitleValue({ value: e.target.value, key: 'statusTitle' })
    }
    placeholder='Введите наименование'
  />
);

const FilterInputCategory = ({ categoryTitle, handlerCategoryTitleValue }) => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование категории'
    value={categoryTitle ?? ''}
    onChange={(e) =>
      handlerCategoryTitleValue({ value: e.target.value, key: 'categoryTitle' })
    }
  />
);

const StatusesPage = () => {
  const statuses = useSelector(statusesSelector.selectAll);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState({
    statusTitle: null,
    categoryTitle: null,
  });

  useEffect(() => {
    dispatch(getStatuses(filterValue));
  }, [dispatch, filterValue]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const data = [
    {
      key: 'statusTitle',
      name: 'Наименование',
      customStyle: { minWidth: '200px' },
      filter: (
        <FilterInputName
          titleValue={filterValue.statusTitle}
          handlerTitleValue={(filteredData) =>
            filtering(filteredData, filterValue, setFilterValue)
          }
        />
      ),
    },
    {
      key: 'category.categoryTitle',
      name: 'Категория',
      customStyle: { minWidth: '280px' },
      filter: (
        <FilterInputCategory
          categoryTitle={filterValue.categoryTitle}
          handlerCategoryTitleValue={(filteredData) =>
            filtering(filteredData, filterValue, setFilterValue)
          }
        />
      ),
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  const handlerDelete = (deleteData) => {
    dispatch(deleteStatus(deleteData));
  };

  return (
    <>
      <StatusModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={statuses}
          actions={actions}
          bulkDelete={handlerDelete}
        />
        <div className='d-flex justify-content-center mt-4'>
          <button
            className='custom__add-table-button'
            onClick={() => {
              dispatch(openModal());
              dispatch(setCurrentType({ type: 'add' }));
            }}
          >
            {t('statusesModal.addStatus')}
          </button>
        </div>
      </div>
    </>
  );
};

export default StatusesPage;
