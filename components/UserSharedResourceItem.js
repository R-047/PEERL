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
margin-left: 80px;
flex-direction: row;
width: 80%;
height: fit-content;
justify-content: space-between;
padding: 10px;
border: 1px solid grey;


padding: 12px 14px 12px 14px;
  background: #efefef;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: .5rem;
  color: #444;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .2rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  margin-top: 60px;
  transition: .2s ease-in-out;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, .7),
              -6px -6px 10px rgba(255, 255, 255, .5),
              6px 6px 8px rgba(255, 255, 255, .075),
              6px 6px 10px rgba(0, 0, 0, .15);
  &:hover{
  box-shadow: -2px -2px 6px rgba(255, 255, 255, .6),
              -2px -2px 4px rgba(255, 255, 255, .4),
              2px 2px 2px rgba(255, 255, 255, .05),
              2px 2px 4px rgba(0, 0, 0, .1);
        }
  &:active{
  box-shadow: inset -2px -2px 6px rgba(255, 255, 255, .7),
              inset -2px -2px 4px rgba(255, 255, 255, .5),
              inset 2px 2px 2px rgba(255, 255, 255, .075),
              inset 2px 2px 4px rgba(0, 0, 0, .15);

  }

`
const ResourceTitle = styled.h2`
	font-size: 18px;
	text-transform: capitalize;
`

const RoomName = styled.div`
	font-size: 16px;
	text-transform: capitalize;
`

const Date = styled.div`
font-size: 14px;
	text-transform: capitalize;
`

const Appreciation = styled.div`
	font-size: 16px;
	text-transform: capitalize;
	color: grey;
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