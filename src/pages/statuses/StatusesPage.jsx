import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
import StatusModal from '../../components/statusModal/StatusModal';
import Table from '../../components/Table/Table';
import './StatusesPage.css';
import {
  deleteBulkStatuses,
  getStatuses,
} from '../../store/Statuses/statusesSaga';

const FilterInputName = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
  />
);

const FilterInputCategory = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование категории'
  />
);

const StatusesPage = () => {
  const statuses = useSelector(statusesSelector.selectAll);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatuses());
    dispatch(getCategories());
  }, [dispatch]);

  const data = [
    {
      key: 'statusTitle',
      name: 'Наименование',
      customStyle: { minWidth: '200px' },
      filter: <FilterInputName />,
    },
    {
      key: 'category.categoryTitle',
      name: 'Категория',
      customStyle: { minWidth: '280px' },
      filter: <FilterInputCategory />,
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  const handlerBulkDelete = (ids) => {
    dispatch(deleteBulkStatuses(ids));
  };

  return (
    <>
      <StatusModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={statuses}
          actions={actions}
          bulkDelete={handlerBulkDelete}
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
