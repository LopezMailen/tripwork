import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Swal from "sweetalert2";



function Contact() {
    function handleSubmit(e) {
        e.preventDefault();

        const mail = {
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            email: e.target.email.value,
            mensaje: e.target.mensaje.value
        };

        if (
            mail.nombre.trim() === "" ||
            mail.apellido.trim() === "" ||
            mail.email.trim() === "" ||
            mail.mensaje.trim() === ""
        ) {
            Swal.fire({
                title: 'Completa todos los datos',
                text: 'Por favor, asegúrate de llenar todos los campos requeridos.',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#2a78ea', // Cambiar el color del botón "OK" a naranja (#ff8800)
                confirmButtonText: 'Aceptar', // Cambiar el texto del botón "OK" a "Aceptar"
                customClass: {
                    container: 'custom-swal-container',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content', // Clase para el texto del mensaje (puedes ajustarla según tus necesidades)
                    icon: 'custom-swal-icon',
                    confirmButton: 'custom-swal-confirm-button', // Clase para el botón "OK"
                },
            });
        } else {
            Swal.fire({
                
                position: 'center', // Centrar el mensaje en el medio de la pantalla
                 
                icon: 'success',
                title: '¡Gracias por su mensaje!',
                html: 'Apreciamos su interés en contactarnos. Nuestro equipo revisará su mensaje y nos pondremos en contacto a la brevedad posible a través del correo electrónico proporcionado. Si tiene alguna otra consulta, estaremos encantados de asistirle.',
                showConfirmButton: false,
                timer: 8000 // Mostrar el mensaje por 8 segundos (puedes ajustar el tiempo según tus necesidades)
          
               
            });

            console.log(mail);
        }
    }

    return (
        <>
            <Header />
            <form id="formu-consulta" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre
                    <input type="text" name="nombre" id="nombre" />
                </label>
                <label htmlFor="apellido">Apellido
                    <input type="text" name="apellido" id="apellido" />
                </label>
                <label htmlFor="email">Email
                    <input type="email" name="email" id="email" />
                </label>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea name="mensaje" id="mensaje" cols="30" rows="10" placeholder="Escriba su mensaje..."></textarea>

                <div>
                    <button className="busqueda" type="submit">Enviar</button>
                    <button className="busqueda" type="reset">Limpiar</button>
                </div>
            </form>
            <Footer />
        </>
    );
}

export default Contact;