import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import styles from './AuthCommon.module.css';


const SignUpPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.authHeader}>Sign Up</h1>
      <SignUpForm />
      <p className={styles.authLink}>
        Already have an account? <Link to="/login">Log in here</Link>.
      </p>
    </div>
  );
};

export default SignUpPage;

