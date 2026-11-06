import { useState } from 'react';

import Modal from '../Modal/Modal';
import RegistrationForm from '../AuthForm/RegistrationForm';
import LoginForm from '../AuthForm/LoginForm';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const isAuthed = false;
  const [modalType, setModalType] = useState<'login' | 'registration' | null>(null);

  return (
    <>
      {!isAuthed && (
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
          <LoginForm />
        </Modal>
      )}
      {modalType === 'registration' && (
        <Modal labelledBy="registration-title" onClose={() => setModalType(null)}>
          <RegistrationForm />
        </Modal>
      )}
    </>
  );
}
