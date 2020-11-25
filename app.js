require("dotenv").config();

const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const {uploadImage, deleteImage} = require('./helpers/helpers')

const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/uploads', async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)

    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    next(error)
  }
})

app.delete('/delete/:file', async (req, res, next) => {
    try {
        console.log('test')
      const {file} = req.params
      const imageUrl = await deleteImage(file)
  
      res
        .status(200)
        .json({
          message: "Delete was successful"
        })
    } catch (error) {
      next(error)
    }
  })

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

app.listen(9001, () => {
  console.log('app now listening for requests!!!')
})
