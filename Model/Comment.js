const {sequelize, DataTypes} = require("../connect");
const Comment = sequelize.define('comment',{
    fullname:{
     type:DataTypes.STRING,
     allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    comments:{
        type:DataTypes.STRING,
        allowNull:true
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'sign_ups',
            key: 'id',
        }

    }
})

sequelize.sync()
  .then(() => {
    console.log('Database and table created!');
  })
  .catch(err => {
    console.error('Error creating database and table:', err);
  });

  module.exports = Comment