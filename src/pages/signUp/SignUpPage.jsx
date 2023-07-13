import SignUpForm from './SignUpForm.jsx';

const SignUpPage = () => (
  <div className='container'>
    <img
      className='mb-4'
      src='https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg'
      alt=''
      width='72'
      height='72'
    />
    <h1 className='h3 mb-3 font-weight-normal'>Please sign up</h1>
    <SignUpForm />
  </div>
);
export default SignUpPage;
