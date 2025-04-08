import { Link } from 'react-router-dom';


const SignUpLink: React.FC = () => {
  return (
    <p>
      Don't have an account? <Link to="/signup">Sign up</Link>
    </p>
  );
};

export default SignUpLink;

