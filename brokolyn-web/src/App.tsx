import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import ToastCotainer from './components/ToastContainer';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastCotainer/>
    <GlobalStyle />
  </>
);

export default App;
