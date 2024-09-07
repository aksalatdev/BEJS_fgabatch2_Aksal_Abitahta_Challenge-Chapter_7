import Notification from '../components/Notification';
const Welcome = () => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>Welcome!</h1>
      <Notification /> 
    </div>
  );
};

export default Welcome;
