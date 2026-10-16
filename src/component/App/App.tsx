import { Route, Routes } from 'react-router';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </>
  );
}
