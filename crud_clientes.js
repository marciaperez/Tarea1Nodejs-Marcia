import express from "express"
import { conectar } from "../modelo/db_conectar.js"
var crud_cliente=({})
crud_cliente.leer = (req,res)=>{
    conectar.query('SELECT id_cliente,nit,nombres,apellidos,direccion,telefono,date_format(fecha_nacimiento,"%d/%m/%Y") as fecha_nacimiento FROM clientes;',(error,results)=>{
        if (error){
            throw error;
        }else{
            res.render('clientes/index',{resultado:results})
        }
    })
};
crud_cliente.cud = (req,res) =>{
    const btn_crear = req.body.btn_crear;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id_cliente = req.body.txt_id;
    const nit = req.body.txt_nit;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const fecha_nacimiento = req.body.txt_fn;
    if (btn_crear){
        conectar.query('insert into clientes set ?',{nit:nit,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,fecha_nacimiento:fecha_nacimiento},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });

    }
    if (btn_actualizar){
        conectar.query('update clientes set ? where id_cliente = ?',[{nit:nit,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,fecha_nacimiento:fecha_nacimiento},id_cliente],(error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });

    }
    if (btn_borrar){
        conectar.query('delete from clientes where id_cliente = ?',[id_cliente],(error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/');
            }
        });


    }

};
export{crud_cliente}