// Return error with details in JSON
exports.handleError = (status, err, res) =>
  res.status(status).json({ message: err })
