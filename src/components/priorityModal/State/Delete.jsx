import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { deletePriority } from '../../../store/Priorities/prioritiesSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePriority(id));
  };
  return (
    <div>
      <p className='priority__title'>{t('prioritiesModal.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('prioritiesModal.deleteText')}</p>
          <div className='d-flex justify-content-between'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              {t('prioritiesModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('prioritiesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('prioritiesModal.successDeleteText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('prioritiesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('prioritiesModal.failedText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('prioritiesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

export default Delete;
