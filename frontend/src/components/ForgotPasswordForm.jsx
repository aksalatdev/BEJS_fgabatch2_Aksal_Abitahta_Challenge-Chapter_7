import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import api from '../services/api';  // Import Axios instance

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Request ke backend untuk kirim email reset password
      const response = await api.post('/users/forgot-password', { email });
      console.log('Reset link sent:', response.data);

      alert('Reset link sent to your email');
    } catch (error) {
      console.error('Error sending reset link:', error.response?.data || error.message);
      alert('Failed to send reset link, please try again');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <form onSubmit={handleForgotPassword}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          Forgot Password
        </h1>

        <p style={{ fontSize: '16px', color: 'gray', marginBottom: '20px' }}>
          Enter your email to reset your password.
        </p>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          css={{ marginBottom: '20px' }}
        />

        <Button type="submit" fullWidth shadow>
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
