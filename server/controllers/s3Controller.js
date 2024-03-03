const s3Client = require('../models/s3.model')
const {PutObjectCommand} = require("@aws-sdk/client-s3")

exports.uploadFile = async (req,res)=>{
    try {
        console.log(req.file)
        const fileData = req.file.buffer;
        const username = req.body.username;
        const params = {
          Bucket: 'bingo-profiles',
          Key: `${username}.jpeg`,
          Body: fileData,
          ContentType: 'image/jpeg',
        };
        const data = await s3Client.send(new PutObjectCommand(params));
        res.json({ ok:true});
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        res.status(500).json({ ok:false, error: 'Error uploading file to S3' });
    }
}