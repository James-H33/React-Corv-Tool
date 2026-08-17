import Button from '@common/components/button/Button';
import Icon from '@common/components/icon/Icon';
import TextField from '@common/components/text-field/TextField';
import { IconTypes } from '@common/types/icon';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AppActions from '@common/store/application/application.actions';
import './Login.scss';

export default function Login() {
  const dispatch = useDispatch();

  const [model, setModel] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailTouchedAndHadInputAtleastOnce = useCallback(() => {
    return model.email.length > 0;
  }, [model.email]);

  const passwordTouchedAndHadInputAtleastOnce = useCallback(() => {
    return model.password.length > 0;
  }, [model.password]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showEmailInvalidError = useMemo(() => {
    const { email } = model;
    const fieldChanged = emailTouchedAndHadInputAtleastOnce();
    const fieldFocused = emailFocused;

    return email && !emailRegex.test(email) && fieldChanged && !fieldFocused;
  }, [
    model.email,
    emailTouchedAndHadInputAtleastOnce,
    emailFocused,
    emailRegex,
  ]);

  const showPasswordNotLongEnoughError = useMemo(() => {
    const { password } = model;
    const fieldChanged = passwordTouchedAndHadInputAtleastOnce();
    const fieldFocused = passwordFocused;

    return password && password.length < 8 && fieldChanged && !fieldFocused;
  }, [model.password, passwordTouchedAndHadInputAtleastOnce, passwordFocused]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const canSubmit = useMemo(() => {
    // Implement your form submission validation logic here
    return true;
  }, []);

  const login = useCallback(() => {
    console.log('Login button clicked');
    console.log('Email:', model.email);
    console.log('Password:', model.password);
    const { email, password } = model;

    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Email and password are required.');
      return;
    }

    dispatch(AppActions.login(model));
  }, [dispatch, model]);

  return (
    <div className="ct-login">
      <div className="ct-login-form">
        <div className="ct-login-form__row">
          <h2>Login to Your Account</h2>
        </div>

        <div className="ct-login-form__row">
          <label htmlFor="email">Email:</label>
          <TextField
            id="email"
            placeholder="Email"
            onKeyDown={(e) => e.key === 'Enter' && login()}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) =>
              setModel((prev) => ({ ...prev, email: e.target.value }))
            }
            className={showEmailInvalidError ? 'error' : ''}
            type="text"
          />
        </div>

        <div className="ct-login-form__row">
          <label htmlFor="password">Password:</label>
          <div className="ct-login-form__password-wrapper">
            <TextField
              id="password"
              placeholder="Password"
              onKeyDown={(e) => e.key === 'Enter' && login()}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) =>
                setModel((prev) => ({ ...prev, password: e.target.value }))
              }
              className={showPasswordNotLongEnoughError ? 'error' : ''}
              type={showPassword ? 'text' : 'password'}
            />

            <span
              className="ct-login-form__show-password"
              onClick={toggleShowPassword}
              role="button"
              tabIndex={0}
            >
              <Icon
                icon={showPassword ? IconTypes.EyeSlash : IconTypes.Eye}
                size={20}
              />
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="ct-login-form__row ct-login-form__row--error">
            {errorMessage}
          </div>
        )}

        {showEmailInvalidError && (
          <div className="ct-login-form__row ct-login-form__row--error">
            Email must be a valid email address.
          </div>
        )}

        {showPasswordNotLongEnoughError && (
          <div className="ct-login-form__row ct-login-form__row--error">
            Password must be at least 8 characters long.
          </div>
        )}

        <div className="ct-login-form__row ct-login-form__row--forgot-password">
          Forgot password? <Link to="/forgot-password">Click here</Link>
        </div>

        <div className="ct-login-form__row ct-login-form__row--actions">
          <Link to="/signup" className="ct-login-form__signup-link">
            Sign up
          </Link>
          <Button
            variant="primary"
            onClick={login}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            disabled={!canSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
