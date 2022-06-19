const {request, response} = require('express');
const nodeMailer =require('nodemailer');

const envio=(req=request,resp=response)=>{
    let body=req.body;
    
    let config = nodeMailer.createTransport({//variable de configuracion nodemailer
        host:'smtp.gmail.com',//can change avaible, can be outlook, yahoo, etc
        post:587,
        auth:{
            user:'luisenriquenavarrocruz@gmail.com',
            pass:'ohzcfrelthlgzvct'
        }
    });
    const opciones={
        from: '',
        subject: 'Solicitud de correo de: ' + body.email,
        to: 'luisenriquenavarrocruz@gmail.com',
        text:body.mensaje
    };
    config.sendMail(opciones,function(error,result){

        if (error) return resp.json({ok:false,msg:error});

        return response.json({
            ok:true,
            msg:result
        });
    })
}
module.exports={
envio
}