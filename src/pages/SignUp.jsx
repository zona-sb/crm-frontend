import { useFormik } from 'formik';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { routes } from '../utils/routes.js';
import getSchema from '../utils/validation.js';

const generateOnSubmit =
  (setStatusSignup, navigate) =>
    async ({ username, password }) => {
      setStatusSignup(false);
      try {
        // const { data } = await axios.post(routes.signupPath(), {
        //   username,
        //   password,
        // });
        setStatusSignup(false);
        navigate(routes.home());
      } catch (error) {
        setStatusSignup(true);
      }
    };

const Signup = () => {
  const { t } = useTranslation();
  const [statusSignup, setStatusSignup] = useState(false);
  const navigate = useNavigate();
  const inputUserName = useRef();
  const inputUserPassword = useRef();
  const inputConfirmPassword = useRef();
  const formik = useFormik({
    validationSchema: getSchema('singup', t)(),
    initialValues: {
      username: '',
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
      <Form.Control
        ref={inputUserName}
        name='username'
        autoComplete='username'
        placeholder={t('minSize')}
        required
        id='username'
        isInvalid={
          (formik.errors.username && formik.touched.username) || statusSignup
        }
        onChange={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
      />
      <Form.Label className='form-label' htmlFor='username'>
        {t('signUp.fullName')}
      </Form.Label>
      {(formik.errors.username && formik.touched.username) || statusSignup ? (
        <Form.Control.Feedback className='invalid-tooltip' tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      ) : null}
      {/* телефон */}
      <Form.Control
        ref={inputUserName}
        name='username'
        autoComplete='username'
        placeholder={t('minSize')}
        required
        id='username'
        isInvalid={
          (formik.errors.username && formik.touched.username) || statusSignup
        }
        onChange={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
      />
      <Form.Label className='form-label' htmlFor='username'>
        {t('signUp.phone')}
      </Form.Label>
      {(formik.errors.username && formik.touched.username) || statusSignup ? (
        <Form.Control.Feedback className='invalid-tooltip' tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      ) : null}
      {/* емаил */}
      <Form.Control
        ref={inputUserName}
        name='username'
        autoComplete='username'
        placeholder={t('minSize')}
        required
        id='username'
        isInvalid={
          (formik.errors.username && formik.touched.username) || statusSignup
        }
        onChange={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
      />
      <Form.Label className='form-label' htmlFor='username'>
        {t('signUp.email')}
      </Form.Label>
      {(formik.errors.username && formik.touched.username) || statusSignup ? (
        <Form.Control.Feedback className='invalid-tooltip' tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      ) : null}
      {/* пароль */}
      <Form.Control
        ref={inputUserPassword}
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
      {/* повтор пароля */}
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
      <div className='invalid-tooltip' />
      {statusSignup ? (
        <Form.Control.Feedback className='invalid-tooltip' tooltip>
          {t('userExists')}
        </Form.Control.Feedback>
      ) : null}
      <Form.Label htmlFor='confirmPassword'>
        {t('signUp.confirmPassword')}
      </Form.Label>
      {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
        <Form.Control.Feedback className='invalid-tooltip' tooltip>
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      ) : null}
      <button type='submit' className='w-100 btn btn-outline-primary'>
        {t('interface.signupButton')}
      </button>
    </form>
  );
};
export default Signup;
