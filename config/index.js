const Cloud = require('@google-cloud/storage')
const path = require('path')

const serviceKey = path.join(__dirname, './starlit-primacy-288204-2b108c8be86b.json')

const { Storage } = Cloud

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH,
})

module.exports = storage