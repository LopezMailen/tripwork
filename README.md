# TP Integrador en React
Hemos desarrollado un proyecto integrador en React que utiliza todos los conceptos aprendidos hasta ahora, incluyendo la implementación de metodologías ágiles como Scrum, y aplicando buenas prácticas de programación. El proyecto se llama TripWork y es una aplicación de página única (SPA) que conecta a clientes y usuarios trabajadores para contratarlos en diferentes proyectos laborales.

La aplicación consta de una página de inicio (Index) accesible para cualquier usuario, pero para interactuar en el sitio es necesario registrarse (Register) y luego iniciar sesión (Login) para realizar operaciones CRUD.

Los miembros del equipo que han trabajado en este proyecto son:

 - Yohana Mailen Lopez


## Requisitos previos

Se debera contar con el programa **Visual Studio Code**, e instalar **Node JS** en el entorno de desarrollo. También, es requisito tener descargado **GIT**, que facilita la interación entre nuestro proyecto y el repositorio de GitHub.

## Instrucciones de Instalación

 1. Clonar el repositorio del proyecto desde [GitHub](https://github.com/LopezMailen/tripwork.git)
2. Ya en nuestra PC, abrir la terminal de Git, se debe escribir el comando 
> ``$ git clone https://github.com/LopezMailen/tripwork.git)``
3. Ya con el proyecto descargado, abrir Visual Studio Code, y en la terminal del programa, se deberá instalar todas las dependencias del proyecto, para que funcione correctamente. con el comando: 
> ``npm i bootstrap react-router-dom sweetalert2``

## Instrucciones de Ejecución 

Para poder correr el proyecto en tu navegador preferido, tendras que escribir 
>`` npm run dev ``

Ese comando generará un puerto que hace de servidor, haciendo ``Ctrl+Click`` el proyecto aparecerá finalmente en tu navegador.

## Uso del Proyecto 

 - **Index**: Tendrá la vista principal, con botones que redirigen a otras funciones, y que dependerá de si esta logueado o no de la interaccion que se le permitirá realizar.
 - **Login**: Esta sección le pedira al usuario su mail y password, y mediante una validacion, podra o no ingresar a la plataforma. De denegar el permiso, le damos la opcion de redirirlo a la seccion Registrarse.
 - **Register**: En este apartado le pediremos a todo nuevo potencial usuario los datos que necesitamos para que este registrado en nuestro sistema.
 - **Cargar Perfil**: En el caso de que un usuario quiera publicar su perfil, debera registrase para hacerlo.

