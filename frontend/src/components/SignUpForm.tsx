import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/Api';


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
      const data = await api.registerUser(formData); 

      if (data.status == 'success') {
        login(data.token, data.user);
        navigate('/tasks');
      } else {
        setErrors({ general: 'Registration failed. Please try again.'});
      }
    } catch (err) {
      setErrors({ general: 'An error occurred. Please check your connection.'});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
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

      <button type="submit">
        SignUp
      </button>
    </form>
  );
};

export default SignUpForm;

