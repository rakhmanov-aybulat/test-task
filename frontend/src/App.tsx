import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import AppRoutes from './components/AppRoutes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

