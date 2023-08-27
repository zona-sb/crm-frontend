import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import PriorityModal from '../../components/priorityModal/PriorityModal';
import { prioritiesSelector } from '../../store/Priorities/prioritiesSlice';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import Table from '../../components/Table/Table';
import ColorFilter from '../../components/priorityModal/ColorFilter/ColorFilter';
import {
  deletePriority,
  getPriorities,
} from '../../store/Priorities/prioritiesSaga';

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

const PrioritiesPage = () => {
  const priorities = useSelector(prioritiesSelector.selectAll);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getPriorities());
  }, [dispatch]);

  const data = [
    {
      key: 'title',
      name: 'Наименование',
      filter: <FilterInputName />,
    },
    {
      key: 'weight',
      name: 'Номер приоритета',
      filter: <FilterInputWeight />,
    },
    {
      key: 'color',
      name: 'Цвет',
      customStyle: { flex: 0, minWidth: '70px' },
      filter: <ColorFilter data={priorities} />,
      customTag: 'div',
      customCell: (color) => ({
        width: '20px',
        height: '20px',
        backgroundColor: color,
      }),
    },
  ];

  const actions = {
    delete: 'delete',
    edit: 'edit',
  };

  const handlerDelete = (deleteData) => {
    dispatch(deletePriority(deleteData));
  };

  return (
    <>
      <PriorityModal />
      <div className='d-flex flex-column'>
        <Table
          categories={data}
          data={priorities}
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
            {t('prioritiesModal.buttonAdd')}
          </button>
        </div>
      </div>
    </>
  );
};

export default PrioritiesPage;
