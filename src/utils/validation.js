import * as Yup from 'yup';
import 'yup-phone-lite';

const getSchema = (name, t) => {
  const regexp = '^\\+7\\d{10}$';
  switch (name) {
    case 'singUp':
      return () =>
        Yup.object().shape({
          name: Yup.string()
            .min(3, t('signUp.minSize'))
            .required(t('signUp.onblur')),
          email: Yup.string()
            .email(t('signUp.emailCorrect'))
            .required(t('signUp.onblur')),
          phone: Yup.string()
            .phone('RU', t('signUp.phoneCorrect')) //почему то если после 7 идет 12560, то выдает ошибку
            .matches(regexp, t('signUp.phoneCorrect'))
            .required(t('signUp.onblur')),
          password: Yup.string()
            .min(3, t('signUp.minSize'))
            .required(t('signUp.onblur')),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('signUp.passwordsMustMatch')
          ),
        });
    case 'login':
      return () =>
        Yup.object().shape({
          email: Yup.string()
            .email(t('signUp.emailCorrect'))
            .required(t('signUp.onblur')),
          password: Yup.string()
            .min(3, t('signUp.minSize'))
            .required(t('signUp.onblur')),
        });
    default:
      return Yup.object().shape({});
  }
};

export default getSchema;
