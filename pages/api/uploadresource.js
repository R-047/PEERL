// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	console.log("logging body: ",req.body)
	// let arr = req.body || []
	// arr.forEach(ele => {
	// 	console.log(ele)
	// })
	res.status(200).json({ name: 'John Doe' })
}
      