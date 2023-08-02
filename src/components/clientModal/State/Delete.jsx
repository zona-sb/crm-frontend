import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ButtonCustom } from '../../shared';
import { deleteClient } from '../../../store/Clients/clientsSaga';

const Delete = ({ onHide, id, status, isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteClient(id));
  };
  return (
    <>
      <p className='client__title'>{t('clientsModal.deleteTitle')}</p>
      {status === 'idle' && (
        <>
          <p>{t('clientsModal.deleteText')}</p>
          <div className='d-flex justify-content-between'>
            <ButtonCustom onClick={handleDelete} disabled={isLoading}>
              {t('clientsModal.buttonDelete')}
            </ButtonCustom>
            <ButtonCustom color='reject' onClick={onHide}>
              {t('clientsModal.buttonCancel')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'success' && (
        <>
          <p>{t('clientsModal.successDeleteText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('clientsModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <p>{t('clientsModal.failedText')}</p>
          <div className='d-flex justify-content-center'>
            <ButtonCustom onClick={onHide}>
              {t('clientsModal.buttonClose')}
            </ButtonCustom>
          </div>
        </>
      )}
    </>
  );
};

export default Delete;
