import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import cn from 'classnames';
import { setCurrentType } from '../../store/Modal/ModalSlice';
import { ButtonCustom } from '../shared';
import './Table.scss';

const Table = (props) => {
  const {
    data,
    categories,
    actions,
    width = '1000px',
    height = '350px',
  } = props;
  const elementRef = useRef(null);
  const dispatch = useDispatch();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedRow, setCheckedRow] = useState([]);
  const [isShowScrollbar, setIsShowScrollbar] = useState(false);

  const handleCheckbox = (e) => {
    const { id, checked } = e.target;
    setCheckedRow([...checkedRow, Number(id)]);
    if (!checked) {
      setCheckedRow(checkedRow.filter((item) => item !== Number(id)));
    }
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setCheckedRow(data.map((li) => li.id));
    if (isCheckAll) {
      setCheckedRow([]);
    }
  };

  const scrollbarRowStyle = cn('main-body', {
    'custom__table-scrollbar-show': isShowScrollbar,
  });

  const scrollbaHeadingStyle = (currentClass) =>
    cn(currentClass, {
      'custom__table-scrollbar-heading': isShowScrollbar,
    });

  useEffect(() => {
    setIsShowScrollbar(
      elementRef.current.clientWidth < elementRef.current.offsetWidth
    );
  }, [data]);

  useEffect(() => {
    const trackResize = () => {
      setIsShowScrollbar(
        elementRef.current.clientWidth < elementRef.current.offsetWidth
      );
    };

    window.addEventListener('resize', trackResize);

    return () => {
      window.removeEventListener('resize', trackResize);
    };
  });

  const renderRows = () => (
    <div className='d-flex align-items-center mb-2'>
      <div className='custom__table-select-rows me-3'>
        Выбрано: {checkedRow.length} из {props.data.length}
      </div>
      <div>
        <ButtonCustom
          className='custom__table-delete-button'
          color='reject'
          disabled={checkedRow.length === 0}
        >
          Удалить выбранные
        </ButtonCustom>
      </div>
    </div>
  );

  const renderToggle = (id) => (
    <Form.Check
      className='custom__table-checkbox'
      type='checkbox'
      id={id}
      onChange={handleCheckbox}
      checked={checkedRow.includes(id)}
    />
  );

  return (
    <div className='wrapper-table-container'>
      <div style={{ maxWidth: width }} className='main-container pt-3'>
        <div className='table-container'>
          {renderRows()}
          <div className='main-header'>
            <div className={scrollbaHeadingStyle('heading')}>
              <div className='head-item checkbox-item'>
                <Form.Check
                  className='custom__table-checkbox'
                  type='checkbox'
                  id='selectAll'
                  onChange={handleSelectAll}
                  checked={isCheckAll}
                />
              </div>
              {categories.map((cat) => (
                <div
                  key={`head-${cat.key}`}
                  className='head-item'
                  style={cat.customStyle}
                >
                  {cat.name}
                </div>
              ))}
              <div className='head-item'>Действие</div>
            </div>
            <div className={scrollbaHeadingStyle('filtering')}>
              <div className='filter-item checkbox-item invisible'>
                <Form.Check
                  className='custom__table-checkbox'
                  type='checkbox'
                />
              </div>
              {categories.map((cat) => (
                <div
                  key={`filter-${cat.key}`}
                  className='filter-item'
                  style={cat.customStyle}
                >
                  {cat.filter}
                </div>
              ))}
              <div className='filter-item' />
            </div>
          </div>
          <div
            style={{ maxHeight: height }}
            className={scrollbarRowStyle}
            ref={elementRef}
          >
            {data.map((value) => (
              <div className='table-row' key={value.id}>
                <div className='row-item checkbox-item'>
                  {renderToggle(value.id)}
                </div>
                <div className='custom__table-row'>
                  {categories.map((cat) => (
                    <React.Fragment key={cat.key}>
                      <div className='mobile__table-row-info-each'>
                        <div className='d-flex'>
                          <span className='fw-bold pe-2'>{cat.name}:</span>
                          {cat.customTag ? (
                            <cat.customTag
                              style={cat.customCell(value[cat.key])}
                            />
                          ) : (
                            <p>{value[cat.key]}</p>
                          )}
                        </div>
                      </div>
                      <div className='row-item' style={cat.customStyle}>
                        {cat.customTag ? (
                          <cat.customTag
                            style={cat.customCell(value[cat.key])}
                          />
                        ) : (
                          value[cat.key]
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <div className='row-item justify-content-around rows-buttons'>
                  <BsPencilFill
                    style={{
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                    }}
                    onClick={() => {
                      dispatch(
                        setCurrentType({ type: actions.edit, id: value.id })
                      );
                    }}
                  />
                  <BsTrashFill
                    style={{
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                    }}
                    onClick={() => {
                      dispatch(
                        setCurrentType({ type: actions.delete, id: value.id })
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
