const express = require("express"); // Importar express
const router = express.Router();
const enviar = require('../control/correo');

const {db} = require("../firebase");
router.get('/',(req,res)=>{
  res.sendFile(process.cwd()+"/src/dist/tienda-electronica/index.html");


});

router.get('/port',(req,res)=>{

  
})
//Peticion para enviar correo
router.post('/envio',enviar.envio);

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
///compras
router.post('/altaCompra/:coleccion', async (req,res) => {
    const {id, descripcion,nombre,precio_unitario,cantidad,imagen,fecha,total } = req.body;
    const mis_datos = req.body;
    const coleccion = req.params.coleccion;   

    await db.collection(coleccion).add(mis_datos);

    res.send('Alta exitosa');
});
router.post('/altaAlgo/:coleccion', async (req,res) => {
    
    const mis_datos = req.body;
    const coleccion = req.params.coleccion;   

    await db.collection(coleccion).add(mis_datos);
    console.log(mis_datos);
    res.send('Alta exitosa');
});

router.get('/consultaTodo/:coleccion', async (req,res)=>{
    const collection = req.params.coleccion;
    
    const querySnapshot = await db.collection(''+collection).get();
  
    const myarray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    myids = [];
    snapshot = await db.collection(collection).get();
    snapshot.forEach(doc => {//recorretodo el vector sacando todos sus datos
        console.log(doc.id, '=>', doc.data());
        myids.push(doc.id);
      });
    //console.log(querySnapshot.docs[1].data());
    res.send({//envio todo el array de la base de datos de firebase
        myarray:myarray,
        myids:myids
    });
});


router.get('/eliminarAlgo/:coleccion/:id', async (req, res) => {
    await db.collection(req.params.coleccion).doc(req.params.id).delete();
    coleccion = req.params.coleccion;
    id = req.params.id;
    console.log("id: "+id+" -coleccion: "+coleccion);
    res.send('Registro eliminado exitosamente');
});
//Opcion de petición de Actualizar doc de la base de datos
router.post('/actualizarAlgo/:coleccion/:id', async (req, res) => {
    const  id  = req.params.id; //obtengo el id mandado por el metodo post
    const coleccion = req.params.coleccion;
    const obj = req.body;
    console.log("id: "+id+" coleccion: "+coleccion+" obj: "+obj);
    
     db.collection(coleccion).doc(id).update(req.body);
     res.send('actualizarAlgo exitoso')
});
router.get('/consultaUno/:coleccion/:id', async (req, res) => {
  
     const  id  = req.params.id; //obtengo el id mandado por el metodo post
     const coleccion = req.params.coleccion;
     console.log("id: "+id+" coleccion: "+coleccion);
     
     const doc_ref = db.collection(coleccion).doc(id);
     const doc = await doc_ref.get();
    console.log("data: "+doc.data());

 
        res.send({
            data:doc.data()
        });
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
    cantidadnew: cant,
    producto: respu,
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


router.post('/altaUsuario/:coleccion', async (req,res) => {
  let {id,nombre,privilegios,correo,domicilio } = req.body;
  let mis_datos = req.body;
  let coleccion = req.params.coleccion;   

  await db.collection(coleccion).add(mis_datos);

  res.send('Alta exitosa del Usuario');
});



module.exports = router