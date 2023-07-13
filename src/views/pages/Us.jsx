import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Us() {
    return (
        <>
            <Header />
            <main className="main-us">
                <div className="main-section">
                    <h1>¿Quiénes somos?</h1>
                    <p className="texto-somos">Somos una empresa especializada en brindar un valioso servicio de listado de potenciales trabajadores. Nuestro objetivo principal es facilitar a las empresas el proceso de selección de personal, ofreciendo una amplia base de datos de candidatos altamente cualificados.

En nuestra empresa, entendemos la importancia de contar con un equipo de trabajo competente y comprometido, ya que sabemos que los empleados son el motor principal de cualquier organización exitosa. Por lo tanto, nos dedicamos a recopilar y mantener actualizada una amplia red de profesionales talentosos en diversos campos y disciplinas.

Nuestro equipo de expertos se encarga de realizar un exhaustivo proceso de selección y evaluación de los candidatos antes de agregarlos a nuestra base de datos. Utilizamos criterios de búsqueda y filtros personalizados para asegurarnos de que los perfiles que ofrecemos se ajusten perfectamente a las necesidades y requisitos de cada empresa.
</p>
                </div>
                <div className="mission-section">
                    <img className="img-somos" src="/src/assets/somos.jpg" />
                </div>
            </main>
            <Footer />

        </>
    )
}

export default Us;