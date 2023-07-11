import * as Yup from 'yup';

const getSchema = (name, t) => {
  switch (name) {
    case 'singup':
      return () =>
        Yup.object().shape({
          username: Yup.string()
            .min(3, t('minSize'))
            .max(20, t('minSize'))
            .required(t('onblur')),
          password: Yup.string().min(6, t('minPass')).required(t('onblur')),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('passwordsMustMatch')
          ),
        });
    case 'add':
      return (channels) =>
        Yup.object().shape({
          name: Yup.string()
            .required(t('onblur'))
            .notOneOf(channels, t('include'))
            .min(3, t('minSize'))
            .max(20, t('minSize')),
        });
    case 'rename':
      return (channels) =>
        Yup.object().shape({
          name: Yup.string()
            .required(t('onblur'))
            .notOneOf(channels, t('include'))
            .min(3, t('minSize'))
            .max(20, t('minSize')),
        });
    default:
      return Yup.object().shape({});
  }
};

export default getSchema;
