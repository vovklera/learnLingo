import { Link } from 'react-router';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/teachers', label: 'Teachers' },
];

const authNavLinks = [{ href: '/favorites', label: 'Favorites' }];

export default function Header() {
  const isAuthed = false;

  const links = isAuthed ? [...navLinks, ...authNavLinks] : navLinks;

  return (
    <header className={css.header}>
      <div className={css.headerWrap}>
        <div className={css.headerBar}>
          <Link className={css.logo} to="/" aria-label="Home">
            <svg width="28" height="28" aria-hidden="true">
              <use href="/icons.svg#logo-icon" />
            </svg>
            LearnLingo
          </Link>

          <nav aria-label="Main Navigation">
            <ul className={css.navigation}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link className={css.navLink} to={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <AuthNavigation />
      </div>
    </header>
  );
}
