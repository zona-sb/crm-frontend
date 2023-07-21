import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonCustom } from '../../shared';
import { useTranslation } from 'react-i18next';
import getSchema from '../../../utils/validation';
import { addPriority } from '../../../store/Priorities/prioritiesSaga';

const Add = ({ onHide, data, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyPriority', t, data)(),
    initialValues: {
      title: '',
      weight: '',
      color: '#cc0000',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      dispatch(addPriority(userData));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <p className='priority__title'>Создание приоритета</p>
      {status === 'idle' && (
        <>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='title' className='priority__lables'>
              Наименование
            </Form.Label>
            <Form.Control
              type='text'
              id='title'
              isInvalid={formik.errors.title && formik.touched.title}
              onChange={formik.handleChange('title')}
              value={formik.values.title}
              onBlur={formik.handleBlur('title')}
              placeholder='Введите наименование'
              className='priority__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='weight' className='priority__lables'>
              Номер приоритета
            </Form.Label>
            <Form.Control
              type='number'
              id='weight'
              min='1'
              step='1'
              isInvalid={formik.errors.weight && formik.touched.weight}
              onChange={formik.handleChange('weight')}
              value={formik.values.weight}
              onBlur={formik.handleBlur('weight')}
              placeholder='Выбрать приоритет'
              className='priority__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.weight}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='d-flex flex-column mb-3'>
            <Form.Label htmlFor='color' className='priority__lables'>
              Цвет
            </Form.Label>
            <Form.Control
              type='color'
              id='color'
              isInvalid={formik.errors.color && formik.touched.color}
              onChange={formik.handleChange('color')}
              value={formik.values.color}
              onBlur={formik.handleBlur('color')}
              placeholder='Выбрать приоритет'
              className='priority__input form-control w-100'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.color}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <ButtonCustom type='submit' disabled={isLoading}>
              Создать
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              Отмена
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>Приоритет был создан!</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>Закрыть</ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>Произошла ошибка!</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>Закрыть</ButtonCustom>
          </div>
        </>
      )}
    </Form>
  );
};

export default Add;
