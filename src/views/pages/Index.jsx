import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../UserContext.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import SearchMenu from "../components/SearchMenu.jsx";

const workers_url = "https://64aff2d6c60b8f941af4eef8.mockapi.io/workers/"

function Index() {

    const { user } = useContext(UserContext)

    const [workers, setWorkers] = useState([]);
    const [show, setShow] = useState(false);

    const fetchWorker = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setWorkers(data);
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchWorker(workers_url)
    }, []);

    const message = show ? "Ocultar Perfiles" : "Ver Perfiles";
    const containerClassName = show ? 'show' : 'hide';

    const handleClick = () => {
        setShow(!show)
    }

    return (
        <>
            <Header />
            <main>
                <div className="description">
                    <section className="section-position">
                        <h3>Viví la experiencia de viajar y trabajar por el mundo</h3>
                        <p>No busques a alguien que haga el trabajo, busca a alguien que comparta tu visión y tu pasión</p>
                        <img className="banner" src="/src/assets/banner_home.png" />
                    </section>
                    <section className="button-position">
                        {user ? (
                            <div>
                                <Link to={"/LoadOffer.jsx"}><button className="btn1">Publica tu Perfil</button></Link>
                                <button className="btnperfil" onClick={handleClick}>{message}</button>
                            </div>
                        ) : (
                            <div>
                                <Link to={"/Login.jsx"}><button className="btn1">Publica tu Perfil</button></Link>
                                <button className="btnperfil" onClick={handleClick}>{message}</button>
                                
                            </div>

                        )}
                    </section>
                </div>
              
            </main>
            <div className={containerClassName}>
                <section className='card-container'>
                    <SearchMenu worker={workers} />
                    {/* <Workers worker={workers} /> */}
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Index;
