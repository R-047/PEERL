import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import dynamic from "next/dynamic";
import img from '../../public/delete_widget_ic.svg'
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });
import axios from 'axios'


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


const CodeRunBtn = styled.button`
 	background-color: red;
`

const CodeSelectMenu = styled.select`
	background-color: white;
`

const  CodeEditorWrapper = styled.div`
	width: fit-content;
	height: fit-content;
	display: flex;
	flex-direction: column;
`

const CodeEditorHeader = styled.div`
	display: flex;
	flex-direction: column;
`



function CodeWidget({ del_index, del_function, widget_data, update_data }) {
	
        const [code_comp_state, setcode_comp_state] = useState(widget_data)

	useEffect(() => {
		update_data(code_comp_state)
	      }, [code_comp_state])


	const onCodeChange = (newValue, e) => {
		setcode_comp_state(prev_state => {
			return {
				...prev_state,
				code: newValue
			}
		})
		
	}

	const onLanguageChange = (e) => {
		setcode_comp_state(prev_state => {
			return {
				...prev_state,
				language: e.target.value
			}
		})
		
	}

	const onCodeRun = async (e) => {
		console.log(code_comp_state)
		const data = {
			language: code_comp_state.language,
			code: code_comp_state.code
		}
		const result = await axios.post("/api/codeRunner", data)
                console.log("🚀 ~ file: CodeWidget.js ~ line 86 ~ onCodeRun ~ result", result)
		setcode_comp_state(prev_state => {
			return {
				...prev_state,
				output: result.data.data.stdout
			}
		})
		
		
	}

	return (
		<StyledWrapper>
			<StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
			<CodeEditorWrapper>
				<CodeEditorHeader>
					<CodeRunBtn onClick={onCodeRun}> run </CodeRunBtn>
					<CodeSelectMenu onChange={onLanguageChange} value={code_comp_state.language}>
						<option value="javascript" >javascript</option>
						<option value="python" >python</option>
						<option value="typescript" >typescript</option>
					</CodeSelectMenu>
				</CodeEditorHeader>
				<EditorConsoleWrapper>
					<Editor>CodeWidget
						<MonacoEditor
							width="500"
							height="300"
							language={code_comp_state.language}
							theme="vs-dark"
							value={code_comp_state.code}
							onChange={onCodeChange}
						/>
					</Editor>
					<Console >
						
						{code_comp_state.output}
					</Console>
				</EditorConsoleWrapper>
			</CodeEditorWrapper>
		</StyledWrapper>


	)
}

export default CodeWidget