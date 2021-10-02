var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB", 65535)

function limpiar(){
    document.getElementById("item").value=" ";
    document.getElementById("nombre").value=" ";
    //document.getElementById("fecha").value=" ";
    document.getElementById("rol").value=" ";
}

//Funcionalidad de los botones

//eliminar registro
function eliminarRegistro() {
   $(document).one('click','button [type = "button"]' , function(event){
       let id=this.id;
       var lista=[];
       $('#listaUsuarios').each(function () {
           var celdas=(this).find('tr.Reg_'+id);
           celdas.each(function () {
               var registro= $(this).find('span.mid');
               registro.each(function(){
                  lista.push($(this).html())
               });
           });
       })
       nuevoId=lista[0].substr(1);
       db.transaction(function(transaction){
           var sql="DELETE FROM usuarios WHILE id="+nuevoId+";"
           transaction.executeSql(sql,undefined,function(){
               alert("Registro eliminado satisfactoriamente")
           }),function(transaction,err){
            alert(err.message);
           }
          
       })
   } )
    
}

//Usamos jquery
$ (function () {
//crear tabla de productos
    $("#crear").click(function(){

        db.transaction(function(transaction){
           var sql="CREATE TABLE usuarios "+
           "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "+
           "item INT(100) NOT NULL, "+
            "nombre VARCHAR (100) NOT NULL,"+"rol VARCHAR (100) NOT NULL)";
           transaction.executeSql(sql,undefined,function(){
               alert("Tabla creada");
             }, function(transaction,err){
               alert("error al crear tabla")
             })
        });
    });
        
 //cargar lista de productos      
 $("#Listar").click(function(){
   cargarDatos();

 }) 
//listar productos
   function cargarDatos(){
      $("#listaUsuarios").children().remove();
      db.transaction(function (transaction){
          var sql="SELECT * FROM usuarios ORDER BY id DESC";
          transaction.executeSql(sql, undefined, function(transaction,result) {

            if (result.rows.length) {
                $("#listaUsuarios").append('<tr><th>Codigo</th><th>Documento</th><th>Nombre</th><th>Rol</th></tr><th></th><th></th>');
                for (var i=0; i< result.rows.length; i++) {
                    var row= result.rows.item(i);
                    var item=row.item;
                    var id = row.id;
                    var nombre=row.nombre;
                    var rol=row.rol;
                    $("#listaUsuarios").append('<tr id="fila'+id+'" class="Reg_A'+id+'"><td><span class="mid">A'+
                    id+'</span></td><td><span>'+item+'</span></td><td><span>'+
                    nombre+' </span></td><td><span>'+rol+'</span></td><td><button type= "button" id="A'+id+'" class="btn btn-success"><img src="librerias/img/editar.png" /></button></td><td><button type= "button" class="btn btn-danger" onclick="eliminarRegistro()"> <img src="librerias/img/delete.png" /></button></td></tr>');
                    
                }
            }else{
                $("#listaUsuarios").append('<tr><td colspan="5" aling="center">NO existen registros de Usuarios</td></tr>'); 
            }
            
           },function (transaction,err) {
               alert(err.message);
               
           })
      })

    }
//insertar registros
$("#insertar").click(function () {

    var documento=$("#item").val();
    var nombre=$("#nombre").val();
    var rol=$("#rol").val();
    db.transaction(function (transaction) {
        var sql="INSERT INTO  usuarios(item,nombre,rol) VALUES(?,?,?)";
        transaction.executeSql(sql,[documento,nombre,rol],function() {

            alert("Datos Registrados Correctamente")
        },function (transaction,err) {
            alert(err.message);
            
        })
            
    })
        limpiar();

        cargarDatos();
        
    })
    
//Eliminar lista de registros
$ ("#Eliminar").click(function () {
    if (!confirm("Esta seguro de eliminar la tabla?, los datos se eliminaran permanentemente","")) 
        return;
    db.transaction(function (transaction) {
        var sql="DROP TABLE usuarios";
           
        transaction.executeSql(sql,undefined,function () {
        alert("Tabla borrada satisfactoriamente")
            
        },function (transaction,err) {
            alert(err.message);
        })  
            
    } )  
    
})
})



