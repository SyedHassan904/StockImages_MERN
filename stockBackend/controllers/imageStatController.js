import imageModel from "../models/imageModel.js";

const trackImpression = async (req, res) => {
    const imageID = req.params.id
    try {
        await imageModel.findByIdAndUpdate(imageID, {
            $inc: { "stats.impressions": 1 }
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const trackClick = async (req, res) => {
    const imageID = req.params.id;
    try {
        await imageModel.findByIdAndUpdate(imageID, {
            $inc: { "stats.clicks": 1 }
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const getAllImageStats = async (req, res) => {
    try {
        const result = await imageModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalImpressions: { $sum: "$stats.impressions" },
                    totalClicks: { $sum: "$stats.clicks" },
                    totalDownloads: { $sum: "$stats.downloads" },
                    totalRevenuePKR: {
                        $sum: {
                            $multiply: [
                                "$stats.downloads",
                                { $convert: { input: "$pricePKR", to: "double", onError: 0, onNull: 0 } }
                            ]
                        }
                    },
                    totalRevenueUSD: {
                        $sum: {
                            $multiply: [
                                "$stats.downloads",
                                { $convert: { input: "$priceUSD", to: "double", onError: 0, onNull: 0 } }
                            ]
                        }
                    }
                }
            }
        ]);

        const totals = result[0] || {
            totalImpressions: 0,
            totalClicks: 0,
            totalDownloads: 0,
            totalRevenuePKR: 0,
            totalRevenueUSD: 0
        };

        res.json({
            success: true,
            totals: {
                impressions: totals.totalImpressions,
                clicks: totals.totalClicks,
                downloads: totals.totalDownloads,
                revenuePKR: totals.totalRevenuePKR,
                revenueUSD: totals.totalRevenueUSD
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getStatSingleImage = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await imageModel.findById(id).select("stats");
        if (!image) {
            return res.json({ success: false, message: "Image not found" });
        }
        const stat = {
            impressions: image.stats.impressions,
            clicks: image.stats.clicks,
            downloads: image.stats.downloads
        }
        res.status(200).json({ success: true, stats: stat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export default { trackImpression, trackClick, getAllImageStats, getStatSingleImage }
