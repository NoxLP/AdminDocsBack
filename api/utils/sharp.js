const createError = require('http-errors')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

exports.resizeImage = async (req, res, next) => {
  try {
    const img = fs.readFileSync(path.resolve(`uploads/${req.file.filename}`))

    res.locals.img = await sharp(img)
      .resize({ width: 300, withoutEnlargement: true })
      .withMetadata()
      .png()
      .toFile(`uploads/${req.file.filename}`)

    next()
  } catch (err) {
    console.error('\n>> ERROR: ' + err)
    return next(new createError.InternalServerError())
  }
}
