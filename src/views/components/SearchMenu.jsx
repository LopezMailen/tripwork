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
  const [searchTerm, setSearchTerm] = useState('');
  const [worker, setWorker] = useState([]);
  const [sortedWorker, setSortedWorker] = useState([]);
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(blankUser);

  const deleteOne = (workers) => {
    const shouldDelete = window.confirm(`¿Estás seguro de eliminar a ${workers.name}?`);
    if (shouldDelete) {
      fetch(`${workers_url}${workers.id}`, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then(data => {
          setCurrentUser(data);
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
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

  const handleSearch = () => {
    const filtered = worker.filter((usr) =>
      usr.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setWorker(filtered.slice(0, 10));
  };

  const handleSort = () => {
    const sorted = worker.sort((a, b) => a.country - b.country);
    setSortedWorker(sorted);
  }

  const handleReset = () => {
    setSearchTerm('');
    fetchWorker(workers_url);
  };

  const handleAdvise = (email) => {
    if (email) {
      Swal.fire({
        title: 'Contactar',
        text: `Por favor, ingresa tu mensaje para ${email}:`,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        preConfirm: (message) => {
          return fetch('https://64aff2d6c60b8f941af4eef8.mockapi.io/workers/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: email,
              message: message,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error al enviar el mensaje.');
              }
              return response.json();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Error: ${error.message}`);
            });
        },
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Mensaje enviado',
              text: 'Tu mensaje ha sido enviado exitosamente. Recibirás una respuesta a la brevedad posible.',
              icon: 'success',
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
            icon: 'error',
          });
        });
    } else {
      Swal.fire('El correo electrónico no está disponible actualmente.');
    }
  };

  return (
    <>
      <div>
        <h2 className='title2-description'>PERSONAL DISPONIBLE</h2>
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
          worker.map((workers, index) => (
            <div className="card" key={index}>
              <img src={workers.avatar} className="card-img-top" alt="photo-workers" />
              <div className="card-body">
                <h5 className="card-title">{workers.name}</h5>
                <p className="card-text">{workers.country} </p>
                <a onClick={() => handleAdvise(workers.email)} className="btn btn-outline-success margin-btn">Contactar</a>
                <button onClick={() => deleteOne(workers)} className='btn btn-danger'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </button>
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
                <Link to={"/login.jsx"} className="btn btn-outline-success"></Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserSearch;