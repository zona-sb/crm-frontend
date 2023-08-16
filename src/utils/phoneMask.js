import IMask from 'imask';

const initPhoneMask = () => {
  const phoneInput = document.querySelector('#phone');
  const phoneMask = new IMask(phoneInput, {
    mask: '+{7}(000)000-00-00',
  });
  return phoneMask;
};

export default initPhoneMask;
