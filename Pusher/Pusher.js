const Pusher = require('pusher');


const pusher = new Pusher({
    appId: '1604242',
    key: '5e8582ea511aea8dcd3f',
    secret: 'ef6b3f9783488cf6499f',
    cluster: 'eu',
    useTLS: true,
  });


  module.exports = pusher