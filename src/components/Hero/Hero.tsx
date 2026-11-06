import css from './Hero.module.css';
import { Link } from 'react-router';

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

export default function Hero() {
  return (
    <section className={`container ${css.heroSection}`}>
      <div className={css.heroMain}>
        <div className={css.heroContent}>
          <h1 className={css.title}>
            Unlock your potential with the best{' '}
            <span className={css.highlight}>language</span> tutors
          </h1>
          <p className={css.description}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link to="/teachers" className={css.getStartBtn}>
            Get started
          </Link>
        </div>
        <div className={css.heroVisual}>
          <div className={css.heroImage}></div>
        </div>
      </div>
      <div>
        <ul className={css.stats}>
          <svg className={css.statsBorder} aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="30"
              fill="none"
              stroke="var(--peach)"
              strokeWidth="2"
              strokeDasharray="15 15"
            />
          </svg>
          {stats.map(({ value, label }) => (
            <li className={css.statsItem} key={label}>
              <p className={css.statsValue}>{value}</p>
              <p className={css.statsLabel}>{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
