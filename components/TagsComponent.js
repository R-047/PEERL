import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import shortUUID from 'short-uuid'
import randomColor from 'randomcolor'

const TagsContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: ${props => props.mode == "read" ? 'fit-content': '200px'};
	height: ${props => props.mode == "read" ? 'fit-content': '100px'};
	flex-wrap: wrap;
	overflow-x: auto;
	gap: 10px;
	background: grey;


	
`

const DelBtn = styled.button`
	background-color: red;
	border-radius: 50%;
	height: 20px;
	width: 20px;
`

const TagDelWrapper = styled.div`
 display: flex;
 flex-direction: row;
 background-color: ${props => props.bg_color};
 width: fit-content;
 height: fit-content;
 border-radius: 10px 10px 10px 10px;
`


const TagInput = styled.input`
background-color: transparent;
height: 20px;
outline: none;
border: 0px;
border-radius: 10px 10px 10px 10px;


`

const TagReadMode = styled.div`
 background-color: transparent;
 padding: 5px;
 width: fit-content;
 height: fit-content;

`



function TagsComponent({ mode, tagsArrUpdate, tags }) {
	const [tagsArr, settagsArr] = useState(tags || [])

	useEffect(() => {
		if(tagsArrUpdate){
			tagsArrUpdate(tagsArr)
		}
		
	}, [tagsArr])



	const addTag = (e) => {
		console.log(e.target.tagName.toLowerCase() == "div")
		if (e.target.tagName.toLowerCase() == "div") {
			settagsArr((prev) => {
				return [
					...prev,
					{
						id: shortUUID().new(),
						value: "",
						bg_color: randomColor(
							{
								luminosity: 'light',
								format: 'hsla'
							}
						)
					}

				]
			})
		}

	}

	const delTag = (del_index) => {
		const new_data = tagsArr.filter((ele, index) => {
			return del_index == index ? false : true
		})
		settagsArr(new_data)
	}

	const updateTagValue = (id, e) => {
		const updatedData = tagsArr.map(ele => {
			if (ele.id == id) {
				return {
					id: id,
					value: e.target.value,
					bg_color: ele.bg_color
				}
			} else {
				return ele
			}
		})
		settagsArr(updatedData)
	}


	const generateInputTag = tagsArr.map((ele, index) => {
		
		return (
			<TagDelWrapper key={ele.id} bg_color={ele.bg_color}>
				{
					mode=="write" ?
				<>
					<TagInput autoFocus value={ele.value} onChange={(e) => updateTagValue(ele.id, e)} size={ele.value.length == 0 ? 1 : ele.value.length} tabIndex={1} type="text" bg_color={ele.bg_color} />
					<DelBtn onClick={(e) => delTag(index)} />
				</> :
					<TagReadMode >{ele.value}</TagReadMode>
				}
			</TagDelWrapper>
		)
	})



	return (
		<>
			{
				mode=="write" ?
				<TagsContainer mode={mode} onClick={addTag}>
				{generateInputTag}
				</TagsContainer> :
				<TagsContainer mode={mode}>
				{generateInputTag}
				</TagsContainer>
			}
			
		</>

	)
}

export default TagsComponent