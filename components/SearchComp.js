import React, { useState } from 'react'
import styled from "styled-components"
import Modal from 'react-modal'
import { set } from 'mongoose'
import searchic from '../public/HomePageContents/searchsearch_ic.svg'


Modal.setAppElement('#__next')


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
	margin-left: -200px;
	width: 160%;
`



function SearchComp() {
	const [searchPanelState, setsearchPanelState] = useState(false)
	const [query, setquery] = useState("")


	const onType = (e) => {

		setquery(e.target.value)
		if (e.target.value == "") {
			setsearchPanelState(false)
		} else {
			setsearchPanelState(true)
		}

	}

	const onFocusLost = (e) => {
		setsearchPanelState(false)
		setquery("")
	}

	return (
		<SearchWrapper>
			<SearchInputIconWrapper>
				<SearchInput onChange={onType} value={query} onBlur={onFocusLost} placeholder="Search here"></SearchInput>
				<SearchIcon />
					
			</SearchInputIconWrapper>
			<SearchResultPanel searchPanelState={searchPanelState}>
				search result panel
			</SearchResultPanel>

		</SearchWrapper>
	)
}

export default SearchComp