// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	console.log(req.query)
	const q = req.query.q
	res.status(200).json({ name: 'John Doe' , query: q})
      }
      