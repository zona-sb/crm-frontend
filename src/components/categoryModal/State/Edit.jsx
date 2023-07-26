import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { updateCategory } from '../../../store/Categories/categoriesSaga';
import getSchema from '../../../utils/validation';
import { categoriesSelector } from '../../../store/Categories/categoriesSlice';

const Edit = ({ onHide, id, data, status, isLoading }) => {
  const currentCategory = useSelector((state) =>
    categoriesSelector.selectById(state, id)
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: getSchema('modifyCategory', t, data)(),
    initialValues: {
      categoryTitle: currentCategory.categoryTitle,
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: (userData) => {
      const updateData = { ...userData, id: currentCategory.id };
      dispatch(updateCategory(updateData));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <p className='priority__title'>{t('categoriesModal.editTitle')}</p>
      {status === 'idle' && (
        <>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='categoryTitle' className='priority__lables'>
              {t('categoriesModal.inputTitle')}
            </Form.Label>
            <Form.Control
              type='text'
              id='categoryTitle'
              isInvalid={formik.errors.title && formik.touched.title}
              onChange={formik.handleChange('categoryTitle')}
              value={formik.values.categoryTitle}
              onBlur={formik.handleBlur('categoryTitle')}
              className='priority__input'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.errors.categoryTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <ButtonCustom type='submit' disabled={isLoading}>
              {t('categoriesModal.buttonSave')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('categoriesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('categoriesModal.successEditText')}</p>
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

export default Edit;
