require('dotenv').config()
const fs = require('fs')
const S3 = require ('aws-sdk/clients/s3');
const path = require('path');

const bucketName = process.env.AWS_BUCKET_NAME 
const region =  process.env.AWS_BUCKET_REGION 
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY 

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// function to upload file to s3
function uploadFile(req, res){
    const fileStream = fs.createReadStream(req.file.path);
    const  uploadParams = {
        ACL: 'public-read',
        Bucket:bucketName,
        Body: fileStream,
        Key: `userAvatar/${req.file.originalname}`
    };
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile




// function to download file from s3