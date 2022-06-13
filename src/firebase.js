require('dotenv').config()


const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } =  require('firebase-admin/firestore')

initializeApp({
    credential: applicationDefault()//inicializo con las credenciales por default que las busque
});

const db = getFirestore();//conectarme a la base de datos de firebase

module.exports = {
    db,//exportar e db que es la conexion 
};