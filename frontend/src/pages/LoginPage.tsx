import LoginForm from '../components/LoginForm';
import SignUpLink from '../components/SignUpLink';


const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm  />
      <SignUpLink />
    </div>
  );
};

export default LoginPage;

