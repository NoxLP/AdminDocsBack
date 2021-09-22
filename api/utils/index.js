// Return error with details in JSON
exports.handleError = (err, res, status) => {
  console.log(err)

  res.status(status ?? 500).json({ message: err })
}
