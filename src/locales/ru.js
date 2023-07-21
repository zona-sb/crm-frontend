export default {
  translation: {
    signUp: {
      fullName: 'ФИО',
      phone: 'телефон',
      email: 'email',
      password: 'пароль',
      confirmPassword: 'подтвердите пароль',
      entry: 'Войти',
      signupButton: 'Зарегистрироваться',
      minSize: 'От 3х до 100 символов',
      spase: 'Не более одного пробела между словами',
      onblur: 'Обязательное поле',
      phoneCorrect: 'Пожалуйста, введите корректный телефонный номер',
      emailCorrect: 'Пожалуйста, введите корректный email адрес',
      passwordsMustMatch: 'Пароли должны совпадать',
    },
    error: {
      emailExist: 'Пользователь с таким email уже существует',
      phoneExist: 'Пользователь с таким телефоном уже существует',
      otherErrorRegistration: 'другая ошибка регистрации', // пока сделала так, непонятно будут ли другие коды
      wrongEmailPassword: 'Неверный email или пароль',
      isUnique: 'Значение должно быть уникальным',
      isFractionalNumbers: 'Число должно быть целым',
    },
  },
};
