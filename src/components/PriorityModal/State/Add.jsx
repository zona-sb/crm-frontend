import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { ButtonCustom } from '../../shared';
import { useTranslation } from 'react-i18next';
import getSchema from '../../../utils/validation';

const Add = ({ onHide, handlerSubmit }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    validationSchema: getSchema('createPriority', t)(),
    initialValues: {
      title: '',
      weight: '',
      color: '',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: () => {
      console.log('Send');
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <p className='priority__title'>Создание приоритета</p>
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
          min='0'
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
        <ButtonCustom type='submit'>Создать</ButtonCustom>
        <ButtonCustom color='reject' onClick={onHide}>
          Отмена
        </ButtonCustom>
      </div>
    </Form>
  );
};

export default Add;
