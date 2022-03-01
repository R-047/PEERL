import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import img from '../../public/delete_widget_ic.svg'





const SyltedInput = styled.textarea`
padding: 0.5em;
margin: 0.5em;
background: papayawhip;
border: none;
border-radius: 3px;
order: 1;
width: 100%;
height: auto;
`

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





function TextWidget({del_index, del_function, widget_data, update_data}) {
  const [TextCompData, setTextCompData] = useState(widget_data)

  
  useEffect(() => {
    update_data(TextCompData)
  }, [TextCompData])

  const onTextChange = (e) => {

    setTextCompData((prev_State) => {
      const new_obj = {
        ...prev_State,
        text_content: e.target.value
      }
      return new_obj
    })
    // console.log("🚀 ~ file: TextWidget.js ~ line 20 ~ onTextChange ~ TextCompData", TextCompData)

    
  }




    
  return (
    <StyledWrapper>
      <StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
      <SyltedInput placeholder='enter text content' type='text' value={TextCompData.text_content} onChange={onTextChange}></SyltedInput>
    </StyledWrapper>
   
  )
}

export default TextWidget