const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } =require("@aws-sdk/client-s3");
const fs = require('fs');
const config=require('config')
module.exports.uploadFileToS3=async(bucketName,Key,filePath)=>{
    try{
        console.log(config.awsSecret.accessKeyId,config.awsSecret.secretAccessKey)
        const Body = fs.readFileSync(filePath);
        const target = { Bucket:bucketName, Key, Body, ACL: 'public-read' };
        const client= new S3Client({ region: config.region ,credentials:{
            accessKeyId: config.awsSecret.accessKeyId,
            secretAccessKey: config.awsSecret.secretAccessKey
        }})
        const parallelUploads3 = new Upload({
            client,
            params: target,
          });
  
         let data= await parallelUploads3.done();
         if(data.Location){
            //delete the image file from local folder after s3 upload
            fs.unlink(filePath, (err) => {
                if (err) {
                    throw err;
                }
                console.log("Delete local File successfully.");
            });
         }
         return data.Location
    }
    catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}