import userModel from '../models/userModel.js'
import imageModel from '../models/imageModel.js'


const addToWishList = async (req, res) => {
    const { id, email, name } = req.user
    const { imageid } = req.params;
    try {
        let user = await userModel.findById(id);
        const image = await imageModel.findById(imageid);
        if (!image) {
            return res.json({ success: false, message: "Image not found" });
        }

        const alreadyInWishlist = user.wishlist.includes(image._id);
        if (alreadyInWishlist) {
            return res.status(409).json({ success: false, message: "Image already in wishlist" });
        }

        user.wishlist.push(image._id);
        await user.save();
        res.json({ success: true, message: "image added to wishlist" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const removeFromWishlist = async (req, res) => {
    const { id } = req.user;
    const { imageid } = req.params;
    try {
        let user = await userModel.findById(id);
        const image = await imageModel.findById(imageid);
        if (!image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }
        user.wishlist.pull(image._id);
        await user.save();
        res.json({ success: true, message: "remove from wishlist" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getWishlist = async (req, res) => {
    const { id, email, name } = req.user;
    try {
        const user = await userModel.findById(id).populate("wishlist")
        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export default { addToWishList, removeFromWishlist, getWishlist }