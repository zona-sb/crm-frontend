import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { closeModal } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import './TaskModal.css';
import { getCategories } from '../../store/Tasks/tasksSaga';

const TaskModal = (props) => {
  const { category } = props;
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const CurrentModal = modals[data.type];

  return (
    <ModalCustom show={isModalShow} onHide={() => dispatch(closeModal())}>
      {isModalShow && (
        <CurrentModal
          id={data.id}
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
