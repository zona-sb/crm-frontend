import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Table from '../../components/Table/Table';
import CategoryModal from '../../components/categoryModal/CategoryModal';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import './CategoriesPage.css';

const FilterInputName = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
  />
);

const CategoriesPage = () => {
  const categories = useSelector(categoriesSelector.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const data = [
    {
      key: 'categoryTitle',
      name: t('categoriesModal.inputTitle'),
      filter: <FilterInputName />,
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  return (
    <>
      <CategoryModal />
      <div className='d-flex flex-column'>
        <Table categories={data} data={categories} actions={actions} />
        <div className='d-flex justify-content-center'>
          <button
            className='pt-4 custom__category-button'
            onClick={() => dispatch(setCurrentType({ type: 'add' }))}
          >
            {t('categoriesModal.addCategory')}
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
