const express=require('express');
const app=express();
const puerto=3010;

app.get('/', (req,res)=>{
  res.send('Servicio de base de datos en funcionamiento');
});

require("./rutas/admistrador.rutas")(app);

app.listen(puerto, () => {
    console.log(`Servicio de Bd escuchando por el puerto http://localhost:${puerto}`);
});