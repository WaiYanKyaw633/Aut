const auth = require("../controller/authcontroller");



module.exports = async function (fastify, options) {

  fastify.post("/register", auth.register);

  fastify.post("/login", auth.login);

  fastify.get(

    "/students",

    {

      preHandler: async (request, reply) => {

        try {

          const token = request.headers.authorization?.split(" ")[1];

          if (!token) throw new Error("Token not provided");

          const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");

          request.user = decoded;

        } catch (err) {

          return reply.code(401).send({ error: "Unauthorized" });

        }

      },

    },

    auth.getAllstudent

  );

};