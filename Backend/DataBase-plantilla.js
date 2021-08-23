const { Pool } = require('pg');

// cambiar el nombre de este archivo a Database.js para cada instalacion
//colocar los datos de la conexion
// colocar los datos para conectarse a la base de datos
const getPool = () => {
    const pool = new Pool({
        host:'colocar IP del servidor',
        user:'usuario en la base de datos',
        password:'contraseña',
        database:'nombre de la base de datos',
        port:'puerto, normalmente: 5432'
    });
    return pool
};

module.exports ={
    getPool
}