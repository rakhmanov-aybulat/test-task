import { Link } from 'react-router-dom';


const LoginLink: React.FC = () => {
  return (
    <p>
      Already have an account? <Link to="/login">Log in here</Link>.
    </p>
  );
};

export default LoginLink;
