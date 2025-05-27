# Proyecto Feria Valencia 

Este proyecto forma parte del reto de prácticas dirigido por Feria Valencia. Consiste en el diseño, personalización y envío de campañas de email marketing usando MJML, Node.js y datos de suscriptores desde un archivo CSV.

---

## Estructura del proyecto

```
proyecto-feria/
├── data/
│   └── suscriptores.csv         # Lista de suscriptores con nombre, email, etc.
├── templates/
│   └── Plantilla_Automovil.mjml # Plantilla MJML base
├── output/
│   └── correo_NOMBRE.html       # Correos generados por suscriptor
├── enviar.js                    # Script principal de envío
├── package.json                 # Dependencias del proyecto
```

---

## Instrucciones de uso

1. **Instala las dependencias:**

```bash
npm install
```

2. **Configura tu cuenta de Gmail en `enviar.js`:**

```js
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'TU_CORREO@gmail.com',
    pass: 'TU_CONTRASEÑA_O_APP_PASSWORD'
  }
});
```

> Usa una contraseña de aplicación si tienes activada la verificación en dos pasos.

3. **Ejecuta el script:**

```bash
node enviar.js
```

Esto hará:
- Leer todos los suscriptores del CSV
- Personalizar el MJML con sus datos
- Generar el HTML y enviarlo por correo
- Guardar los archivos en la carpeta `/output`

---

## 🧪 Ejemplo de CSV

```csv
nombre,email,empresa,idioma
Carlos,carlos@example.com,AutoValencia,es
Lucía,lucia@example.com,FeriaRuedas,en
Marcelo,marcelo@example.com,RacingParts,es
```

---

## 🧰 Tecnologías usadas

- MJML
- Node.js
- Nodemailer
- CSV-parser
- GitHub
- AWS EC2 (opcional para despliegue en la nube)

---

## 📬 Contacto

Proyecto desarrollado como práctica educativa bajo el marco de Feria Valencia.

