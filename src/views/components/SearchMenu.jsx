import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const workers_url = "https://64aff2d6c60b8f941af4eef8.mockapi.io/workers/";

const blankUser = {
  createdAt: "",
  name: "",
  avatar: "",
  email: "",
  mobile: "",
  country: "",
  id: ""
}

const UserSearch = () => {

  const { user } = useContext(UserContext)
  //la palabra de la busqueda que escribo en el input
  const [searchTerm, setSearchTerm] = useState('');
  //guardamos los usuarios
  const [worker, setWorker] = useState([]);
  //usuarios filtrados, que coinciden con el la palabra de busqueda
  //const [filteredWorker, setFilteredWorker] = useState([]);

  const [sortedWorker, setSortedWorker] = useState([])

  const [show, setShow] = useState(false);

  const [currentUser, setCurrentUser] = useState(blankUser);

  const deleteOne = (workers) => {
    fetch(`${workers_url}${workers.id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(data => {
        setCurrentUser(data);
        window.location.reload()
      })
      .catch((err) => console.error(err));
  }

  const fetchWorker = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(worker => {
        setWorker(worker);
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    fetchWorker(workers_url);
  }, []);

  //busqueda
  const handleSearch = () => {
    const filtered = worker.filter((usr) =>
      usr.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setWorker(filtered.slice(0, 10)); // Limitar a los primeros 10 resultados
  };

  const handleSort = () => {
    const sorted = worker.sort((a, b) => a.country - b.country);
    setSortedWorker(sorted)
  }

  const handleReset = () => {
    //setWorker(worker);
    setSearchTerm('');
    fetchWorker(workers_url)
  };


  function handleAdvise() {
    Swal.fire('Proximamente.....')
  }

  return (
    <>
      <div>
        <h2 className='title2-description'>A quien vas a contratar?</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className='btn2'>Buscar</button>
        <button onClick={handleSort} className='btn2'>Ordenar por pais</button>
        <button onClick={handleReset} className='btn2'>Limpiar Busqueda</button>
      </div>
      <div className='card-format'>
        {user ? (
          workers.map((workers, index) => (
            <div className="card" key={index}>
              <img src={workers.avatar} className="card-img-top" alt="photo-workers" />
              <div className="card-body">
                <h5 className="card-title">{workers.name}</h5>
                <p className="card-text">{workers.country} </p>
                <a onClick={handleAdvise} className="btn btn-outline-success margin-btn">Contactar</a>
                <Link onClick={() => deleteOne(workers)}><button className='btn btn-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg></button></Link>
              </div>
            </div>
          ))
        ) : (
          worker.map((workers, index) => (
            <div className="card" key={index}>
              <img src={workers.avatar} className="card-img-top" alt="photo-workers" />
              <div className="card-body">
                <h5 className="card-title">{workers.name}</h5>
                <p className="card-text">{workers.country} </p>
                <Link to={"/login.jsx"} className="btn btn-outline-success">Contactar</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserSearch;

