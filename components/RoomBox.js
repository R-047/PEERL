import React from 'react'
import styled from 'styled-components'

const StyledRoomBox = styled.div`
	border: 5px solid black;
    width: 300px;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 300px;
`


function RoomBox({ key_id, room_name, action }) {
	
	return (
		<StyledRoomBox key={key_id} onClick={() => {action(key_id, room_name)}}>
			<p>{room_name}</p>
		</StyledRoomBox>
	)
}

export default RoomBox