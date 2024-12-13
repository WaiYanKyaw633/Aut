const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Student } = require('../models');

const register = async (request, reply) => {
  const { username, email, password } = request.body;
  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);
    await Student.create({ username, email, password: hashedPassword });
    reply.code(201).send({ message: "Registered successfully" });
  } catch (err) {
    reply.code(500).send({ error: "An error occurred during registration" });
  }
};

const login = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return reply.code(404).send({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return reply.code(401).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: student.id, username: student.username, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });

    reply.code(200).send({ message: "Login Successfully", token });
  } catch (err) {
    reply.code(500).send({ error: "Login Failed", details: err.message });
  }
};

const getAllstudent = async (request, reply) => {
  try {
    const students = await Student.findAll();
    reply.send(students);
  } catch (err) {
    reply.code(500).send({ status: false, error: err.message });
  }
};

const deletestudent = async (request, reply) => {
  try {
    const student = await Student.findByPk(request.params.id);
    if (!student) return reply.code(404).send({ status: false, error: "Student not found" });
    await student.destroy();
    reply.code(201).send({ status: true, message: 'Deleted' });
  } catch (err) {
    reply.code(500).send({ status: false, error: err.message });
  }
};

const getprofile = async (request, reply) => {
  try {
    const student = request.student;
    if (!student){
      return reply.code(400).send({error: 'Student data missing'});
    }
    reply.send({
      id: student.id, username: student.username, email: student.email,
      message: "Your Profile"
    });
  } catch (err) {
    reply.code(500).send({ error: 'Something went wrong', details: err.message });
  }
};
module.exports = { register, login, getAllstudent, deletestudent, getprofile };