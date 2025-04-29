import { useState } from 'react';
import { useAuth,  } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/Api';
import styles from './AuthFormCommon.module.css';


interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

const SignUpForm: React.FC = () => {
  const initialData = { name: '', email: '', password: '' };
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (formData.name.length <= 3) {
      newErrors.name = 'Name must be longer than 3 characters.';
    }

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
      const response = await api.registerUser(
          formData.name, formData.email, formData.password); 

      if (response.status == 'success') {
        login(response.data.token, response.data.user.name);
         
        navigate('/tasks');
      } else if (response.message.includes('Invalid input data')) {
          for (const err of response.errors) {
              switch (err.field) {
                case 'name':
                  setErrors({ name: err.message });
                  break;
                case 'email':
                  setErrors({ email: err.message });
                  break;
                case 'password':
                  setErrors({ password: err.message });
                  break;
              }
          }
      } else {
        setErrors({ general: response.message});
      } 
    } catch (err) {
      setErrors({ general: 'An error occurred. Please check your connection.'});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.authInputField}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

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
        SignUp
      </button>
    </form>
  );
};

export default SignUpForm;

