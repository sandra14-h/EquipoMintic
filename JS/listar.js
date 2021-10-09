var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB", 65535)

function limpiar(){
    document.getElementById("nombre").value=" ";
    document.getElementById("marca").value=" ";
    document.getElementById("fecha").value=" ";
}
$ (function () {                                  //listar productos
    function cargarDatos(){
       $("#listaVentas").children().remove();
       db.transaction(function (transaction){
           var sql="SELECT * FROM ventas ORDER BY id DESC";
           transaction.executeSql(sql, undefined, function(transaction,result) {
 
             if (result.rows.length) {
                 $("#listaVentas").append('<tr><th>Codigo</th><th>Producto</th><th>Precio</th></tr><th></th><th></th>');
                 for (var i=0; i< result.rows.length; i++) {
                     var row= result.rows.item(i);
                     var item=row.item;
                     var id = row.id;
                     var precio=row.precio;
                     $("#listaVentas").append('<tr id="fila'+id+'" class="Reg_A'+id+'"><td><span class="mid">A'+
                     id+'</span></td><td><span>'+item+'</span></td><td><span>'+
                     precio+' $</span></td><td><button type= "button" id="A'+id+'" class="btn btn-success"><img src="librerias/img/editar.png" /></button></td><td><button type= "button" class="btn btn-danger" onclick="eliminarRegistro()"> <img src="librerias/img/delete.png" /></button></td></tr>');
                     
                 }
             }else{
                 $("#listaVentas").append('<tr><td colspan="5" aling="center">NO existen registros de venta</td></tr>'); 
             }
             
            },function (transaction,err) {
                alert(err.message);
                
            })
       })
 
     }})