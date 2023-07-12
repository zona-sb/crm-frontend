import { useFormik } from 'formik';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { routes, apiRoutes } from '../../utils/routes.js';
import getSchema from '../../utils/validation.js';

const generateOnSubmit = (setStatusSignup, navigate) => async (user) => {
  setStatusSignup(false);
  try {
    // const userJson = JSON.stringify(user);
    // console.log(userJson);
    const { data } = await axios.post(apiRoutes.signup(), user);
    console.log(data);
    setStatusSignup(false);
    navigate(routes.home());
  } catch (error) {
    console.log(error);
    // setStatusSignup(true);
  }
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const [statusSignup, setStatusSignup] = useState(false);
  const navigate = useNavigate();
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
    onSubmit: generateOnSubmit(setStatusSignup, navigate),
  });
  return (
    <form className='w-50 form-group' onSubmit={formik.handleSubmit}>
      {/* фио */}
      <div className='form-floating mb-3'>
        <Form.Control
          ref={inputName}
          name='name'
          autoComplete='name'
          placeholder={t('signUp.minSize')}
          required
          id='name'
          isInvalid={
            (formik.errors.name && formik.touched.name) || statusSignup
          }
          onChange={formik.handleChange('name')}
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
        />
        <Form.Label className='form-label' htmlFor='name'>
          {t('signUp.fullName')}
        </Form.Label>
        {(formik.errors.name && formik.touched.name) || statusSignup ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.name}
          </Form.Control.Feedback>
        ) : null}
      </div>
      {/* телефон */}
      <div className='form-floating mb-3'>
        <Form.Control
          ref={inputPhone}
          name='phone'
          autoComplete='phone'
          placeholder={t('signUp.phone')}
          required
          id='phone'
          isInvalid={
            (formik.errors.phone && formik.touched.phone) || statusSignup
          }
          onChange={formik.handleChange('phone')}
          value={formik.values.phone}
          onBlur={formik.handleBlur('phone')}
        />
        <Form.Label className='form-label' htmlFor='phone'>
          {t('signUp.phone')}
        </Form.Label>
        {(formik.errors.phone && formik.touched.phone) || statusSignup ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.phone}
          </Form.Control.Feedback>
        ) : null}
      </div>
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
            (formik.errors.email && formik.touched.email) || statusSignup
          }
          onChange={formik.handleChange('email')}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
        />
        <Form.Label className='form-label' htmlFor='email'>
          {t('signUp.email')}
        </Form.Label>
        {(formik.errors.email && formik.touched.email) || statusSignup ? (
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
            (formik.errors.password && formik.touched.password) || statusSignup
          }
          onChange={formik.handleChange('password')}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
        />
        <Form.Label htmlFor='password'>{t('signUp.password')}</Form.Label>
        {(formik.errors.password && formik.touched.password) || statusSignup ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        ) : null}
      </div>
      {/* повтор пароля */}
      <div className='form-floating mb-3'>
        <Form.Control
          ref={inputConfirmPassword}
          placeholder={t('passwordsMustMatch')}
          required
          name='confirmPassword'
          autoComplete='new-password'
          type='password'
          id='confirmPassword'
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword) ||
            statusSignup
          }
          onChange={formik.handleChange('confirmPassword')}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur('confirmPassword')}
        />
        <Form.Label htmlFor='confirmPassword'>
          {t('signUp.confirmPassword')}
        </Form.Label>
        <div className='invalid-tooltip' />
        {statusSignup ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {t('userExists')}
          </Form.Control.Feedback>
        ) : null}
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <Form.Control.Feedback className='invalid-tooltip' tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        ) : null}
      </div>
      <button type='submit' className='w-100 btn btn-outline-primary'>
        {t('signUp.signupButton')}
      </button>
    </form>
  );
};
export default SignUpForm;
