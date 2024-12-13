const auth = require("../controller/authcontroller");


module.exports = async function (fastify, options) {
    fastify.post('/register', auth.register);
    fastify.post('/login', auth.login);
    fastify.get('/students',auth.getAllstudent);
    fastify.delete('/students/:id',auth.deletestudent);

    fastify.get('/profile',{prehandler:[ fastify.authenticate]}, auth.getprofile);
  
};
