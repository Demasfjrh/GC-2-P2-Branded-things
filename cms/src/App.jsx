import { Route, Routes, BrowserRouter } from 'react-router';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import BaseLayout from './views/BaseLayout';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route element={<BaseLayout/>}>
          <Route path="/" element={<HomePage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
