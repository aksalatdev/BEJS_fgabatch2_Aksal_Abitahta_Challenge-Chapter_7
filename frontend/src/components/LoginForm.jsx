import { useState } from 'react';
import { Button, Input, Link} from '@nextui-org/react'; 
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';  // Import Axios instance
import socket from '../services/socket';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State untuk handle error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Reset error state

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Emit event "register" dengan email user ke server Socket.IO
      socket.emit("register", email);
      console.log("User registered on Socket.IO");
      console.log('Login successful:', response.data);

      // Simpan token di localStorage setelah login berhasil
      localStorage.setItem('token', response.data.token);

      // Redirect ke halaman lain atau dashboard
      navigate('/welcome');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed, check your credentials');  // Set error state
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" style={{ width: '100%' }}>Login</Button>

      {/* Tampilkan pesan error jika login gagal */}
      {error && <p color="error" style={{ marginTop: '10px' }}>{error}</p>}

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
