import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';
import { getCategories } from '../../store/Categories/categoriesSaga';
import { close } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import './CategoryModal.css';

const CategoryModal = () => {
  const categories = useSelector(categoriesSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };

  const CurrentModal = modals[data.type];

  return (
    <ModalCustom show={isModalShow} onHide={() => dispatch(close())}>
      {isModalShow && (
        <CurrentModal
          id={data.id}
          data={categories}
          isLoading={isLoading}
          status={status}
          onHide={() => dispatch(close())}
        />
      )}
    </ModalCustom>
  );
};

export default CategoryModal;
