import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { workersSelector } from '../../store/Workers/workersSlice';
import { getWorkers } from '../../store/Workers/workersSaga';
import { close } from '../../store/Modal/ModalSlice';
import { ModalCustom } from '../shared';
import './WorkerModal.css';

const WorkersModal = () => {
  const workers = useSelector(workersSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkers());
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
          data={workers}
          isLoading={isLoading}
          status={status}
          onHide={() => dispatch(close())}
        />
      )}
    </ModalCustom>
  );
};

export default WorkersModal;
