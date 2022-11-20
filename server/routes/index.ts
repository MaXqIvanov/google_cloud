const Router = require('express')
const router = new Router()

const GoogleCloudController = require('../controllers/GoogleCloudController')

router.post('/google_image', GoogleCloudController.getResults)  


module.exports = router