import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { closeModal } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import './TaskModal.css';
import { getCategories } from '../../store/Tasks/tasksSaga';
import { categoriesSelector } from '../../store/Categories/categoriesSlice';

const TaskModal = (props) => {
  const { category } = props;
  // const tasks = useSelector(tasksSelector.selectAll);
  const categories = useSelector(categoriesSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const modals = {
    add: Add,
    // delete: Delete,
    // edit: Edit,
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  // useEffect(() => {
  //   if (category !== null) {
  //     const objCategoryId = { id: category };
  //     dispatch(getTasks(objCategoryId));
  //   }
  // }, [category]);
  const CurrentModal = modals[data.type];

  return (
    <ModalCustom show={isModalShow} onHide={() => dispatch(closeModal())}>
      {isModalShow && (
        <CurrentModal
          id={data.id}
          data={categories}
          isLoading={isLoading}
          status={status}
          onHide={() => dispatch(closeModal())}
          categoryId={category}
        />
      )}
    </ModalCustom>
  );
};

export default TaskModal;
