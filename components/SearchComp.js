import React from 'react'
import styled from "styled-components"
import Modal from 'react-modal'
import { set } from 'mongoose'


Modal.setAppElement('#__next')


const SearchInput = styled.input`

`



const SearchResultPanel = styled.div`

`

const ResourceResultItem = styled.div`

`

const UserResultItem = styled.div`

`

const RoomResultItem = styled.div`

`

const RCModalStyles = {

}

const RCModalOverlayStyles = {

}




function SearchComp() {
	const [modalState, setmodalState] = useState(false)

	
	const onType = (e) => {
		setmodalState(true)
	}

	return (
		<div>
			<SearchInput onChange={onType}/>
			<Modal isOpen={modalState} contentLabel="Post modal" onRequestClose={(e) => setmodalState(false)}
				className={RCModalStyles}
				overlayClassName={RCModalOverlayStyles}
			>
				<SearchResultPanel>
					search result panel
				</SearchResultPanel>
			</Modal>
		</div>
	)
}

export default SearchComp