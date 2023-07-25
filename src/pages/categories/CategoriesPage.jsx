import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import CategoryModal from '../../components/categoryModal/CategoryModal';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import './CategoriesPage.css';
import { ButtonCustom } from '../../components/shared';

const CategoriesPage = () => {
  const categories = useSelector(categoriesSelector.selectAll);
  const dispatch = useDispatch();
  return (
    <>
      <CategoryModal />
      <div className='d-flex align-items-center flex-column'>
        <ButtonCustom
          className='custom__button-tables'
          onClick={() => dispatch(setCurrentType({ type: 'add' }))}
        >
          + Добавить категорию
        </ButtonCustom>
        {categories.map(({ categoryTitle, id }) => (
          <div
            className='d-flex align-items-center justify-content-around test__style rounded'
            key={id}
          >
            <div>Наименование: {categoryTitle}</div>
            <BsPencilFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'edit', id }));
              }}
            />
            <BsTrashFill
              style={{ cursor: 'pointer' }}
              onClick={() => {
                dispatch(setCurrentType({ type: 'delete', id }));
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
