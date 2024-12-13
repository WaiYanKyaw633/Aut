const controller = require('../controller/controller');

module.exports = async function (fastify, opts) {
  fastify.post('/users', controller.createUser);
  fastify.get('/users', controller.getAllUsers);
  fastify.get('/users/:id', controller.getUserById);
  fastify.put('/users/:id', controller.updateUser);
  fastify.delete('/users/:id', controller.deleteUser);
  
  
};
