//Cargar la libreria con la conexion a la base de datos
var sql = require("../modelos/bd");

//Constructor
var Administrador = function (administrador) {
    this.id = administrador.Id;
    this.nombre = administrador.Nombre;
    this.apellido = administrador.Apellido;
    this.email = administrador.Email;
    this.celular = administrador.Celular;
}
Administrador.obtener = (idadministrador, resultado) => {
    sql.query(`SELECT * FROM administrador WHERE id=${idadministrador};`, (err, res)=>{
        //verificar si hubo error ejecutando la consulta
        if (err) {
            console.log("Error consultando administrardor:", err);
            resultado(err, null);
            return;

        }
        //Laconsulta devuelve resultados
        if (res.length) {
            console.log("administrador encontrado :", res[0]);
            resultado(res[0], null);
            return;

        }
        //no se encontro registro
        resultado({tipo:"No encontrado"}, null);
    });
}
module.exports = Administrador;

