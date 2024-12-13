const fastify = require("fastify")({ logger: true });
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const formbody = require("@fastify/formbody");
const authenticate = require("./Plugin/authenticate");
require("dotenv").config();

fastify.register(formbody);

fastify.register(authenticate); 

// Register routes
fastify.register(authRoutes);
fastify.register(userRoutes);

const start = async () => {
  try {
    
    await fastify.listen({ port: 4000 });
    console.log(`Server is running on http://localhost:4000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
