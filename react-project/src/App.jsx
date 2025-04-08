// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min'
// import { Routes, Route } from 'react-router-dom';
// import Header from "./components/Header"
// import Footer from "./components/Footer"
// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Exhibitions from './pages/Exhibitions';
// import Catalog from './pages/Catalog';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ScrollHandler from './components/ScrollHandler';


// function App() {
//   return (
//     <>
//     <ScrollHandler />
//     <Layout>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/exhibitions" element={<Exhibitions />} />
//         <Route path="/catalog" element={<Catalog />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Layout>
    
//     </>
//   )
// }

// export default App
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from './components/Layout';
import Home from './pages/Home';
import Exhibitions from './pages/Exhibitions';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollHandler from './components/ScrollHandler';
import { checkAuth } from './context/AuthContext.jsx'; // Підключаємо функцію перевірки авторизації

function App() {
  const isAuthenticated = checkAuth();

  return (
    <>
      <ScrollHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

