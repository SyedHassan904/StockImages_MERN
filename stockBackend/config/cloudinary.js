import { v2 as cloudinary } from 'cloudinary';

const Cloudinary= async()=> {
    cloudinary.config({ 
        cloud_name: process.env.Cloudinary_Name,
        api_key: process.env.Cloudinary_API_Key,
        api_secret: process.env.Cloudinary_Secret_Key 
    })
}
export default Cloudinary