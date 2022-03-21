// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	console.log(req.query)
	const q = req.query.q
	const type = req.query.type
	switch(type){
		case 'users':
			fetchUsers(q);
			break;
		case 'rooms':
			fetchRooms(q);
			break;
	}
	res.status(200).json({ name: 'John Doe' , query: q})
      }
      



const fetchRooms = (query) => {
	console.log(`fetching rooms matching q=${query}`)
}  

const fetchUsers = (query) => {
	console.log(`fetching users matching q=${query}`)

}