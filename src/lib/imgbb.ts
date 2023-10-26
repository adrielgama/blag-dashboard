import axios from 'axios'

const { VITE_CLOUDINARY_API_KEY } = import.meta.env

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const CLOUDINARY_ENDPOINT =
    'https://api.cloudinary.com/v1_1/blag/image/upload'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'pbsyhmb0')
  formData.append('public_id', file.name)
  formData.append('api_key', VITE_CLOUDINARY_API_KEY)

  try {
    const response = await axios.post(CLOUDINARY_ENDPOINT, formData)

    if (response.data && response.data.url) {
      return response.data.url
    } else {
      throw new Error('Failed to parse response from Cloudinary')
    }
  } catch (error) {
    console.error('Failed to upload image to Cloudinary:', error)
    throw error
  }
}
