import * as Yup from 'yup';
import 'yup-phone-lite';

const getSchema = (name, t) => {
  const regexpNum = '^\\+7\\d{10}$';
  const regexpName = '^[а-яёА-ЯЁ\\w-]+(?:[\\s.-][а-яёА-ЯЁ\\w-]+)*$';
  const regexpEmail =
    '^(\\w+|[а-яёА-ЯЁ]+)(@)(\\w+|[а-яёА-ЯЁ]+){2,10}[.](\\w+|[а-яёА-ЯЁ]+){2,10}$';
  switch (name) {
    case 'singUp':
      return () =>
        Yup.object().shape({
          name: Yup.string()
            .trim()
            .matches(regexpName, t('forms.space'))
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .required(t('forms.onblur')),
          email: Yup.string()
            // .email(t('signUp.emailCorrect')) не пропускает кириллицу
            .matches(regexpEmail, t('forms.emailCorrect'))
            .required(t('forms.onblur')),
          phone: Yup.string()
            .phone('RU', t('forms.phoneCorrect')) // почему то если после 7 идет 12560, то выдает ошибку
            .matches(regexpNum, t('forms.phoneCorrect'))
            .required(t('forms.onblur')),
          password: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .required(t('forms.onblur')),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('forms.passwordsMustMatch')
          ),
        });
    case 'login':
      return () =>
        Yup.object().shape({
          email: Yup.string()
            // .email(t('signUp.emailCorrect'))
            .matches(regexpEmail, t('forms.emailCorrect'))
            .required(t('forms.onblur')),
          password: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .required(t('forms.onblur')),
        });
    default:
      return Yup.object().shape({});
  }
};

export default getSchema;
