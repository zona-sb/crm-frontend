import { useFormik } from 'formik';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { routes, apiRoutes } from '../../utils/routes.js';
import getSchema from '../../utils/validation.js';
import useAuth from '../../hooks/useAuth.jsx';
import './LoginForm.css';
import google from '../../assets/icons/google.svg';
import yandex from '../../assets/icons/yandex.svg';
import showPassword from '../../assets/icons/showPassword.svg';
import hidePassword from '../../assets/icons/hidePassword.svg';

const generateOnSubmit = (setStatusError, navigate, auth) => async (user) => {
  setStatusError(false);
  try {
    const { data } = await axios.post(apiRoutes.login(), user);
    auth.logIn(JSON.stringify(data));
    setStatusError(false);
    navigate(routes.main());
  } catch (error) {
    setStatusError(true);
  }
};

const LoginForm = () => {
  const [statusError, setStatusError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const formik = useFormik({
    validationSchema: getSchema('login', t)(),
    initialValues: {
      email: '',
      password: '',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: generateOnSubmit(setStatusError, navigate, auth),
  });

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className='text-center custom__login-h1'>{t('forms.login')}</h1>
      <Form.Floating className='custom__login-placeholder'>
        <Form.Control
          className='custom__login-input'
          style={{ backgroundImage: 'none' }}
          ref={inputEmail}
          name='email'
          autoComplete='email'
          placeholder={t('forms.email')}
          required
          id='email'
          isInvalid={
            (formik.errors.email && formik.touched.email) || statusError
          }
          onChange={formik.handleChange('email')}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
        />
        <Form.Label htmlFor='email'>{t('forms.email')}</Form.Label>
        {formik.errors.email && formik.touched.email ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.email}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Form.Floating className='custom__login-placeholder'>
        <Form.Control
          className='custom__login-input'
          style={{ backgroundImage: 'none' }}
          ref={inputPassword}
          name='password'
          autoComplete='current-password'
          placeholder={t('forms.password')}
          required
          aria-describedby='passwordHelpBlock'
          type={passwordVisible ? 'text' : 'password'}
          id='password'
          isInvalid={
            (formik.errors.password && formik.touched.password) || statusError
          }
          onChange={formik.handleChange('password')}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
        />
        <button
          className='custom__login-hiddenButton custom__login-eye'
          onClick={handleTogglePassword}
          type='button'
        >
          {passwordVisible ? (
            <img src={hidePassword} alt='Скрыть пароль' />
          ) : (
            <img src={showPassword} alt='Показать пароль' />
          )}
        </button>
        <Form.Label htmlFor='password'>{t('forms.password')}</Form.Label>
        {(formik.errors.password && formik.touched.password) || statusError ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {statusError
              ? t('error.wrongEmailPassword')
              : formik.errors.password}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Button
        type='submit'
        className='w-100 btn-primary custom__login-button shadow-sm'
      >
        {t('forms.entry')}
      </Button>
      <div className='custom__login-divider'>
        <span className='custom__login-line' />
        <span className='custom__login-text'>{t('forms.or')}</span>
        <span className='custom__login-line' />
      </div>
      <div className='custom__login-alternativeLogin'>
        <button className='custom__login-hiddenButton' type='button'>
          <img src={google} alt={t('forms.alt_googleLogin')} />
        </button>
        <button className='custom__login-hiddenButton' type='button'>
          <img src={yandex} alt={t('forms.alt_yandexLogin')} />
        </button>
      </div>
      <div className='custom__login-loginOffer'>
        {t('forms.noAccount')}
        <Link className='custom__login-link' to={routes.signup()}>
          {t('forms.signUp')}
        </Link>
      </div>
    </Form>
  );
};
export default LoginForm;
