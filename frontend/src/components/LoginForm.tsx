import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/Api';
import styles from './AuthFormCommon.module.css';


interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain the "@" symbol.';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await api.loginUser(formData.email, formData.password);
 
      if (response.status == 'success') {
        login(response.data.token, response.data.user.name);
        navigate('/tasks');
      } else {
        setErrors({ general: response.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again later.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.authInputField}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div className={styles.authInputField}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      {errors.general && <p>{errors.general}</p>}

      <button className={styles.authButton} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

