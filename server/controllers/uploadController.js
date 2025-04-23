const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadToCloudinary = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ message: "No file uploaded" });
        }

        // function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if(result){
                        resolve(result);
                    }
                    if(error){
                        reject(error);
                    }
                });
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        }

        // call the stream upload function
        const result = await streamUpload(req.file.buffer);

        // return the result
        return res.status(200).json({
            message: "File uploaded successfully",
            imageUrl: result.secure_url,
            public_id: result.public_id,
        });
    }catch(err){
        console.error("Error uploading to Cloudinary:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { uploadToCloudinary };