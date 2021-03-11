//Librerias
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { json } = require('express');

const app = express();

//Configuracion
mongoose.set('useFindAndModify', true);

const { Schema } = mongoose;


run().catch(err => console.log(err));
//ydWsDO7Awt5pqFDS
//Conexion a Base de datos
async function run() {
  await mongoose.connect('mongodb://localhost/dev_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(db => console.log('conectado a la base de datos'))
    .catch(err => console.log(err));

  console.log('Conexion Lista');
}
//Conexion a Base de datos

//Configuraciòn de puertos
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Routes
app.use('/api', require('./routes/task'));

//app.use(require('./routes/task'));

//Archivos Static
console.log(__dirname);
app.use(express.static(__dirname + "/public"))

//Servidor de escucha
app.listen(app.get('port'), () => {
  console.log("Hola Mundo, Eschuchando desde el puerto", app.get('port'))
});
