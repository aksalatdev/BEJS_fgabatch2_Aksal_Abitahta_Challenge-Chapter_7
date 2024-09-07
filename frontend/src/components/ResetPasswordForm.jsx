import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Ambil token dari URL dan navigate
import api from '../services/api';  // Axios instance untuk request ke backend

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams(); // Ambil token dari URL
  const navigate = useNavigate();
  const token = searchParams.get('token'); // Ambil token dari query params

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Kirim request ke backend untuk reset password
      const response = await api.post('/users/reset-password', {
        token,  // Sertakan token yang didapat dari URL
        newPassword,
      });
      console.log('Password reset successful:', response.data);

      alert('Password reset successful');
      navigate('/login');  // Redirect ke halaman login setelah reset
    } catch (error) {
      console.error('Password reset failed:', error.response?.data || error.message);
      alert('Password reset failed, try again');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <form onSubmit={handleResetPassword}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          Reset Password
        </h1>

        <p style={{ fontSize: '16px', color: 'gray', marginBottom: '20px' }}>
          Enter your new password.
        </p>

        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          fullWidth
          css={{ marginBottom: '20px' }}
        />
        
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          css={{ marginBottom: '20px' }}
        />

        <Button type="submit" fullWidth shadow>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
