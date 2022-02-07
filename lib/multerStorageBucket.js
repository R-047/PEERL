import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path'


const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
	const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
	cb(null, file.originalname + '-' + uniqueSuffix+path.extname(file.originalname))
      },
  }),
});


const apiRoute = nextConnect({
	onError(error, req, res) {
	  res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
	  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
      });

export {upload, apiRoute}