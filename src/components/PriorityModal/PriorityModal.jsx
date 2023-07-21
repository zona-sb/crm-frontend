import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PriorityModal.css';
import Table from '../Tables/Table';
import { ModalCustom } from '../shared/index';

import Add from './State/Add';
import Delete from './State/Delete';
import Edit from './State/Edit';
import { prioritiesSelector } from '../../store/Priorities/prioritiesSlice';
import { getPriorities } from '../../store/Priorities/prioritiesSaga';
import { close, setCurrentType } from '../../store/Modal/ModalSlice';

const Priority = () => {
  const prioities = useSelector(prioritiesSelector.selectAll);
  const { data, isModalShow, status, isLoading } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPriorities());
  }, []);

  const modals = {
    add: Add,
    delete: Delete,
    edit: Edit,
  };

  const CurrentModal = modals[data.type];

  return (
    <div className='d-flex justify-content-center align-items-center flex-column bg-warning'>
      <Table
        data={prioities}
        onShown={() => {
          dispatch(setCurrentType({ type: 'add' }));
        }}
        onDelete={(id) => {
          dispatch(setCurrentType({ type: 'delete', id }));
        }}
        onEdit={(id) => {
          dispatch(setCurrentType({ type: 'edit', id }));
        }}
      />
      <ModalCustom show={isModalShow} onHide={() => dispatch(close())}>
        {isModalShow && (
          <CurrentModal
            data={prioities}
            id={data.id}
            isLoading={isLoading}
            status={status}
            onHide={() => dispatch(close())}
            // handlerDelete={handlerDelete}
          />
        )}
      </ModalCustom>
    </div>
  );
};

export default Priority;
