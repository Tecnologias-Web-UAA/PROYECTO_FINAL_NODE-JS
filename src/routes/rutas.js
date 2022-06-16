const express = require("express"); // Importar express
const router = express.Router();

const {db} = require("../firebase")

//Opcion para petición para condultar toda la informacion de la base de datos
router.get('/consultas', async (req,res)=>{

    const querySnapshot = await db.collection('producto').get()
    
    /* for (let i = 0; i < querySnapshot.size; i++) {
        console.log(querySnapshot.docs[i].data());
        
    } */
    const productos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(productos)
    //console.log(querySnapshot.docs[1].data());
    res.send({//envio todo el array de la base de datos de firebase
        productos:productos
    })
});

//Opcion de Petición de dar de alta un doc de la base de datos
router.post('/altas', async (req,res) => {
    const { cantidad, nombre, precio } = req.body;

    console.log(cantidad, nombre, precio);

    await db.collection('producto').add({
        cantidad,
        nombre,
        precio
    });

    res.send('Alta exitosa');
});

//Opcion de eliminar un doc de la base de datos
router.get('/eliminar/:id', async (req, res) => {
    await db.collection('producto').doc(req.params.id).delete();

    res.send('Registro eliminado exitosamente');
});

//Opcion de petición de Actualizar doc de la base de datos
router.post('/update/:id', async (req, res) => {
    const { id } = req.params; //obtengo el id mandado por el metodo post

    db.collection('producto').doc(id).update(req.body);
});

//Opcion de petición de consultas a la base de datos
router.get('/consultar', async (req, res) => {
   /*  const consulta =  db.collection('producto').doc().where('cantidad', '==', 6);
    const resultado = await consulta.get()
    console.log(resultado.data());
    res.send(resultado.data()); */

    let arrayProd = db.collection('producto');
    let snapshot = await arrayProd.where('cantidad', '<=', 6).get();//recupera un vector con la consulta dada

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      
      let vec=[];

      snapshot.forEach(doc => {//recorretodo el vector sacando todos sus datos
        console.log(doc.id, '=>', doc.data());
        vec.push(doc.data());
      });

      res.send(vec);
});

router.get('/consultarqr/:id', async (req, res) => {
  let consu = await db.collection('producto').doc(req.params.id).get();
  let respu = consu.data();
  
  console.log(respu)
  res.send({
    respuesta: respu
  });

});

router.get('/comprarProducto/:id', async (req, res) => {
  let consuProd = await db.collection('producto').doc(req.params.id).get();
  let respu = consuProd.data();
  let cant = respu.cantidad-1;
  let consuActua = db.collection('producto').doc(req.params.id);
  let cambio = await consuActua.update({
    cantidad: cant
  });

  res.send({
    msg:'Compra Exitosa',
    cantidadnew: cant
  });

});

router.get('/QRProductoID/:id', async (req, res) => {
  let consu = await db.collection('producto').doc(req.params.id).get();
  let respu = consu.data();
   
      console.log(respu)
      res.send({
        respuesta: respu
      });

});

module.exports = router