import express, { json, urlencoded } from 'express';
import handlebars from 'express-handlebars';
import __dirName from './utils.js';

/* Importamos express */
const app = express();

/* Definimos el puerto */
const port = 8080;

/* Escuchamos los cambios del servidor */
app.listen( port, ()=>{ console.log('Corriendo en el servidor ' + port) } );

/* Middlewares */
app.use( express.json() );
app.use( express.urlencoded ( { extended: true } ) );

/* Configuramos el motor de handlebars */
app.engine( 'handlebars', handlebars.engine() ); /* Defino el motor de plantillas */
app.set('views', __dirName + '/views') /* Defino la ruta donde se encuentran las vistas */
app.set('view engine', 'handlebars') /* Defino el motor de renderizacion */
app.use(express.static( __dirName + '/public'))

/* Renderizamos el contenido */

app.get('/', ( req, res ) => {
    let user = {
        nombre: 'Jared',
        edad: 26
    }

    res.render('index', user)
})