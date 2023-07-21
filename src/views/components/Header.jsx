import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";


function Header() {
    const { user, handleLogout } = useContext(UserContext);
    return (
        <>
            <header >
                <nav className="header-format">
                    <Link to={"/"} ><img src="/src/assets/trip_logo_web.png" /></Link>
                    {
                        user ? (
                            <div>
                                <ul>
                                    <li className="welcome-message"> Hola, {user.name}</li>
                                    <li><Link to={"/Register.jsx"}><button className="btn1"> Editar</button></Link></li>
                                    <li><button className="btn2" onClick={handleLogout}>Salir</button></li>
                                </ul>
                            </div>

                        ) : (
                            <div>
                                <ul>
                                    <div className="link-header">
                                    <ul>
                                    <li><p><Link to={"/Us.jsx"}>Quiénes Somos</Link></p></li>
                                    <li><p><Link to={"/Contact.jsx"}>Contactanos</Link></p></li>
                                    </ul></div>
                                    <li><Link to={"/Login.jsx"}><button className="btn1">Iniciar Sesión</button></Link></li>
                                    <li><Link to={"/Register.jsx"} ><button className="btn2">Registrarme</button></Link></li>
                                </ul>
                            </div>
                        )
                    }
                </nav>
            </header>
        </>
    )
}

export default Header