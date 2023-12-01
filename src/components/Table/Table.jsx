import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import cn from 'classnames';
import { openModal, setCurrentType } from '../../store/Modal/ModalSlice';
import { ButtonCustom, ModalCustom } from '../shared';
import './Table.css';
import ModalBulkDelete from './ModalBulkDelete/ModalBulkDelete';

const Table = (props) => {
  const {
    data,
    categories,
    actions,
    bulkDelete,
    isLoadingData,
    page,
    totalPages,
    getNextPage,
    width = 1000,
    height = 240,
  } = props;
  const bodyRef = useRef(null);
  const targetRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isModalShow, setIsModalShow] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [isShowScrollbar, setIsShowScrollbar] = useState(false);
  const {
    data: { flag },
    status,
    isLoading,
  } = useSelector((state) => state.modal);

  const handleBulkDelete = (mark) => {
    if (mark === 'deleteAll') {
      dispatch(setCurrentType({ type: 'bulkDelete', flag: mark }));
    } else {
      dispatch(setCurrentType({ type: 'bulkDelete' }));
    }
    setIsModalShow((prev) => !prev);
  };

  const handleCheckbox = (e) => {
    const { id, checked } = e.target;
    setCheckedRows([...checkedRows, Number(id)]);
    if (!checked) {
      setCheckedRows(checkedRows.filter((item) => item !== Number(id)));
    }
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setCheckedRows(data.map((li) => li.id));
    if (isCheckAll) {
      setCheckedRows([]);
    }
  };

  useEffect(() => {
    const ids = data.map(({ id }) => id);
    if (ids.length === 0) setIsCheckAll(false);
    setCheckedRows(checkedRows.filter((row) => ids.includes(row)));
  }, [data]);

  const scrollbarRowStyle = cn('main-body', {
    'custom__table-scrollbar-show': isShowScrollbar,
  });

  const scrollbarHeadingStyle = (currentClass) =>
    cn(currentClass, {
      'custom__table-scrollbar-heading': isShowScrollbar,
    });

  useEffect(() => {
    setIsShowScrollbar(bodyRef.current.offsetHeight >= height);
  }, [data, height]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (!isLoadingData) getNextPage();
      }
    }, options);
    if (targetRef.current) observer.observe(targetRef.current);
    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [data]);

  const NotLastPage = page < totalPages;

  const renderRowsCounter = () => (
    <div className='d-flex align-items-center mb-2 mx-2 custom__table-select'>
      <div className='custom__table-select-rows'>
        Выбрано: {checkedRows.length} из {props.data.length}
      </div>
      <div>
        <ButtonCustom
          className='custom__table-delete-button custom__table-part-delete-button'
          onClick={handleBulkDelete}
          color='reject'
          disabled={checkedRows.length === 0}
        >
          {t('table.buttonDelete')}
        </ButtonCustom>
      </div>
      <div>
        <ButtonCustom
          className='custom__table-delete-button'
          onClick={() => handleBulkDelete('deleteAll')}
          color='reject'
        >
          {t('table.buttonAllDelete')}
        </ButtonCustom>
      </div>
      <ModalCustom
        show={isModalShow}
        onHide={() => setIsModalShow((prev) => !prev)}
      >
        {isModalShow && (
          <ModalBulkDelete
            flag={flag}
            partDelete={() => bulkDelete({ ids: checkedRows })}
            allDelete={() => bulkDelete({ deleteAll: true })}
            isLoading={isLoading}
            status={status}
            onHide={() => setIsModalShow((prev) => !prev)}
          />
        )}
      </ModalCustom>
    </div>
  );

  return (
    <div className='wrapper-table-container'>
      <div style={{ maxWidth: `${width}px` }} className='main-container pt-3'>
        <div className='table-container'>
          {renderRowsCounter()}
          <div className='main-header'>
            <div className={scrollbarHeadingStyle('heading')}>
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
            <div className={scrollbarHeadingStyle('filtering')}>
              <div className='filter-item checkbox-item' />
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
            style={{ maxHeight: `${height}px` }}
            className={scrollbarRowStyle}
            ref={bodyRef}
          >
            {data.length ? (
              <>
                {data.map((value) => (
                  <div className='table-row' key={value.id}>
                    <div className='row-item checkbox-item'>
                      <Form.Check
                        className='custom__table-checkbox'
                        type='checkbox'
                        id={value.id}
                        onChange={handleCheckbox}
                        checked={checkedRows.includes(value.id)}
                      />
                    </div>
                    <div className='custom__table-row'>
                      {categories.map((cat) => {
                        const accessKey = cat.key
                          .split('.')
                          .reduce((acc, key) => acc[key], value);
                        return (
                          <React.Fragment key={cat.key}>
                            <div className='mobile__table-row-info-each'>
                              <div className='d-flex align-item-center'>
                                <span className='fw-bold pe-2'>
                                  {cat.name}:
                                </span>
                                {cat.customTag ? (
                                  <cat.customTag
                                    style={cat.customCell(accessKey)}
                                  />
                                ) : (
                                  <span>{accessKey}</span>
                                )}
                              </div>
                            </div>
                            <div className='row-item' style={cat.customStyle}>
                              {cat.customTag ? (
                                <cat.customTag
                                  style={cat.customCell(accessKey)}
                                />
                              ) : (
                                accessKey
                              )}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <div className='row-item justify-content-around rows-buttons'>
                      <div className='custom__table-wrapper-actions-button'>
                        <BsPencilFill
                          className='custom__table-actions-button'
                          onClick={() => {
                            dispatch(openModal());
                            dispatch(
                              setCurrentType({
                                type: actions.edit,
                                id: value.id,
                              })
                            );
                          }}
                        />
                      </div>
                      <div className='custom__table-wrapper-actions-button'>
                        <BsTrashFill
                          className='custom__table-actions-button'
                          onClick={() => {
                            dispatch(openModal());
                            dispatch(
                              setCurrentType({
                                type: actions.delete,
                                id: value.id,
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {NotLastPage && <div ref={targetRef} />}
              </>
            ) : (
              <div>Отсутствуют данные для отображения</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
