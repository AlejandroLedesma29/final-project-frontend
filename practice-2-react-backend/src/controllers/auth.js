const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");
const multer = require('multer');
require("dotenv").config();
const path = require('path');
const accountSid = process.env.SID;
const authToken = process.env.tokenTwilio;
const client  = require('twilio')(accountSid, authToken);
const nodemailer = require("nodemailer");
const transporter = require("./../config/mailer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../../practice-2-react-frontend/src/assets/images/avatars'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: storage });

const register = async (req, res) => {
  try {
    upload.single('avatar')(req, res, async function (err) {
      if (err) {
        return res.status(500).send({ msg: 'Error al procesar los datos del formulario' });
      }

      const {
        firstname,
        lastname,
        email,
        password,
        country,
        depto,
        municipality,
        state,
        documentType,
        document,
      } = req.body;

      if (!email || !password) {
        return res.status(400).send({ msg: 'El email y la contraseña son obligatorios' });
      }

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).send({ msg: 'Ya existe un usuario con ese email' });
      }

      const existingUser2 = await User.findOne({ document: document });
      if (existingUser2) {
        return res.status(400).send({ msg: 'Ya existe un usuario con ese documento' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password: hashPassword,
        country,
        depto,
        municipality,
        state,
        documentType,
        document,
      });

      if (req.file) {
        user.avatar = req.file.filename;
      }

      const userStorage = await user.save();
      const activationLink = `http://localhost:3001/api/v1/user/activate/${userStorage._id}`;
      console.log(userStorage.email);

      const mailoptions = {
        from: '"Activa tu cuenta" <ledesmazja2@gmail.com>', 
        to: userStorage.email,
        subject: "Activa tu cuenta", 
        text: `Ingresa al siguiente link para activar tu cuenta:${activationLink} `
      }

      await transporter.sendMail(mailoptions, (error, info) => {
        if (error){
          console.log(error.menssage);
        } else {
          console.log("Email enviado");
        }
      }
      );

      client.messages.create({
        body: `Haz clic en el siguiente enlace para activar tu cuenta: ${activationLink}`,
        from: '+12565677594',
        to: '+573178747871'
      })
        .then(message => console.log('Mensaje de SMS enviado:', message.sid))
        .catch(error => console.error('Error al enviar el mensaje de SMS:', error));

      res.status(201).send(userStorage);
    });
  } catch (error) {
    res.status(400).send({ msg: 'Error al crear el usuario: ' + error });
  }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
    if (!email || !password) {
        throw new Error("El email y la contraseña son requeridos");
    }
    const emailLowerCase = email.toLowerCase();
    const userStore = await User.findOne({ email: emailLowerCase }).exec()
    if (!userStore) {
        throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(password, userStore.password)
    if (!check) {
        throw new Error("Contraseña incorrecta");
    }
    if (!userStore.active) {
        throw new Error("Usuario no autorizado o no activo");
    }
    res.status (200).send({
        access: jwt.createAccessToken (userStore),
        refresh: jwt.createRefreshToken (userStore),
    });
    } catch (error){
        res.status (400).send({ msg: error.message });
    }
}
  
const refreshAccessToken = (req, res) => {
  const { token } = req.body;
  if (!token) res.status(400).send({ msg: "Token requerido" });
  const { user_id } = jwt.decoded(token);
  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accesToken: jwt.createAccessToken(userStorage),
      });
    }
  });
};


module.exports = {
  register,
  login,
  refreshAccessToken,
};
