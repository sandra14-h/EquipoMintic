//cargar libreria a operar con bases de datos mysql
var mysql = require("mysql");

//cargar archivo de configuracion
var configBD = require("../configuracion/bd.config");

//crear la conexion
var conexion = mysql.createConnection({
    host: configBD.SERVIDOR,
    user: configBD.USUARIO,
    password: configBD.CLAVE,
    database: configBD.BASEDATOS,

});

//Abrir la conexion a la base de datos
conexion.connect((error)=>{
     if(error) throw error;
     //mostrar por consola
     console.log("Conexion exitosa a la BD de equipomintic");
}

);

module.exports = conexion;//funcionalidad para conectar a la base de datos

