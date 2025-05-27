const fs = require('fs');
const mjml = require('mjml');
const nodemailer = require('nodemailer');
const csv = require('csv-parser');
const path = require('path');
const { mailUser, mailPass } = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailUser,
    pass: mailPass
  }
});

const mjmlTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'Plantilla_Automovil.mjml'), 'utf8');

fs.mkdirSync(path.join(__dirname, 'output'), { recursive: true });

function personalizarPlantilla(template, datos) {
  return template
    .replace(/{{nombre}}/g, datos.nombre)
    .replace(/{{email}}/g, datos.email)
    .replace(/{{empresa}}/g, datos.empresa)
    .replace(/{{idioma}}/g, datos.idioma);
}

fs.createReadStream(path.join(__dirname, 'data', 'suscriptores.csv'))
  .pipe(csv())
  .on('data', (row) => {
    const personalizado = personalizarPlantilla(mjmlTemplate, row);
    const htmlOutput = mjml(personalizado, { validationLevel: 'strict' }).html;

    const fileName = `correo_${row.nombre}.html`;
    fs.writeFileSync(path.join(__dirname, 'output', fileName), htmlOutput);

    const mailOptions = {
      from: mailUser,
      to: row.email,
      subject: `Hola ${row.nombre}, ¡te esperamos en Feria Valencia!`,
      html: htmlOutput
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error enviando a', row.email, error);
      } else {
        console.log('Correo enviado a', row.email, info.response);
      }
    });
  })
  .on('end', () => {
    console.log('Todos los correos han sido procesados.');
  });