import axios from "axios"
import userModel from "../models/userModel.js"
import imageModel from "../models/imageModel.js"
import FormData from "form-data"

// Generate Image and Save to Database
export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body

        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        // Save generated image to database
        const newImage = new imageModel({
            userId: user._id,
            prompt: prompt,
            imageUrl: resultImage,
            base64Data: base64Image
        })

        await newImage.save()

        // Update user credit balance
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.json({
            success: true,
            message: "Image Generated and Saved",
            creditBalance: user.creditBalance - 1,
            resultImage,
            imageId: newImage._id
        })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Get all images for a user
export const getUserImages = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.json({ success: false, message: 'User ID required' })
        }

        const images = await imageModel.find({ userId: userId })
            .sort({ createdAt: -1 }) // Most recent first

        res.json({
            success: true,
            images: images.map(img => ({
                id: img._id,
                prompt: img.prompt,
                imageUrl: img.imageUrl,
                createdAt: img.createdAt
            }))
        })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Delete an image
export const deleteImage = async (req, res) => {
    try {
        const { userId, imageId } = req.body

        if (!userId || !imageId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // Find image and verify it belongs to the user
        const image = await imageModel.findOne({ _id: imageId, userId: userId })

        if (!image) {
            return res.json({ success: false, message: 'Image not found or unauthorized' })
        }

        await imageModel.findByIdAndDelete(imageId)

        res.json({ success: true, message: 'Image deleted successfully' })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Regenerate image with same prompt
export const regenerateImage = async (req, res) => {
    try {
        const { userId, imageId } = req.body

        if (!userId || !imageId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
        }

        // Find the original image to get the prompt
        const originalImage = await imageModel.findOne({ _id: imageId, userId: userId })

        if (!originalImage) {
            return res.json({ success: false, message: 'Original image not found' })
        }

        // Generate new image with same prompt
        const formData = new FormData()
        formData.append('prompt', originalImage.prompt)

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        // Save new generated image
        const newImage = new imageModel({
            userId: user._id,
            prompt: originalImage.prompt,
            imageUrl: resultImage,
            base64Data: base64Image
        })

        await newImage.save()

        // Update user credit balance
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.json({
            success: true,
            message: "Image Regenerated",
            creditBalance: user.creditBalance - 1,
            resultImage,
            imageId: newImage._id
        })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}