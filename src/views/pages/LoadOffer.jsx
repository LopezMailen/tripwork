import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

const workers_url = "https://64aff2d6c60b8f941af4eef8.mockapi.io/workers/"; // 1

const LoadOffer = () => {
  const { user } = useContext(UserContext);

  const [workers, setWorkers] = useState({
    avatar: "",
    name: "",
    country: "",
    mobile: "",
    email: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const addOne = (newWorker) => {
    fetch(workers_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorker),
    })
      .then(res => res.json())
      .then(data => {
        setWorkers(data);
        window.location = "/";
      })
      .catch(err => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addOne(workers);
  }

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    setWorkers({
      ...workers,
      avatar: URL.createObjectURL(file),
    });
  };

  return (
    <>
      <h3 className="carga-perfil">Carga tu perfil acá</h3>
      <main>
        {user ? (
          <form id="of2" onSubmit={handleSubmit}>
            <label htmlFor="foto">
              Foto de perfil
              <input type="file" id="foto" name="foto" required onChange={handleChange} />
            </label>
            {selectedImage && <img src={selectedImage} alt="Imagen seleccionada" />}
            <label htmlFor="name">
              Nombre:
              <input type="text" id="name" name="name" required onChange={(e) => setWorkers({ ...workers, name: e.target.value })} />
            </label>
            <label htmlFor="pais">
              Country:
              <input type="text" id="pais" name="pais" required onChange={(e) => setWorkers({ ...workers, country: e.target.value })} />
            </label>
            <label htmlFor="email">
              Email:
              <input type="email" id="email" name="email" required onChange={(e) => setWorkers({ ...workers, email: e.target.value })} />
            </label>
            <label htmlFor="mobile">
              Teléfono:
              <input type="tel" id="mobile" name="mobile" required onChange={(e) => setWorkers({ ...workers, mobile: e.target.value })} />
            </label>
            <div>
              <button type="submit">Subir Perfil</button>
              <button className="button-vol">
                <Link to={"/"}>Volver</Link>
              </button>
            </div>
          </form>
        ) : (
          // Código para usuarios no autenticados
          <form id="registroNuevoUsuario" onSubmit={handleSubmit}>
            <label htmlFor="avatar">
              Foto descriptiva 
              <input type="text" id="avatar" name="avatar" required onChange={(e) => setWorkers({ ...workers, avatar: e.target.value })} />
            </label>
            <label htmlFor="name">
              Nombre:
              <input type="text" id="name" name="name" required onChange={(e) => setWorkers({ ...workers, name: e.target.value })} />
            </label>
            <label htmlFor="country">
              Country:
              <input type="text" id="country" name="country" required onChange={(e) => setWorkers({ ...workers, country: e.target.value })} />
            </label>
            <div>
              <button type="submit">Subir Perfil</button>
              <button><Link to={"/"}>Volver</Link></button>
            </div>
          </form>
        )}
      </main>
    </>
  )
}

export default LoadOffer;