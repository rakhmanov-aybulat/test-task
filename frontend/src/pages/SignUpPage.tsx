import SignUpForm from '../components/SignUpForm';
import LoginLink from '../components/LoginLink';
import styles from './AuthCommon.module.css';


const SignUpPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.authHeader}>Sign Up</h1>
      <SignUpForm />
      <LoginLink />
    </div>
  );
};

export default SignUpPage;

