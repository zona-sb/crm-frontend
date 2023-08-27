import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import WorkerModal from '../../components/workersModal/WorkersModal';
import { workersSelector } from '../../store/Workers/workersSlice';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import Table from '../../components/Table/Table';
import { deleteWorker, getWorkers } from '../../store/Workers/workersSaga';

const FilterInputName = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите наименование'
  />
);

const FilterInputWeight = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите номер'
  />
);
const FilterInputEmail = () => (
  <Form.Control
    className='custom__table-input'
    type='text'
    size='sm'
    placeholder='Введите email'
  />
);

const WorkersPage = () => {
  const workers = useSelector(workersSelector.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getWorkers());
  }, [dispatch]);

  const data = [
    {
      key: 'person.name',
      name: t('workersModal.inputName'),
      filter: <FilterInputName />,
    },
    {
      key: 'person.phone',
      name: t('workersModal.inputPhone'),
      filter: <FilterInputWeight />,
    },
    {
      key: 'person.email',
      name: t('workersModal.inputEmail'),
      filter: <FilterInputEmail />,
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  const handlerDelete = (deleteData) => {
    dispatch(deleteWorker(deleteData));
  };

  return (
    <>
      <WorkerModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={workers}
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
            {t('workersModal.addWorker')}
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkersPage;
