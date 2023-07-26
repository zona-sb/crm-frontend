import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { addPriority } from '../../../store/Priorities/prioritiesSaga';
import './CustomProrityModals.css';

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
      <p className='priority__title'>{t('prioritiesModal.addTitle')}</p>
      {status === 'idle' && (
        <>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='title' className='priority__lables'>
              {t('prioritiesModal.inputTitle')}
            </Form.Label>
            <Form.Control
              type='text'
              id='title'
              isInvalid={formik.errors.title && formik.touched.title}
              onChange={formik.handleChange('title')}
              value={formik.values.title}
              onBlur={formik.handleBlur('title')}
              className='priority__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Label htmlFor='weight' className='priority__lables'>
              {t('prioritiesModal.inputWeight')}
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
              className='priority__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.weight}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='d-flex flex-column mb-3'>
            <Form.Label htmlFor='color' className='priority__lables'>
              {t('prioritiesModal.inputColor')}
            </Form.Label>
            <Form.Control
              type='color'
              id='color'
              isInvalid={formik.errors.color && formik.touched.color}
              onChange={formik.handleChange('color')}
              value={formik.values.color}
              onBlur={formik.handleBlur('color')}
              className='priority__input form-control w-100'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.color}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='custom__Priority-many-buttons'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('prioritiesModal.buttonCreate')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('prioritiesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('prioritiesModal.successCreateText')}</p>
          <div className='custom__Priority-button'>
            <ButtonCustom onClick={onHide}>
              {t('prioritiesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('prioritiesModal.failedText')}</p>
          <div className='custom__Priority-button'>
            <ButtonCustom onClick={onHide}>
              {t('prioritiesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </Form>
  );
};

export default Add;
