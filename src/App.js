import { Container } from 'react-bootstrap';

import { Routes, Route } from 'react-router-dom';

import { Header } from './components/views/Header/Header';
import { Footer } from './components/views/Footer/Footer';
import { Home } from './components/pages/Home/Home';
import { ErrorPage } from './components/pages/ErrorPage/ErrorPage';
export function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Container>
  );
}
