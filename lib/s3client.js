import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import fs from 'fs'
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();


// AWS_S3_BUCKET_NAME="peerl"
// AWS_BUCKET_REGION="us-east-1"

// AWS_S3_ACCESS_KEY="AKIAWVPKGLLSFVJYSUYJ"
// AWS_S3_SECRET_ACCESS_KEY="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"

const s3Client = new S3Client({
	region: process.env.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
	}
})




const put = async (bucketname,filename, file) => {
	const filestream = fs.createReadStream(file.path)
	const params = {
		Bucket: bucketname, // The name of the bucket. For example, 'sample_bucket_101'.
		Key: filename, // The name of the object. For example, 'sample_upload.txt'.
		Body: filestream, // The content of the object. For example, 'Hello world!".
	      };
	try {
		const results = await s3Client.send(new PutObjectCommand(params));
		console.log(
		    "Successfully created " +
		    params.Key +
		    " and uploaded it to " +
		    params.Bucket +
		    "/" +
		    params.Key
		);
		results.key = filename
		return results; // For unit tests.
	      } catch (err) {
		console.log("Error", err);
	      }
}


const get = async (bucketname,key) => {
	const params = {
		Key: key,
		Bucket: bucketname
	}
	try {
		const data = await s3Client.send(new GetObjectCommand(params));
		return data.Body

	      } catch (err) {
		return undefined
	      }
	
}


const del = async (bucketname, key) => {
	const params = {
		Key: key,
		Bucket: bucketname
	}
	try {
		const data = await s3Client.send(new DeleteObjectCommand(params));
		console.log("Success. Object deleted.", data);
		return data; // For unit tests.

	      } catch (err) {
		console.log("Error///////////////////", err);
		return undefined
	      }
}


const listObj = async (bucketname) => {
	const params = {
		Bucket: bucketname
	}
	try {
		const data = await s3Client.send(new ListObjectsCommand(params));
		return data.Contents; 
	      } catch (err) {
		console.log("Error//////////////////////", err);
	      }
}



export {put, get, del, listObj}