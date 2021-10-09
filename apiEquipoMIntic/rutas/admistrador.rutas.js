module.exports = (app) => {
    var administrador = require('../controladores/administrador.controlador');

    //metodo que obtiene 
    app.get("apiEquipoMintic/administrador/:id", administrador.obtener);
}