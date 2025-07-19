import paymemtModel from "../models/paymentModel.js";
import imageModel from "../models/imageModel.js";
import userModel from "../models/userModel.js";

const getPaymentHistory = async (req, res) => {
  const { id: userID } = req.user;

  try {
    const history = await paymemtModel.find({ userID, status: "paid" }).populate("imageID");
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const downloadImage = async (req, res) => {
  const { id: imageID } = req.params;
  const { id: userID } = req.user;

  try {
    const paid = await paymentModel.findOne({ userID, imageID, status: "paid" });

    if (!paid) {
      return res.status(403).json({ success: false, message: "You must pay to download this image." });
    }

    const image = await imageModel.findById(imageID);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    image.stats.downloads += 1;
    const user = await userModel.findById(userID)
    user.downloadedImages.push(imageID);
    await image.save();
    res.redirect(image.fileUrl);

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export default {getPaymentHistory, downloadImage}