import { Link } from 'react-router-dom';
import styles from '../pages/AuthCommon.module.css';


const SignUpLink: React.FC = () => {
  return (
    <p className={styles.authLink}>
      Don't have an account? <Link to="/signup">Sign up</Link>
    </p>
  );
};

export default SignUpLink;

