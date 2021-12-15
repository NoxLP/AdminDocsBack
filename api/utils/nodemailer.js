const nodemailer = require('nodemailer')

const getRandomAlphanumericCode = (codeLength = 5) => {
  const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < codeLength; i++)
    code += chars[Math.floor(Math.random() * chars.length)]

  return code
}

const sendMailAsync = async (to, subject, htmlBody) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
        clientId: process.env.NODEMAILER_OAUTH_CLIENTID,
        clientSecret: process.env.NODEMAILER_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.NODEMAILER_OAUTH_REFRESH_TOKEN,
      },
    })

    const mailOptions = {
      from: process.env.NODEMAILER_USERNAME,
      to,
      subject,
      html: htmlBody,
    }

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(`Error sending mail: ${err}`)
        reject(err)
      } else {
        console.log(`Mail sent: ${data}`)
        resolve(data)
      }
    })
  })
}
const buildRecoveryPassEmailBody = (user, code) => {
  return `El usuario ${user.name} ha solicitado recuperar su contraseña de la app  de <i>AdminDocs</i>.
<br>
Para seguir con el proceso debe introducir el siguiente código en la app:
<br>
${code}
<br>
Si no ha solicitado recuperar su contraseña, ignore este email.

<b><i>AdminDocs</i></b>`
}

exports.sendRecoverPassCodeEmail = async (user) => {
  try {
    const code = getRandomAlphanumericCode(5)
    const body = buildRecoveryPassEmailBody(user, code)

    await sendMailAsync(
      user.email,
      'Recuperación de contraseña AdminDocs',
      body
    )

    //sendMailAsync should throw an error if something goes wrong
    return code
  } catch (err) {
    console.log('>>> error sending recovery pass email:')
    console.log(err)
    throw err
  }
}
