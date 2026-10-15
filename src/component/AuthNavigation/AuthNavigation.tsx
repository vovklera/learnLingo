import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const isAuthed = false;

  return (
    <>
      {!isAuthed && (
        <ul className={css.authBar}>
          <li>
            <button type="button" className={css.loginButton}>
              <svg width="20" height="20" aria-hidden="true">
                <use href="/icons.svg#log-in-icon" />
              </svg>
              Log in
            </button>
          </li>

          <li>
            <button type="button" className={css.registerButton}>
              Registration
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
