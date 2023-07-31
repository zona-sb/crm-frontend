import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { statusesSelector } from '../../store/Statuses/statusesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
import StatusModal from '../../components/statusModal/StatusModal';
import Table from '../../components/Table/Table';
import './StatusesPage.css';

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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <StatusModal />
      <div className='d-flex flex-column'>
        <Table categories={data} data={statuses} actions={actions} />
        <div className='d-flex justify-content-center'>
          <button
            className='pt-4 custom__priority-button'
            onClick={() => dispatch(setCurrentType({ type: 'add' }))}
          >
            {t('statusesModal.addStatus')}
          </button>
        </div>
      </div>
    </>
  );
};

export default StatusesPage;
