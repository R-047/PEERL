import React from 'react'
import styled from 'styled-components'
import dynamic from "next/dynamic";
import img from '../../public/delete_widget_ic.svg'
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });


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


const EditorConsoleWrapper = styled.div`
	width: fit-content;
	height: fit-content;
`
const Editor = styled.div`
	width: fit-content;
	height: fit-content;
`

const Console = styled.div`
	margin-top: 10px;
	width: 500px;
	height: 200px;
	background-color: black;
	color: white;
`

function CodeWidget({del_index, del_function, widget_data, update_data}) {
  return (
<StyledWrapper>
	<StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
	    <EditorConsoleWrapper>
		    <Editor>CodeWidget
			<MonacoEditor
			width="500"
			height="300"
			language="python"
			theme="vs-dark"
		      />
		    </Editor>
		    <Console >
			your output
		    </Console>
	    </EditorConsoleWrapper>
</StyledWrapper>
    

  )
}

export default CodeWidget