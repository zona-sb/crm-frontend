import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { deleteStatus } from '../../../store/Statuses/statusesSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteStatus(id));
  };
  return (
    <>
      <p className='status__title'>{t('statusesModal.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('statusesModal.deleteText')}</p>
          <div className='d-flex justify-content-between'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              {t('statusesModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('statusesModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('statusesModal.successDeleteText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('statusesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('statusesModal.failedText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('statusesModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Delete;
