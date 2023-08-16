/* eslint-disable functional/no-conditional-statements */
import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { routes, apiRoutes } from '../../utils/routes.js';
import getSchema from '../../utils/validation.js';
import useAuth from '../../hooks/useAuth.jsx';
import './SignUpForm.css';
import google from '../../assets/icons/google.svg';
import yandex from '../../assets/icons/yandex.svg';
import showPassword from '../../assets/icons/showPassword.svg';
import hidePassword from '../../assets/icons/hidePassword.svg';
import initPhoneMask from '../../utils/phoneMask.js';

const generateOnSubmit = (setMessageError, navigate, auth) => async (user) => {
  try {
    const responseRegistration = await axios.post(apiRoutes.signup(), user);
    console.log(responseRegistration);
    const { email, password } = user;
    const responseLogin = await axios.post(apiRoutes.login(), {
      email,
      password,
    });
    auth.logIn(JSON.stringify(responseLogin.data));
    navigate(routes.home());
  } catch (error) {
    const {
      request: { status, response },
    } = error;
    if (status === 409) {
      switch (response) {
        case 'user with that phone is already exist':
          setMessageError('phoneExist');
          break;
        default:
          setMessageError('emailExist');
      }
    } else {
      setMessageError('otherErrorRegistration');
    }
  }
};

const SignUpForm = () => {
  const [messageError, setMessageError] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputName = useRef();
  const inputPhone = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const formik = useFormik({
    validationSchema: getSchema('singUp', t)(),
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    initialErrors: {},
    initialTouched: {},
    onSubmit: generateOnSubmit(setMessageError, navigate, auth),
  });

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleToggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChangePhone = () => {
    formik.values.phone = `+${phone.unmaskedValue}`;
  };
  useEffect(() => {
    setPhone(initPhoneMask());
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className='text-center custom__signup-h1'>
        {t('forms.registration')}
      </h1>
      <Form.Floating className='custom__signup-placeholder'>
        <Form.Control
          className='custom__signup-input'
          style={{ backgroundImage: 'none' }}
          ref={inputName}
          name='name'
          autoComplete='name'
          placeholder={t('forms.minSize')}
          required
          id='name'
          isInvalid={formik.errors.name && formik.touched.name}
          onChange={formik.handleChange('name')}
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
        />
        <Form.Label className='form-label' htmlFor='name'>
          {t('forms.fullName')}
        </Form.Label>
        {formik.errors.name && formik.touched.name ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.name}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Form.Floating className='custom__signup-placeholder'>
        <Form.Control
          className='custom__signup-input'
          style={{ backgroundImage: 'none' }}
          ref={inputPhone}
          type='text'
          name='phone'
          autoComplete='phone'
          placeholder={t('forms.phone')}
          required
          id='phone'
          isInvalid={
            (formik.errors.phone && formik.touched.phone) ||
            messageError === 'phoneExist'
          }
          onChange={handleChangePhone}
          onPaste={handleChangePhone}
          onInput={handleChangePhone}
          onBlur={formik.handleBlur('phone')}
        />
        <Form.Label className='form-label' htmlFor='phone'>
          {t('forms.phone')}
        </Form.Label>
        {(formik.errors.phone && formik.touched.phone) ||
        messageError === 'phoneExist' ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {messageError === 'phoneExist'
              ? t(`error.${messageError}`)
              : formik.errors.phone}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Form.Floating className='custom__signup-placeholder'>
        <Form.Control
          className='custom__signup-input'
          style={{ backgroundImage: 'none' }}
          ref={inputEmail}
          name='email'
          autoComplete='email'
          placeholder={t('forms.email')}
          required
          id='email'
          isInvalid={
            (formik.errors.email && formik.touched.email) ||
            messageError === 'emailExist'
          }
          onChange={formik.handleChange('email')}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
        />
        <Form.Label className='form-label' htmlFor='email'>
          {t('forms.email')}
        </Form.Label>
        {(formik.errors.email && formik.touched.email) ||
        messageError === 'emailExist' ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {messageError === 'emailExist'
              ? t(`error.${messageError}`)
              : formik.errors.email}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Form.Floating className='custom__signup-placeholder'>
        <Form.Control
          className='custom__signup-input'
          style={{ backgroundImage: 'none' }}
          ref={inputPassword}
          placeholder={t('forms.password')}
          name='password'
          required
          autoComplete='new-password'
          aria-describedby='passwordHelpBlock'
          type={passwordVisible ? 'text' : 'password'}
          id='password'
          isInvalid={formik.errors.password && formik.touched.password}
          onChange={formik.handleChange('password')}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
        />
        <button
          className='custom__signup-hiddenButton custom__signup-eye'
          onClick={handleTogglePassword}
          type='button'
        >
          {passwordVisible ? (
            <img src={hidePassword} alt={t('forms.alt_hidePassword')} />
          ) : (
            <img src={showPassword} alt={t('forms.alt_showPassword')} />
          )}
        </button>
        <Form.Label htmlFor='password'>{t('forms.password')}</Form.Label>
        {formik.errors.password && formik.touched.password ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Form.Floating className='custom__signup-placeholder'>
        <Form.Control
          className='custom__signup-input'
          style={{ backgroundImage: 'none' }}
          ref={inputConfirmPassword}
          placeholder={t('passwordsMustMatch')}
          required
          name='confirmPassword'
          autoComplete='new-password'
          type={confirmPasswordVisible ? 'text' : 'password'}
          id='confirmPassword'
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword) ||
            messageError === 'otherErrorRegistration'
          }
          onChange={formik.handleChange('confirmPassword')}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur('confirmPassword')}
        />
        <button
          className='custom__signup-hiddenButton custom__signup-eye'
          onClick={handleToggleConfirmPassword}
          type='button'
        >
          {confirmPasswordVisible ? (
            <img src={hidePassword} alt={t('forms.alt_hidePassword')} />
          ) : (
            <img src={showPassword} alt={t('forms.alt_showPassword')} />
          )}
        </button>
        <Form.Label htmlFor='confirmPassword'>
          {t('forms.confirmPassword')}
        </Form.Label>
        {messageError === 'otherErrorRegistration' ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {t(`error.${messageError}`)}
          </Form.Control.Feedback>
        ) : null}
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        ) : null}
      </Form.Floating>
      <Button
        type='submit'
        className='w-100 btn-primary custom__signup-button shadow-sm'
      >
        {t('forms.signupButton')}
      </Button>
      <div className='custom__signup-divider'>
        <span className='custom__signup-line' />
        <span className='custom__signup-text'>{t('forms.or')}</span>
        <span className='custom__signup-line' />
      </div>
      <div className='custom__signup-alternativeRegistration'>
        <button className='custom__signup-hiddenButton' type='button'>
          <img src={google} alt={t('forms.alt_googleLogin')} />
        </button>
        <button className='custom__signup-hiddenButton' type='button'>
          <img src={yandex} alt={t('forms.alt_yandexLogin')} />
        </button>
      </div>
      <div className='custom__signup-registrationOffer'>
        {t('forms.haveAccount')}
        <Link className='custom__signup-link' to={routes.login()}>
          {t('forms.entry')}
        </Link>
      </div>
    </Form>
  );
};
export default SignUpForm;
