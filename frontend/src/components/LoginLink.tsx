import { Link } from 'react-router-dom';
import styles from '../pages/AuthCommon.module.css';


const LoginLink: React.FC = () => {
  return (
    <p className={styles.authLink}>
      Already have an account? <Link to="/login">Log in here</Link>.
    </p>
  );
};

export default LoginLink;

