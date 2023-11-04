const {sequelize, DataTypes} = require("../connect");

const Story = sequelize.define('story', {
    title:{
     type:DataTypes.STRING,
     allowNull:true,
    },
    bodyone:{
        type:DataTypes.STRING,
        allowNull:true
    },
    bodytwo:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    quotation:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    references:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    UserId:{
        type:DataTypes.INTEGER,
        references:{
            model:'sign_ups',
            key: 'id',
        }
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }

})


sequelize.sync()
  .then(() => {
    console.log('Database and table created!');
  })
  .catch(err => {
    console.error('Error creating database and table:', err);
  });

  module.exports = Story
