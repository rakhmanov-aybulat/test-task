import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Логика регистрации (например, вызов api.registerUser)...
    console.log('Signing up...');
    navigate('/login');
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUpPage;

