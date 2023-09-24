import React, { useEffect, useState } from 'react';
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
import filtering from '../../utils/filtering';

const FilterInputName = ({ titleValue, handlerTitleValue }) => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
    value={titleValue ?? ''}
    onChange={(e) =>
      handlerTitleValue({ value: e.target.value, key: 'categoryTitle' })
    }
  />
);

const CategoriesPage = () => {
  const categories = useSelector(categoriesSelector.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState({
    categoryTitle: null,
  });

  useEffect(() => {
    dispatch(getCategories(filterValue));
  }, [dispatch, filterValue]);

  const data = [
    {
      key: 'categoryTitle',
      name: t('categoriesModal.inputTitle'),
      filter: (
        <FilterInputName
          titleValue={filterValue.categoryTitle}
          handlerTitleValue={(filteredData) =>
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
