const jwt = require("jsonwebtoken");

const { Student } = require("../models");

const checkPassword = require("../seeders/checkpassword");

require("dotenv").config();



const getAllstudent = async (request, reply) => {

  try {

    const students = await Student.findAll();

    reply.send(students);

  } catch (err) {

    reply.code(500).send({ error: err.message });

  }

};



const register = async (request, reply) => {

  const { username, email, password } = request.body;

  try {

    const salt = await bcrypt.genSalt(10); 

    const hashedPassword = await bcrypt.hash(password, salt); 

    await Student.create({ username, email, password: hashedPassword });

    reply.code(201).send({ message: "Registered successfully" });

  } catch (err) {

    reply.code(500).send({ error: err.message });

  }

};



const login = async (request, reply) => {

  const { email, password } = request.body;

  try {

    const student = await Student.findOne({ where: { email } });

    if (!student) {

      return reply.code(404).send({ error: "Invalid email or password" });

    }



    const isPasswordValid = await checkPassword(password, student.password);  

    if (!isPasswordValid) {

      return reply.code(401).send({ error: "Invalid email or password" });

    }



    const token = jwt.sign(

      { id: student.id },

      process.env.JWT_SECRET || "defaultsecret",

      { expiresIn: "1h" }

    );



    reply.code(200).send({ message: "Login Successfully", token });

  } catch (err) {

    reply.code(500).send({ error: "Login Failed", details: err.message });

  }

};



module.exports = { register, login, getAllstudent };