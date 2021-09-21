// Return error with details in JSON
exports.handleError = (status, err, res) => {
  console.log(err)

  res.status(status).json({ message: err })
}
