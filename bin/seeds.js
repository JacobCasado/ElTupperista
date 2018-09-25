// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/taperista', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: 'Manoli',
    password: bcrypt.hashSync('Manoli', bcrypt.genSaltSync(bcryptSalt)),
    email: 'Manoli_Croquetas@hotmail.com',
    // location: {
    // 	type: {	type: String },
    // 	coordinates: [ Number ]
    // },
    address: 'Calle Alejandro Saint Aubin 4',
    isCooker: true,
  },
  {
    username: 'Mari Pili',
    password: bcrypt.hashSync('Mari Pili', bcrypt.genSaltSync(bcryptSalt)),
    email: 'Mari-Pili-Leal@yahoo.com',
    // location: {
    // 	type: {	type: String },
    // 	coordinates: [ Number ]
    // },
    address: 'Calle Aldea del Fresno 12',
    isCooker: true,
  },
  {
    username: 'Antonia',
    password: bcrypt.hashSync('Antonia', bcrypt.genSaltSync(bcryptSalt)),
    email: 'Antonia-Salas-Pacheco@gmail.com',
    // location: {
    // 	type: {	type: String },
    // 	coordinates: [ Number ]
    // },
    address: 'Calle del Divino Vallés 7',
    isCooker: true,
  },
  {
    username: 'Mari Carmen',
    password: bcrypt.hashSync('Mari Carmen', bcrypt.genSaltSync(bcryptSalt)),
    email: 'MariCarmenTorrijos@outlook.com',
    // location: {
    // 	type: {	type: String },
    // 	coordinates: [ Number ]
    // },
    address: 'Calle Alicante 25',
    isCooker: true,
  },
  {
    username: 'Maria de las Calpurnias',
    password: bcrypt.hashSync('Maria de las Calpurnias', bcrypt.genSaltSync(bcryptSalt)),
    email: 'MariaCalpurnia@hotmail.com',
    // location: {
    // 	type: {	type: String },
    // 	coordinates: [ Number ]
    // },
    address: 'Calle de Bolivar 18',
    isCooker: true,
  },
  {
    username: 'Sacramento',
    password: bcrypt.hashSync('Sacramento', bcrypt.genSaltSync(bcryptSalt)),
    email: 'Sacramento.Organero@outlook.com',
    // location: {
    // 	type: {	type: String },
    // 	coordinates: [ Number ]
    // },
    address: 'Calle Circonita 16',
    isCooker: true,
  },
  
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})