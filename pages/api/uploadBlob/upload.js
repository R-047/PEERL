import { upload, apiRoute } from '../../../lib/multerStorageBucket';
import {put} from '../../../lib/s3client'

apiRoute.use(upload.fields([{
	name: 'file', maxCount: 1,
      }]));

apiRoute.post(async (req, res) => {
	
	
	const file = req.files.file[0];
        console.log("🚀 ~ file: upload.js ~ line 12 ~ apiRoute.post ~ file", file)
	

	const result = await put(process.env.AWS_S3_RESOURCES_BUCKET_NAME, file.filename, file)
	const file_link = `${process.env.HOST_URL}api/getBlob/r/${result.key}`
	const file_name = file.filename
	const file_org_name = file.originalname
	
	

	res.status(200).json({ file_link,  file_name, file_org_name})
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};


