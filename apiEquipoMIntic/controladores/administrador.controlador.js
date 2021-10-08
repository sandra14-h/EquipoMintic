const Administrador = require('../modelos/Administrador.modelo');
var Proyecto=require('../modelos/Administrador.modelo');

//obtener un administrador
exports.obtener = (req,res) => {
    Administrador.obtener(req.params.id,(err, data) =>{
        //verificar si no hubo error
        if (err) {
            if (err.tipo=='No encontrado') {

             res.status(404).send({message: `No se encontro administrador cion el id ${req.params.id}` });
                
            }
            else{
                res.status(500).send({message: `error obteniendo el administrador cion el id ${req.params.id}` });
              
            }
        }
        else{
            //se devuelve el registro obtenido
            res.send(data);
        }
    });

    
}