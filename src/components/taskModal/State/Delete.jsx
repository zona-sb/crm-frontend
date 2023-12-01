import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { deleteTask } from '../../../store/Tasks/tasksSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({ ids: [id] }));
  };
  return (
    <>
      <p className='client__title'>{t('tasksModal.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('tasksModal.deleteText')}</p>
          <div className='custom__modals-two-buttons'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              {t('tasksModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('tasksModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('tasksModal.successDeleteText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('tasksModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('tasksModal.failedText')}</p>
          <div className='custom__modals-button'>
            <ButtonCustom onClick={onHide}>
              {t('tasksModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Delete;
