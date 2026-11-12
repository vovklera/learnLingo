import { useState } from 'react';

import Modal from '../Modal/Modal';
import RegistrationForm from '../AuthForm/RegistrationForm';
import LoginForm from '../AuthForm/LoginForm';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '../../store/authStore';

export default function AuthNavigation() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [modalType, setModalType] = useState<'login' | 'registration' | null>(null);

  return (
    <>
      {user && (
        <div className={css.userBar}>
          <button type="button" className={css.userAvatar}>
            {user.displayName?.charAt(0).toUpperCase()}
          </button>
          <button className={css.logoutButton} type="button" onClick={logout}>
            Log Out
          </button>
        </div>
      )}

      {!user && (
        <ul className={css.authBar}>
          <li>
            <button type="button" className={css.loginButton} onClick={() => setModalType('login')}>
              <svg width="20" height="20" aria-hidden="true">
                <use href="/icons.svg#log-in-icon" />
              </svg>
              Log in
            </button>
          </li>

          <li>
            <button
              type="button"
              className={css.registerButton}
              onClick={() => setModalType('registration')}
            >
              Registration
            </button>
          </li>
        </ul>
      )}
      {modalType === 'login' && (
        <Modal labelledBy="login-title" onClose={() => setModalType(null)}>
          {(close) => <LoginForm onSuccess={close} />}
        </Modal>
      )}
      {modalType === 'registration' && (
        <Modal labelledBy="registration-title" onClose={() => setModalType(null)}>
          {(close) => <RegistrationForm onSuccess={close} />}
        </Modal>
      )}
    </>
  );
}
