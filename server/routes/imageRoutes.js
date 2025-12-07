import express from 'express'
import { generateImage, getUserImages, deleteImage, regenerateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)
imageRouter.post('/get-images', userAuth, getUserImages)
imageRouter.post('/delete-image', userAuth, deleteImage)
imageRouter.post('/regenerate-image', userAuth, regenerateImage)

export default imageRouter;