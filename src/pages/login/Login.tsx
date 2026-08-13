import Button from '@common/components/button/Button';
import * as AppActions from '@store/application/application.actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToCars = useCallback(() => {
    navigate('/v/cars');
  }, [navigate]);

  const handleLogin = useCallback(() => {
    dispatch(
      AppActions.login({ email: 'llahwj33@gmail.com', password: 'testing123' })
    );
  }, [dispatch]);

  return (
    <div className="login">
      <h1>Login Page</h1>
      <p>This is the login page content.</p>
      <Button variant="primary" onClick={handleNavigateToCars}>
        Go to Cars
      </Button>

      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
