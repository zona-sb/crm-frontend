import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Table from '../../components/Table/Table';
import CategoryModal from '../../components/categoryModal/CategoryModal';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import {
  deleteCategory,
  getCategories,
} from '../../store/Categories/categoriesSaga';

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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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

  const handlerDelete = (deleteData) => {
    dispatch(deleteCategory(deleteData));
  };

  return (
    <>
      <CategoryModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={categories}
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
            {t('categoriesModal.addCategory')}
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
