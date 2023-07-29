import React from 'react';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import getSchema from '../../../utils/validation';
import { addCategory } from '../../../store/Categories/categoriesSaga';

const Add = ({ onHide, data, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyCategory', t, data)(),
    initialValues: {
      categoryTitle: '',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      dispatch(addCategory(userData));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <p className='caregory__title'>{t('categoriesModal.addTitle')}</p>
      {status === 'idle' && (
        <>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='categoryTitle' className='caregory__lables'>
              {t('categoriesModal.inputTitle')}
            </Form.Label>
            <Form.Control
              type='text'
              id='categoryTitle'
              isInvalid={
                formik.errors.categoryTitle && formik.touched.categoryTitle
              }
              onChange={formik.handleChange('categoryTitle')}
              value={formik.values.categoryTitle}
              onBlur={formik.handleBlur('categoryTitle')}
              className='caregory__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.categoryTitle}
            </Form.Control.Feedback>
          </Form.Group>
          <div className='d-flex justify-content-between'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('categoriesModal.buttonCreate')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('categoriesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('categoriesModal.successCreateText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('categoriesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('categoriesModal.failedText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('categoriesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </Form>
  );
};

export default Add;
