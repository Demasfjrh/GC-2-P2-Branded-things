import HomePage from './views/HomePage';
import Footer from './components/Footer';
import ProductDetail from './views/ProductDetailPage';
import BaseLayout from './views/BaseLayout';
import { BrowserRouter, Routes, Route } from 'react-router';
import AnimationPage from './views/animationPage';

function App() {
  return (
    <>
      <div className="bg-black text-white flex flex-col h-full w-auto justify-between">
        <BrowserRouter>
          <Routes>
            <Route element={<BaseLayout />}>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/detail/:id"
                element={<ProductDetail />}
              />
              <Route
                path="/animation"
                element={<AnimationPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
