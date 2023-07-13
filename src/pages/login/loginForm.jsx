import { useFormik } from 'formik';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { routes, apiRoutes } from '../../utils/routes.js';
import getSchema from '../../utils/validation.js';
import useAuth from '../../hooks/useAuth.jsx';

const generateOnSubmit = (setstatusError, navigate, auth) => async (user) => {
  setstatusError(false);
  try {
    const { data } = await axios.post(apiRoutes.login(), user);
    auth.logIn(JSON.stringify(data));
    setstatusError(false);
    navigate(routes.home());
  } catch (error) {
    console.log(error);
    setstatusError(true);
  }
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const [statusError, setstatusError] = useState(false);
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
    onSubmit: generateOnSubmit(setstatusError, navigate, auth),
  });
  return (
    <form className='w-50 form-group' onSubmit={formik.handleSubmit}>
      {/* емаил */}
      <div className='form-floating mb-3'>
        <Form.Control
          ref={inputEmail}
          name='email'
          autoComplete='email'
          placeholder={t('signUp.email')}
          required
          id='email'
          isInvalid={
            (formik.errors.email && formik.touched.email) || statusError
          }
          onChange={formik.handleChange('email')}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
        />
        <Form.Label className='form-label' htmlFor='email'>
          {t('signUp.email')}
        </Form.Label>
        {formik.errors.email && formik.touched.email ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.email}
          </Form.Control.Feedback>
        ) : null}
      </div>
      {/* пароль */}
      <div className='form-floating mb-3'>
        <Form.Control
          ref={inputPassword}
          placeholder={t('minPass')}
          name='password'
          required
          autoComplete='new-password'
          aria-describedby='passwordHelpBlock'
          type='password'
          id='password'
          className='form-control'
          isInvalid={
            (formik.errors.password && formik.touched.password) || statusError
          }
          onChange={formik.handleChange('password')}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
        />
        <Form.Label htmlFor='password'>{t('signUp.password')}</Form.Label>
        {(formik.errors.password && formik.touched.password) || statusError ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {statusError ? t('error.wrongEmailPassword') : formik.errors.password}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <button type='submit' className='w-100 btn btn-outline-primary'>
        {t('signUp.entry')}
      </button>
    </form>
  );
};
export default SignUpForm;
