import LoginForm from '../components/LoginForm';
import SignUpLink from '../components/SignUpLink';
import styles from './AuthCommon.module.css';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.authHeader}>Login</h1>
      <LoginForm  />
      <SignUpLink />
    </div>
  );
};

export default LoginPage;

