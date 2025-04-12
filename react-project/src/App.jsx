
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { Routes, Route } from 'react-router-dom';
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Exhibitions from './pages/Exhibitions';
// import ExhibitionSingle from './pages/ExhibitionSingle'; // Додано імпорт

// import Catalog from './pages/Catalog';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ScrollHandler from './components/ScrollHandler';
// import { checkAuth } from './context/AuthContext.jsx';
// import { ExhibitionsProvider } from './context/ExhibitionsContext';

// function App() {
//   const isAuthenticated = checkAuth();

//   return (
//     <ExhibitionsProvider> {/* Обгортаємо весь додаток в провайдер */}
//       <ScrollHandler />
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/exhibitions" element={<Exhibitions />} />
//           <Route path="/exhibition/:id" element={<ExhibitionSingle />} /> {/* Додано новий маршрут */}
//           <Route path="/add-exhibition" element={<AddExhibition />} />
//           <Route path="/catalog" element={<Catalog />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
//           <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
//         </Routes>
//       </Layout>
//     </ExhibitionsProvider>
//   );
// }
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Exhibitions from './pages/Exhibitions';
import ExhibitionSingle from './pages/ExhibitionSingle';
import AddExhibition from './pages/AddExhibition';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollHandler from './components/ScrollHandler';
import { checkAuth } from './context/AuthContext';
import { ExhibitionsProvider } from './context/ExhibitionsContext';

function App() {
  const isAuthenticated = checkAuth();

  return (
    <ExhibitionsProvider>
      <ScrollHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/exhibition/:id" element={<ExhibitionSingle />}  />
          <Route path="/add-exhibition" element={<AddExhibition />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
        </Routes>
      </Layout>
    </ExhibitionsProvider>
  );
}

export default App;