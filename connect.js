const {Sequelize, DataTypes} = require("sequelize")


const seq = new Sequelize('uncle_ose', 'root', '', {
    host: '127.0.0.1',
    dialect:'mysql'
});

 seq.authenticate().then(res=>{
    console.log('Database connection established successfully.');

 }).catch(err=>{
    console.error('Unable to connect to the database:', err);
 })

 module.exports = {sequelize:seq, DataTypes}