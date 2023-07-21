import * as Yup from 'yup';
import 'yup-phone-lite';

const getSchema = (name, t, exception) => {
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
            .matches(regexpName, t('signUp.spase'))
            .min(3, t('signUp.minSize'))
            .max(100, t('signUp.minSize'))
            .required(t('signUp.onblur')),
          email: Yup.string()
            // .email(t('signUp.emailCorrect')) не пропускает кириллицу
            .matches(regexpEmail, t('signUp.emailCorrect'))
            .required(t('signUp.onblur')),
          phone: Yup.string()
            .phone('RU', t('signUp.phoneCorrect')) // почему то если после 7 идет 12560, то выдает ошибку
            .matches(regexpNum, t('signUp.phoneCorrect'))
            .required(t('signUp.onblur')),
          password: Yup.string()
            .min(3, t('signUp.minSize'))
            .max(100, t('signUp.minSize'))
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
            // .email(t('signUp.emailCorrect'))
            .matches(regexpEmail, t('signUp.emailCorrect'))
            .required(t('signUp.onblur')),
          password: Yup.string()
            .min(3, t('signUp.minSize'))
            .max(100, t('signUp.minSize'))
            .required(t('signUp.onblur')),
        });
    case 'modifyPriority':
      return () =>
        Yup.object().shape({
          title: Yup.string()
            .min(3, t('signUp.minSize'))
            .notOneOf(
              exception.map(({ title }) => title),
              'Должно быть уникальным'
            )
            .required(t('signUp.onblur')),
          weight: Yup.number()
            .integer(t('error.isFractionalNumbers'))
            .notOneOf(
              exception.map(({ weight }) => weight),
              'Должно быть уникальным'
            )
            .required(t('signUp.onblur')),
          color: Yup.string()
            .notOneOf(
              exception.map(({ color }) => color),
              'Должно быть уникальным'
            )
            .required(t('signUp.onblur')),
        });
    default:
      return Yup.object().shape({});
  }
};

export default getSchema;
