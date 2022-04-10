import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import searchic from '../public/HomePageContents/searchsearch_ic.svg'
import axios from 'axios'
import getConfig from 'next/config'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)



const { publicRuntimeConfig } = getConfig()
const { HOST_URL } = publicRuntimeConfig


const SearchInput = styled.input`
	width: 100%;
	border-radius: 10px;
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 5px;
	/* opacity: 0; */
	background: transparent;
	border: none;
	outline: none;
`
const Resultconatiner = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`





const SearchResultPanel = styled.div`
	width: 100%;
	height: 200px;
	background-color: #ebeff7;
	margin-top: 6px;
	border: 2px solid grey;
	/* border: 2px solid black; */
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	
	position: absolute;
	display: ${props => props.searchPanelState ? "block" : "none"};
	z-index: 20;
	overflow-y: auto;


`

const SearchWrapper = styled.div`
	position: relative;
  	display: inline-block;
	align-items: center;
	width: 500px;
`




const SearchIcon = styled.div`
 width: 30px;
 height: 30px;
 background-image: url(${searchic.src});
 background-repeat: no-repeat;
 background-size: contain;
background-position: center;
margin-top: 3px;
`

const SearchInputIconWrapper = styled.div`
	display: flex;
	flex-direction: row;
	border: 2px solid grey;
	border-radius: 10px;
	padding-top: 2px;
	padding-bottom: 2px;
	padding-left: 10px;
	padding-right: 15px;
	/* margin-left: -200px; */
	width: 100%;
`


const TogglesearchResultButton = styled.button`
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

const ToggleBtnsWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-evenly;
`



function SearchComp({ mode, room_id }) {
	const [searchPanelState, setsearchPanelState] = useState(false)
	const [query, setquery] = useState("")
	const [SearchPanelState, setSearchPanelState] = useState("rooms")




	const onType = async (e) => {

		setquery(e.target.value)
		if (e.target.value == "") {
			setsearchPanelState(false)
		} else {
			setsearchPanelState(true)
		}

	}

	const onFocusLost = (e) => {
		if (e.currentTarget.contains(e.relatedTarget)) {
			setquery("")
			// setSearchPanelState("rooms")
		}

	}

	const onRoomsResultClick = (e) => {
		setSearchPanelState("rooms")
	}

	const onUsersResultClick = (e) => {
		setSearchPanelState("users")
	}

	return (
		<SearchWrapper onBlur={onFocusLost}>
			<SearchInputIconWrapper >
				<SearchInput onChange={onType} value={query} placeholder="Search here"></SearchInput>
				<SearchIcon />
			</SearchInputIconWrapper>
			<SearchResultPanel searchPanelState={searchPanelState}>
				<ToggleBtnsWrapper>
					{mode=="general" && <TogglesearchResultButton onClick={onRoomsResultClick}>Rooms</TogglesearchResultButton>}
					{mode=="general" && <TogglesearchResultButton onClick={onUsersResultClick}>Users</TogglesearchResultButton>}
				</ToggleBtnsWrapper>
				{mode=="general" ?
					<SearchResultContainer>
						{SearchPanelState == "rooms" && <RoomSearchResultContainer search_query={query} />}
						{SearchPanelState == "users" && <UserSearchResultContainer search_query={query} />}
					</SearchResultContainer>
					:
					<SearchResultContainer>
						<ResourcesSearchContainer search_query={query} room_id={room_id}/>
					</SearchResultContainer>
				}

			</SearchResultPanel>

		</SearchWrapper>
	)
}

export default SearchComp





const SearchResultContainer = styled.div`
overflow: hidden;

`




const RoomResultItemWrapper = styled.div`
    display: flex;
	margin-left: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #ebeff7;
    /* border-radius: 20px; */
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
	width: 95%;
	padding-top: 10px;
	padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #dde1e7;
    /* border-radius: 20px; */
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
	background: #eaecef;
	border: 1px solid grey;
  margin-top: 10px;
  margin-bottom: 30px;
  border: none;
  border-radius: .5rem;
  color: #444;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .2rem;
  text-align: center;
  outline: none;
  cursor: pointer;
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

const RoomDp = styled.div`
	position: relative;
	width: 32px;
	height: 32px;
	border-radius: 100%;


`

const RoomName = styled.h5`
margin: 0;

`


const TimeStamp = styled.p`

`

const RatingsWrapper = styled.div`
display: flex;
flex-direction: column;

`








function RoomSearchResultContainer({ search_query }) {

	const [SearchResultArr, setSearchResultArr] = useState([])

	useEffect(() => {
		async function fetchData() {
			if (search_query != '') {
				const result = await axios.get(`${HOST_URL}/api/search?q=${search_query}&type=rooms`)
				console.log(result)
				setSearchResultArr(result.data.search_results)
			}
		}
		fetchData();



	}, [search_query])






	return (
		<div>
			<SearchResultContainer >

				{SearchResultArr.map((ele, index) => {
					return (
						<Link href={`${HOST_URL}rooms/${ele.room_name}/resources?room_id=${ele._id}`} key={ele._id}>
							<RoomResultItemWrapper>
								<div style={{ display: 'flex', flexDirection: 'row', gap: "10px", justifyItems: 'flex-start', alignItems: 'center', alignContent: 'flex-start' }}>
									<RoomDp>
										<Image src={ele.room_dp_link || '/empty_face.svg'} layout="fill"></Image>
									</RoomDp>
									<RoomName>{ele.room_name}</RoomName>
								</div>
								<RatingsWrapper>
									<p style={{ margin: '0px' }}>{`🪂: ${ele.total_res}`}</p>
									<p style={{ margin: '0px' }}>{`👤: ${ele.total_peers}`}</p>

								</RatingsWrapper>
								<TimeStamp>{dayjs(ele.creation_date).fromNow()}</TimeStamp>

							</RoomResultItemWrapper>
						</Link>
					)
				})}
			</SearchResultContainer>

		</div>
	)
}




const UserResultItem = styled.div`
	width: 95%;
	padding-top: 10px;
	padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #dde1e7;
    /* border-radius: 20px; */
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
	background: #eaecef;
	border: 1px solid grey;
  margin-top: 10px;
  margin-bottom: 30px;
  border: none;
  border-radius: .5rem;
  color: #444;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: .2rem;
  text-align: center;
  outline: none;
  cursor: pointer;
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

const UserDp = styled.div`
	position: relative;
	width: 32px;
	height: 32px;
	border-radius: 40%;
`
const UserName = styled.h5`
	display: flex;
	align-items: center;
	margin-left: 2px;
	font-size: 10px;
	margin: 0px;


`

const UserDpNameWrapper = styled.div`
	display: flex;
	flex-direction: row;
`
const Usersearchheading = styled.div`
	font-size: 18px;
	font-weight: 600;
	margin-top: 20px;
	text-align: center;
	margin-bottom: 20px;
`



function UserSearchResultContainer({ search_query}) {
	const [SearchResultArr, setSearchResultArr] = useState([])

	useEffect(() => {
		async function fetchData() {
			if (search_query != '') {
				const result = await axios.get(`${HOST_URL}/api/search?q=${search_query}&type=users`)
				console.log(result.data.search_results)
				setSearchResultArr(result.data.search_results)
			}
		}
		fetchData();

	}, [search_query])
	return (


		<SearchResultContainer>
			<Usersearchheading>Users search results</Usersearchheading> 
			{SearchResultArr.map(ele => {
				return (
					<Link href={`${HOST_URL}/userdashboard?user_id=${ele._id}`} key={ele._id}>
						<Resultconatiner>
						<UserResultItem>
							<UserDpNameWrapper>
								<UserDp>
									<Image src={ele.image || '/empty_face.svg'} layout="fill"></Image>
								</UserDp>
								<UserName>
									{ele.name}
								</UserName>
							</UserDpNameWrapper>
							<p>total resources shared: {ele.total_res_shared}</p>
						</UserResultItem>
						</Resultconatiner>
					</Link>
				)
			})}

		</SearchResultContainer>

	)
}






const ResourceSearchResultItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #ebeff7;
    /* border-radius: 20px; */
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;

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

const ResourceTitle = styled.h5`

`

const ResourceTitlePostedByWrapper = styled.div`

`




function ResourcesSearchContainer({ search_query, room_id }) {
	const [SearchResultArr, setSearchResultArr] = useState([])

	useEffect(() => {
		async function fetchData() {
			if (search_query != '') {
				const result = await axios.get(`${HOST_URL}/api/search?q=${search_query}&type=resources&room_id=${room_id}`)
				console.log(result.data.search_results)
				setSearchResultArr(result.data.search_results)
			}
		}
		fetchData();

	}, [search_query])
	return (


		<SearchResultContainer>

			{SearchResultArr.map(ele => {
				return (
					<Link href={`#${ele._id}`} key={ele._id} scroll={true} replace>
						<ResourceSearchResultItem>
							<ResourceTitle>
								{ele.resource_title}
							</ResourceTitle>
							<p>{ele.user_info[0].name}</p>
						</ResourceSearchResultItem>
					</Link>
				)
			})}

		</SearchResultContainer>

	)
}





