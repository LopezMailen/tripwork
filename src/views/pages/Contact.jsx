import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Swal from "sweetalert2";
function Contact() {
    function handleSubmit(e) {
        e.preventDefault()

        const mail = {
            nombre: e.target[0].value,
            asunto: e.target[1].value,
            mensaje: e.target[2].value
        }

        if ((mail.nombre === "") || (mail.mensaje === "")) {
            Swal.fire('Debe completar todos los campos');
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Gracias por contactarte con nosotros!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(mail);
        }
    }
    return (
        <>
            <Header />
            <form id="registroactualizar" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre y Apellido
                    <input type="text" name='nombre' id='nombre' />
                </label>
                <label htmlFor="asunto">Asunto</label>
                <select defaultValue="Compras" name="asunto" id="asunto">
                    <option value="Compras">Compras</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Inconvenientes">Inconvenientes</option>
                </select>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea name="mensaje" id="mensaje" cols="30" rows="10" placeholder='Escriba su mensaje...'></textarea>

                <div>
                    <button className="busqueda" type="submit">Enviar</button>
                    <button className="busqueda" type="reset">Limpiar</button>
                </div>
            </form>
            <Footer />
        </>
    )
}
export default Contact