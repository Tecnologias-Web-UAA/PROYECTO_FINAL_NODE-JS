const app = require('./conexion')


const port = process.env.PORT || 3000;

require('./firebase')//requerir el archivo firebase



app.listen(port, () => {//arrancar el servidor en el puerto 3000
    console.log(`hola servidor ejecucion en http://localhost:${port}`);
})