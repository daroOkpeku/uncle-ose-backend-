const {sequelize, DataTypes} = require("../connect");
// const sequelize = new Sequelize('mysql::memory:');
// const sequelize = new Sequelize('uncle_ose', 'root', '', {
//     host: '127.0.0.1',
//     dialect:'mysql'
// });

const Auth_signup = sequelize.define("sign_up",{
    fullname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


sequelize.sync()
  .then(() => {
    console.log('Database and table created!');
  })
  .catch(err => {
    console.error('Error creating database and table:', err);
  });

module.exports = Auth_signup