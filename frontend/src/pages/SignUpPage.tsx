import SignUpForm from '../components/SignUpForm';
import LoginLink from '../components/LoginLink';

const SignUpPage: React.FC = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
      <LoginLink />
    </div>
  );
};

export default SignUpPage;

