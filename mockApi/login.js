module.exports = {
  response: {
    code: 200,
    data: {
      userId: (+ new Date()) + '' + Math.round((Math.random() * 1000))
    }
  },
  delay: 500
}
