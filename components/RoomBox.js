import React from 'react'
import styled from 'styled-components'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const StyledRoomBox = styled.div`
	border: 5px solid #949494;
    width: 300px;
	margin-left: 20px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 300px;
`


function RoomBox({ key_id, room_name, action, room_image_link }) {
	
	return (
		// <StyledRoomBox key={key_id} onClick={() => {action(key_id, room_name)}}>
		// 	<p>{room_name}</p>
		// </StyledRoomBox>
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
			component="img"
			height="140"
			image={room_image_link}
			alt="room image"
			onClick={() => {action(key_id, room_name)}}
			key={key_id}
			sx = {{
				width: '200px',
				height: '200px'
			}}
			/>
			<CardContent>
			<Typography gutterBottom variant="h5" component="div">
				{room_name}
			</Typography>
			
			</CardContent>
			<CardActions>
			</CardActions>
		</Card>
	)
}

export default RoomBox