import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword';
import Welcome from './pages/Welcome';
import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
         <Route path="/welcome" element={<Welcome />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;