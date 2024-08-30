// Snippets de código para poder componer el programa

//Usado?: yes APP.JS
  const middlewares = require('./middlewares');
//--- Explicación: REQUIERE LAS FUNCIONES MIDDLEWARE DEL ARCHIVO MIDDLEWARE.JS

// -------------------------------------------------------------------------------------

//Usado?: YES MIDDLEWARES.JS
  const bodyParser = require('body-parser');
//--- Explicación: es un middleware de express para procesar los datos enviado mediante el formulario

// -------------------------------------------------------------------------------------

//Usado?: YES MIDDLEWARES.JS
  const session = require('express-session');
//--- Explicación: es un middleware que maneja sesiones de usuario. Mantiene el estado del usuario entre diferentes solicitudes

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
  const express = require('express');
//--- Explicación: REQUIERE EXPRESS 

// -------------------------------------------------------------------------------------

//Usado?: NOPE
  const bodyParser = require('body-parser');
//--- Explicación:no hace falta

// -------------------------------------------------------------------------------------

//Usado?: NOPE
  const session = require('express-session');
//--- Explicación: es un middleware que maneja sesiones de usuario. Mantiene el estado del usuario entre diferentes solicitudes
//no hace falta

// -------------------------------------------------------------------------------------

//Usado?: YES ROUTES.JS
  const middlewares = require('./middlewares');
//--- Explicación: REQUIERE LAS FUNCIONES MIDDLEWARE DEL ARCHIVO ROUTER.JS

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
  const routes = require('./routes');
//--- Explicación: REQUIERE LA FUNCION QUE SE EXPORTA DEL ARCHIVO ROUTES.JS

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
  const app = express();
//--- Explicación: INICIALIZA EXPRESS EN UNA VARIABLE

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
  const PORT = 4000;
//--- Explicación:  CREAMOS UNA VARIABLE PARA EL PUERTO QUE VAMOS A UTILIZAR

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
  const dotenv = require('dotenv');
//--- Explicación: REQUIERE TODOS LOS ELEMENTOS DE .ENV

// -------------------------------------------------------------------------------------

//Usado?: YES.JS
  dotenv.config();
//--- Explicación: INICIALIZA .ENV

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
  middlewares.setupApp(app);
//--- Explicación: LLAMA A LA FUNCION SETUPJS DEL MODULO MIDDLEWARES

// -------------------------------------------------------------------------------------

//Usado?: YES.APP.JS
  routes.setup(app);
//--- Explicación: LLAMA A LA FUNCION SETUPJS DEL MODULO ROUTES

// -------------------------------------------------------------------------------------

//Usado?: YES MIDDLEWARES.JS
const validarPalabraMiddleware = (req, res, next) => {
   const palabraCorrecta = process.env.PALABRA_SECRETA || '';

   if (req.body.palabra === palabraCorrecta) {
     req.session.palabraSecreta = req.body.palabra;
     next();
   } else {
     res.redirect('/?error=1');
   }
 };
//--- Explicación: VERIFICA LA SI NO ES CORRECTA REDIRIGE RAIZ Y TE PONE EL MENSAJE DE ERROR Y SI ES CORRECTA COMPLETA EL MIDDLEWARE


// -------------------------------------------------------------------------------------


//Usado?: YES ROUTES.JS
 const setup = (app) => {
   app.get('/', (req, res) => {
     const mensajeError = req.query.error
       ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
       : '';
     if (req.session.palabraSecreta) {
       return res.redirect('/profile');
     }
   //Aquí va código dentro
 })}
//--- Explicación: LA FUNCION DE ROUTAS DONDE SE COLOCAN TODAS LAS SOLICITUDES DEL SERVIDOR. EN EL APP SE REALIZA TODA LA LOGICA DE LA PALABRA PARA DARTE ERROR O PASAR A LA SIGUIENTE RUTA


// -------------------------------------------------------------------------------------


//Usado?: YES ROUTES.JS 
 res.send(`
   <html>
     <body>
       <h1>Página de Inicio</h1>
       <p>${mensajeError}</p>
       <form method="post" action="/profile">
         <label for="palabra">Introduce la palabra:</label>
         <input type="text" name="palabra" required>
         <button type="submit">Enviar</button>
       </form>
     </body>
   </html>
 `);
//--- Explicación: ES EL CUERPO HTML DE LA RAIZ


// -------------------------------------------------------------------------------------

//USADO?: YES MIDDLEWARE.JS 
 const setupAPP = (app) => {
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(session({
     secret: 'secretoSuperSecreto',
     resave: false,
     saveUninitialized: true,
   }));
 };

 //--- Explicación: 


//Usado?: YES ROUTES.JS
 app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
   res.send(`
     <h1>Ruta del Perfil</h1>
     <form method="post" action="/logout">
       <button type="submit">Log Out</button>
     </form>
   `);
 });
//--- Explicación: ES LA RUTA DE CUANDO HEMOS PUESTO LA PALABRA SECRETA Y SI ES CORRECTO TE LELVA AL APP.USE("/PROFILE") Y TE INICIA SESION

// -------------------------------------------------------------------------------------

//Usado?: NOPE
 app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: no hace falta

// -------------------------------------------------------------------------------------

//Usado?: NOPE 
 app.use(session({
   secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
   resave: false,
   saveUninitialized: true,
 }));

//--- Explicación: no hace falta

// -------------------------------------------------------------------------------------

//Usado?: YES APP.JS
 app.listen(PORT, () => {
   console.log(`Servidor en ejecución en http://localhost:${PORT}`);
 });
//--- Explicación: INICIA EL SERVIDOR Y TE LANZA UN MENSAJE EN CONSOLA CON EL ENLACE DEL SERVER

// -------------------------------------------------------------------------------------

//Usado?: YES MIDDLEWARES.JS
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: EL MIDDLEWARE QUE VERIFICA SI HAS PUESTO LA PALABRA CORRECTA Y SI NO LO ES TE REDIGE A RAIZ Y TE MUESTRA EL MENSAJHE DE ERROR

// -------------------------------------------------------------------------------------


//Usado?: YES ROUTES.JS
 app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
   res.send(`
     <h1>Ruta del Perfil (Sesión activa)</h1>
     <form method="post" action="/logout">
       <button type="submit">Log Out</button>
     </form>
   `);
 });
//--- Explicación: VERIFICA SI SE HA INICADO CORRECTAMENTE LA SESION, Y SI ES CORRECTO DE ENVIA A LA PAGINA DE SESION DONDE PUDES HACER UN LOG OUT

// -------------------------------------------------------------------------------------


//Usado?: YES ROUTES.JS
 app.post('/logout', (req, res) => {
   req.session.destroy((err) => {
     if (err) {
       console.error('Error al cerrar sesión:', err);
     }
     res.redirect('/');
   });
 });
//--- Explicación: AL DAR AL BOTON DE LOGOUT SE LLAMA A ESTO Y TE ENVIA DE VUELTA A RAIZ SIN LA SESION INICIADA

// -------------------------------------------------------------------------------------

//Usado?: YES ROUTES.JS
 module.exports = {
   setup,
 };
//--- Explicación: EXPORTA LA FUNCION SETUP

// -------------------------------------------------------------------------------------

//Usado?: YES MIDDLEWARE.JS
 module.exports = {
   validarPalabraMiddleware,
   verificarSesionMiddleware,
   setupAPP,
 };
//--- Explicación: EXPORTA LAS FUNCIONES DE MIDDLEWARE

// -------------------------------------------------------------------------------------

