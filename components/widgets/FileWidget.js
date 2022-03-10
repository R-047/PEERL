import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import img from '../../public/delete_widget_ic.svg'
import axios from 'axios'
import getConfig from 'next/config'


const StyledDeleteBtn = styled.button`
margin: 1em;
padding: 0.25em 1em;
border-radius: 3px;
display: block;
background-color: transparent;
background-image: url(${img.src});
background-repeat: no-repeat;
width: 30px;
height: 30px;
background-size: cover;
background-position: center;
border: none;
order: 2;
`

const StyledWrapper = styled.div`
display: flex;
`

const FileWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 10px;

`




function FileWidget({ del_index, del_function, widget_data, update_data, mode }) {

	const { publicRuntimeConfig } = getConfig()
	const { HOST_URL } = publicRuntimeConfig
	const [file_comp_state, setfile_comp_state] = useState(widget_data)

	useEffect(() => {
		if (!file_comp_state.file_link) {
			let input = document.createElement('input');
			input.type = 'file';
			input.onchange = onFileUploaded
			input.click();
		} else {
			update_data(file_comp_state)
		}

		return async () => {

			const payload = file_comp_state
			const response = await axios.delete(`${HOST_URL}/api/cleanUp`, { data: payload })
			console.log("response after deleted", response)
		}
	}, [file_comp_state])


	const onFileUploaded = async (e) => {
		const in_file = e.target.files[0]
		if (in_file) {
			const formdata = new FormData()
			formdata.append("file", in_file)
			const response = await axios.post(`${HOST_URL}/api/uploadBlob/upload`, formdata)
			console.log(response)
			const file_link = response.data.file_link
			const file_name = response.data.file_name
			const file_org_name = response.data.file_org_name
			setfile_comp_state((prev_value) => {
				return { ...prev_value, file_link: file_link, file_name: file_name, file_org_name: file_org_name }
			})
		}
	}


	const onFileClick = (e) => {
		window.open(file_comp_state.file_link, "_blank");
	}

	const ele = (
		!file_comp_state.file_link ? "loading" :

			<>
				{mode == "write" ?
					<>
						<StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
						<FileWrapper>
							<div onClick={onFileClick}>{file_comp_state.file_org_name}</div>
						</FileWrapper>
					</> :
					<FileWrapper>
						<div onClick={onFileClick}>{file_comp_state.file_org_name}</div>
					</FileWrapper>}

			</>


	)

	return (
		<StyledWrapper>
			{ele}
		</StyledWrapper>
	)
}

export default FileWidget