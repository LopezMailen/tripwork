import { useState, useContext } from "react";
import { UserContext } from "../../UserContext.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Swal from 'sweetalert2'

const users_url = "https://647a6c7ed2e5b6101db05858.mockapi.io/users/";

function Register() {

  const { user } = useContext(UserContext);

  const { handleLogout } = useContext(UserContext);

  const [users, setUsers] = useState({
    name: "",
    mail: "",
    phone: "",
    password: ""
  });

  //-------------- Agregar un nuevo User -------------------//

  const addOne = (addUser) => {
    fetch(users_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addUser)
    })
      .then((res) => res.json())
      .then(data => {
        setUsers(data)
        window.location = "/";
      })
      .catch(err => console.error(err))
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();
    let timerInterval
    Swal.fire({
      title: 'Bienvenido a <img src="./src/assets/Food App.svg" />',
      html: 'Espera un momento, seras redirigido....',
      timer: 6000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Ready')
      }
    })
    addOne(users);
  }

  function handleChange(e) {
    setUsers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  //-------------- Editar un User existente -------------------//

  const [editUsers, setEditUsers] = useState({});

  const editOne = (id, editUsers) => {
    fetch(users_url + `${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUsers)
    })
      .then((res) => res.json())
      .then(data => {
        setEditUsers(data);
        window.location = "/";
        handleLogout();
      })
      .catch(err => console.error(err))
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Descartar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambios Guardados! &#128526', '', 'success')
        editOne(user.id, editUsers);
      } else if (result.isDenied) {
        Swal.fire('Tus datos no sufrieron cambios', '', 'info')
      }
    })
  }

  function handleEditChange(e) {
    e.preventDefault();
    setEditUsers(((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })));
  }

  //-------------- Eliminar un User del registro -------------------//

  const deleteOne = (user) => {
    fetch(users_url + `${user.id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        window.location = "/";
        handleLogout();
      })
  }

  function deleteUser(e) {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Dar de baja mi cuenta',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Cuenta Eliminada!',
          'Tu cuenta a sido eliminada del sistema',
          'success'
        )
        deleteOne(user);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Operación Cancelada',
          'Seguis conservando tu cuenta &#128522',
          'error'
        )
      }
    })
  }

  return (
    <>
      <Header />
      <main>
        {user ? (
          <div>
            <h3 className="register-heading">Actualiza tus datos</h3>
            <p className="register-description">Acá podés modificar los datos de tu cuenta</p>
            <form id="registroactualizar" onSubmit={handleEditSubmit}>
              <label htmlFor="name">
                Nombre:
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={user.name}
                  onChange={handleEditChange}
                />
              </label>
              <label htmlFor="mail">
                Email:
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  required
                  defaultValue={user.mail}
                  onChange={handleEditChange}
                />
              </label>
              <label htmlFor="phone">
                Telefono:
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  defaultValue={user.phone}
                  onChange={handleEditChange}
                />
              </label>
              <label htmlFor="password">
                Contraseña:
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  defaultValue={user.password}
                  onChange={handleEditChange}
                />
              </label>
              <div>
                <div>
                  <button className="button-actualizar" type="submit-actualizar">Actualizar Datos</button>
                  <button className="button-eliminar" onClick={deleteUser}>Eliminar Cuenta</button>
                </div>
                <button className="button-volver2">
                  <Link to={"/"}>Regresar</Link>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h3 className="register-heading">Formulario de Registro</h3>
            <p className="register-description">Por favor, complete todos los campos para registrarte.</p>
            <form id="registroNuevoUsuario" onSubmit={handleAddSubmit}>
              <label htmlFor="name">
                Nombre:
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="mail">
                Email:
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  required
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="phone">
                Telefono:
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="password">
                Contraseña:
                <input
                  type="text"
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                />
              </label>
              <div>
                <button type="submit-register">Registrarse</button>
                <button type="submit-regresar">Regresar</button>
              </div>

            </form>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Register;