import React, { useState } from 'react'
import styled from "styled-components"
import Modal from 'react-modal'
import { set } from 'mongoose'
import searchic from '../public/HomePageContents/searchsearch_ic.svg'
import axios from 'axios'
import getConfig from 'next/config'


Modal.setAppElement('#__next')


const SearchInput = styled.input`
	width: 100%;
	
`



const SearchResultPanel = styled.div`
	width: 100%;
	height: 200px;
	background-color: blue;
	position: absolute;
	display: ${props => props.searchPanelState ? "block" : "none"};

`

const SearchWrapper = styled.div`
	position: relative;
  	display: inline-block;
	align-items: center;
	width: 300px;
`

const ResourceResultItem = styled.div`

`

const UserResultItem = styled.div`

`

const RoomResultItem = styled.div`

`

const SearchIcon = styled.div`
 width: 30px;
 height: 30px;
 background-image: url(${searchic.src});
 background-repeat: no-repeat;
 background-size: contain;
background-position: center;
`

const SearchInputIconWrapper = styled.div`
	display: flex;
	flex-direction: row;
`



function SearchComp() {
	const [searchPanelState, setsearchPanelState] = useState(false)
	const [query, setquery] = useState("")
	const { publicRuntimeConfig } = getConfig()
	const { HOST_URL } = publicRuntimeConfig


	const onType = async (e) => {

		setquery(e.target.value)
		if (e.target.value == "") {
			setsearchPanelState(false)
		} else {
			setsearchPanelState(true)
			const result = await axios.get(`${HOST_URL}/api/search?q=${query}`)
			console.log(result)
		}

	}

	const onFocusLost = (e) => {
		setsearchPanelState(false)
		setquery("")
	}

	return (
		<SearchWrapper>
			<SearchInputIconWrapper>
				<SearchInput onChange={onType} value={query} onBlur={onFocusLost} placeholder="Search here"/>
				<SearchIcon />
					
			</SearchInputIconWrapper>
			<SearchResultPanel searchPanelState={searchPanelState}>
				search result panel
			</SearchResultPanel>

		</SearchWrapper>
	)
}

export default SearchComp