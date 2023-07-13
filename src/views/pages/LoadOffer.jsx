import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

const workers_url = "https://64aff2d6c60b8f941af4eef8.mockapi.io/workers/";

function LoadOffer() {

    const { user } = useContext(UserContext);

    const [workers, setWorkers] = useState({
        avatar: "",
        name: "",
        country: ""
    })

    const addOne = (workers) => {
        fetch(workers_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workers),
        })
            .then(res => res.json())
            .then(workers => {
                setWorkers(workers);
                window.location = "/"
            })
            .catch(err => console.error(err));
    }

    function handleSubmit(e) {
        e.preventDefault();
        addOne(workers);
    }

    function handleChange(e) {
        setWorkers((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <>
            <Header />
            <h3 className="carga-oferta">Carga tu perfil acá</h3>
            <main>
                {user ? (
                    <form id="oferta" onSubmit={handleSubmit}>
                        <label htmlFor="foto">
                            Foto descriptiva de lo que queres publicar (copia y pega una ruta de internet):
                            <input type="text" id="foto" name="foto" required
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="name">
                            Nombre:
                            <input type="text" id="name" name="name" required
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="country">
                            Country:
                            <input type="number" id="country" name="country" required
                                onChange={handleChange}
                            />
                        </label>
                        <div>
                            <button type="submit">Subir Perfil</button>
                            <button className="button-offer">
                                <Link to={"/"}>Volver a la página principal</Link>
                            </button>
                        </div>
                    </form>
                ) : (
                    <form id="registroNuevoUsuario" onSubmit={handleSubmit}>
                        <label htmlFor="avatar">
                            Foto descriptiva de lo que queres publicar (copia y pega una ruta de internet):
                            <input type="text" id="avatar" name="avatar" required
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="name">
                            Nombre:
                            <input type="text" id="name" name="name" required
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="country">
                            Country:
                            <input type="text" id="country" name="country" required
                                onChange={handleChange}
                            />
                        </label>
                        <div>
                            <button type="submit">Subir Perfil</button>
                            <button><Link to={"/"} >Volver a la pagina principal</Link> </button>
                        </div>
                    </form>
                )}
            </main>
            <Footer />
        </>
    )
}

export default LoadOffer