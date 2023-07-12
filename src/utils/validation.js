import * as Yup from 'yup';
import 'yup-phone-lite';

const getSchema = (name, t) => {
  const regexp = '^\\+[7]?[0-9]{10}$';
  switch (name) {
    case 'singUp':
      return () =>
        Yup.object().shape({
          name: Yup.string()
            .min(3, t('minSize'))
            .max(20, t('minSize'))
            .required(t('signUp.onblur')),
          email: Yup.string()
            .email(t('signUp.emailCorrect'))
            .required(t('signUp.onblur')),
          phone: Yup.string()
            .phone('RU', t('signUp.phoneCorrect'))
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
    default:
      return Yup.object().shape({});
  }
};

export default getSchema;
