import * as Yup from 'yup';
import 'yup-phone-lite';

const getSchema = (name, t, exception) => {
  const regexpNum = '^\\+7\\d{10}$';
  const regexpDate = '^\\d{4}(-)\\d{2}(-)\\d{2}$';
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
    case 'modifyPriority':
      return () =>
        Yup.object().shape({
          title: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .notOneOf(
              exception.map(({ title }) => title),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
          weight: Yup.number()
            .integer(t('error.isFractionalNumbers'))
            .notOneOf(
              exception.map(({ weight }) => weight),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
          color: Yup.string()
            .notOneOf(
              exception.map(({ color }) => color),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
        });
    case 'modifyCategory':
      return () =>
        Yup.object().shape({
          categoryTitle: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .notOneOf(
              exception.map(({ categoryTitle }) => categoryTitle),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
        });
    case 'modifyStatus':
      return () =>
        Yup.object().shape({
          statusTitle: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .notOneOf(
              exception.map(({ statusTitle }) => statusTitle),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
        });
    case 'modifyWorkers':
      return () =>
        Yup.object().shape({
          name: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .required(t('forms.onblur')),
          phone: Yup.string()
            .phone('RU', t('forms.phoneCorrect'))
            .matches(regexpNum, t('forms.phoneCorrect'))
            .notOneOf(
              exception.map((worker) => worker.person.phone),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
          email: Yup.string()
            .matches(regexpEmail, t('forms.emailCorrect'))
            .notOneOf(
              exception.map((worker) => worker.person.email),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
        });
    case 'modifyClient':
      return () =>
        Yup.object().shape({
          name: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .notOneOf(
              exception.map((client) => client.name),
              t('error.isUnique')
            )
            .required(t('forms.onblur')),
          company: Yup.string(),
          phone: Yup.string()
            .phone('RU', t('forms.phoneCorrect'))
            .matches(regexpNum, t('forms.phoneCorrect'))
            .required(t('forms.onblur')),
          email: Yup.string()
            .matches(regexpEmail, t('forms.emailCorrect'))
            .required(t('forms.onblur')),
          comment: Yup.string(),
        });
    case 'modifyTask':
      return () =>
        Yup.object().shape({
          address: Yup.string()
            .min(3, t('forms.minSize'))
            .max(100, t('forms.minSize'))
            .required(t('forms.onblur')),
          date: Yup.string()
            .min(3, t('forms.minSize'))
            .max(10, t('forms.minSize'))
            .required(t('forms.onblur'))
            .matches(regexpDate, t('tasksModal.date')),
          comment: Yup.string(),
        });
    default:
      return Yup.object().shape({});
  }
};

export default getSchema;
