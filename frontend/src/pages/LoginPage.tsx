import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import styles from './AuthCommon.module.css';


const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.authHeader}>Login</h1>
      <LoginForm  />
      <p className={styles.authLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;

