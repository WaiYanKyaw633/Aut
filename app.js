const fastify = require("fastify")({ logger: true });

const userRoutes = require("./routes/userRoutes");

const formbody = require("@fastify/formbody");

const authRoutes = require("./routes/authRoutes");

require("dotenv").config();



fastify.register(formbody); 

fastify.register(authRoutes);

fastify.register(userRoutes);



fastify.listen({ port: 4000 }, async (err, address) => {

  if (err) {

    fastify.log.error(err);

    process.exit(1);

  }

  console.log("Server is running on http://localhost:4000");

});