import { Container } from 'react-bootstrap';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/views/Header/Header';
import { Footer } from './components/views/Footer/Footer';
import { Home } from './components/pages/Home/Home';
import { ErrorPage } from './components/pages/ErrorPage/ErrorPage';
import { SingleTable } from './components/pages/SingleTable/SingleTable';
import { AddTable } from './components/pages/AddTable/AddTable';

import { fetchTables } from './redux/tablesRedux';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), []);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/table/:tableId' element={<SingleTable />} />
        <Route path='/table/add' element={<AddTable />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Container>
  );
}
