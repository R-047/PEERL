import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import searchic from '../public/HomePageContents/searchsearch_ic.svg'
import axios from 'axios'
import getConfig from 'next/config'
import Link from 'next/link'



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





const SearchResultPanel = styled.div`
	width: 160%;
	margin-left: -200px;
	height: 200px;
	background-color: #dae3f5;

	border: 2px solid black;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	position: absolute;
	display: ${props => props.searchPanelState ? "block" : "none"};

`

const SearchWrapper = styled.div`
	position: relative;
  	display: inline-block;
	align-items: center;
	width: 300px;
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

`

const ToggleBtnsWrapper = styled.div`
 display: flex;
 flex-direction: row;
`



function SearchComp() {
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
		if (!e.currentTarget.contains(e.relatedTarget)) {
			setsearchPanelState(false)
			setquery("")
			setSearchPanelState("rooms")
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
					<TogglesearchResultButton onClick={onRoomsResultClick}>Rooms</TogglesearchResultButton>
					<TogglesearchResultButton onClick={onUsersResultClick}>Users</TogglesearchResultButton>
				</ToggleBtnsWrapper>
				<SearchResultContainer>
					{SearchPanelState == "rooms" && <RoomSearchResultContainer search_query={query} />}
					{SearchPanelState == "users" && <UserSearchResultContainer search_query={query} />}
				</SearchResultContainer>
				search result panel
			</SearchResultPanel>

		</SearchWrapper>
	)
}

export default SearchComp





const SearchResultContainer = styled.div`

`

const RoomResultItem = styled.div`

`




function RoomSearchResultContainer({ search_query }) {

	const [SearchResultArr, setSearchResultArr] = useState([])

	useEffect(() => {
		async function fetchData() {
			if (search_query != '') {
				const result = await axios.get(`${HOST_URL}/api/search?q=${search_query}&type=rooms`)
				console.log(result)
			}
		}
		fetchData();


	}, [search_query])

	return (
		<div>
			<SearchResultContainer >
				Room search results
			</SearchResultContainer>

		</div>
	)
}




const UserResultItem = styled.div`

`

function UserSearchResultContainer({ search_query }) {
	const [SearchResultArr, setSearchResultArr] = useState([])

	useEffect(() => {
		async function fetchData() {
			if (search_query != '') {
				const result = await axios.get(`${HOST_URL}/api/search?q=${search_query}&type=users`)
				console.log(result)
			}
		}
		fetchData();

	}, [search_query])
	return (
		<div>
			<SearchResultContainer>
				Users search results
			</SearchResultContainer>

		</div>
	)
}





