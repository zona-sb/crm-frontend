import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { deleteWorker } from '../../../store/Workers/workersSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWorker({ ids: [id] }));
  };
  return (
    <div>
      <p className='worker__title'>{t('workersModal.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('workersModal.deleteText')}</p>
          <div className='custom__modals-two-buttons'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              {t('workersModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('workersModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('workersModal.successDeleteText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('workersModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('workersModal.failedText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('workersModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </div>
  );
};

export default Delete;
