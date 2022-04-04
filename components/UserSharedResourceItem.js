import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import axios from 'axios'
import getConfig from 'next/config'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'

dayjs.extend(relativeTime)

const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig




const ItemWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: fit-content;
padding: 10px;
border: 1px solid black;

`
const ResourceTitle = styled.h2`

`

const RoomName = styled.div`

`

const Date = styled.div`

`

const Appreciation = styled.div`

`
const LeftWrapper = styled.div`

`
const RightWrapper = styled.div`

`


function UserSharedResourceItem({ resource_id, room_id, resource_title, appreciaiton_count, date }) {
	console.log("logging resource id", resource_id)
	const router = useRouter()
	const [room_name, setroom_name] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`${HOST_URL}api/getRoomsInfo?room_id=${room_id}`)
			console.log("logging room info", result)
			setroom_name(result.data.room_name)
		}
		fetchData()
	}, [])





	return (
		<Link
		href={{
			pathname: `/rooms/${room_name}/resources`,
			query: { room_id: room_id },
			hash: resource_id,
			
		}} scroll>
			<ItemWrapper>
				<LeftWrapper>
					<ResourceTitle>{resource_title}</ResourceTitle>
					<RoomName>{room_name}</RoomName>
				</LeftWrapper>
				<RightWrapper>
					<Appreciation>
						{appreciaiton_count} peers rated
					</Appreciation>
					<Date>
						{dayjs(date).fromNow()}
					</Date>
				</RightWrapper>
			</ItemWrapper>
		</Link>

	)
}

export default UserSharedResourceItem