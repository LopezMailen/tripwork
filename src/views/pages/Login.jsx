import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../UserContext.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const users_url = "https://647a6c7ed2e5b6101db05858.mockapi.io/users";

function Login() {

    const { handleLogin } = useContext(UserContext);

    const [logIn, setLogIn] = useState({
        mail: "",
        password: ""
    })

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(users_url)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => console.error(err))
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        const user = users.find(u => u.mail === logIn.mail && u.password === logIn.password);

        if (user) {
            setMessage("Bienvenido!!")
            handleLogin(user);
        } else {
            setMessage("Credenciales incorrectas...")
        }
    }

    function handleChange(e) {
        setLogIn((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <>
            <Header />
            <main>
                <div className="registration">
                    <h2>Registrate o ingresá para continuar</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className='form-box-style'>
                        <div className="mb-3">
                            <label htmlFor="mail" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="mail" name="mail" required
                                onChange={handleChange}
                            />
                            <div id="emailHelp" className="form-text">No compartiremos sus datos con nadie.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Recordar mi contraseña</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                        {message && <p>{message}</p>}
                        <p>Sos nuevo en el sitio? <Link to={"/Register.jsx"} >Registrate acá.</Link> </p>
                    </form>
                </div>
            </main>
          
            <Footer />
        </>
    )
}

export default Login