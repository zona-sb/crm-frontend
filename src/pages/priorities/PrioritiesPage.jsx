import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import PriorityModal from '../../components/priorityModal/PriorityModal';
import { prioritiesSelector } from '../../store/Priorities/prioritiesSlice';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import './PrioritiesPage.css';
import Table from '../../components/Table/Table';
import ColorFilter from '../../components/priorityModal/ColorFilter/ColorFilter';

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

  return (
    <>
      <PriorityModal />
      <div className='d-flex flex-column'>
        <Table categories={data} data={priorities} actions={actions} />
        <div className='d-flex justify-content-center'>
          <button
            className='pt-4 custom__priority-button'
            onClick={() => dispatch(setCurrentType({ type: 'add' }))}
          >
            + Добавить приоритет
          </button>
        </div>
      </div>
    </>
  );
};

export default PrioritiesPage;
