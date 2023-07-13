import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./views/pages/Login.jsx"
import Index from './views/pages/Index.jsx';
import Register from './views/pages/Register.jsx';
import Us from './views/pages/Us.jsx';
import LoadOffer from './views/pages/LoadOffer.jsx';
import Contact from './views/pages/Contact';
import { Routes, Route } from "react-router-dom";

import { UserProvider } from './UserContext';

function App() {

  return (
    <>
      <UserProvider>
        <Routes>
          <Route exact path='/' element={<Index />} />
          <Route exact path='/Login.jsx' element={<Login />} />
          <Route exact path='/Register.jsx' element={<Register />} />
          <Route exact path='/Us.jsx' element={<Us />} />
          <Route exact path='/LoadOffer.jsx' element={<LoadOffer />} />
          <Route exact path='/Contact.jsx' element={<Contact />} />
          <Route exact path='*' element={<div><h1>Pagina no encontrada</h1></div>} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
