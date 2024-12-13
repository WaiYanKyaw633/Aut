const fastify = require('fastify')({ logger: true });
const { User } = require('../models');



const createUser = async (request, reply) => {
  try {
    const user = await User.create(request.body);
    reply.code(201).send({ message: "Ok P naw", user });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const getAllUsers = async (request, reply) => {
  try {
    const users = await User.findAll();
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const getUserById = async (request, reply) => {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) return reply.code(404).send({ error: 'User not found' });
    reply.send(user);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const updateUser = async (request, reply) => {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) return reply.code(404).send({ error: 'User not found' });

    await user.update(request.body);
    reply.send(user);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const deleteUser = async (request, reply) => {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) return reply.code(404).send({ error: 'User not found' });

    await user.destroy();
    reply.code(204).send({ message: "User deleted successfully" });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

