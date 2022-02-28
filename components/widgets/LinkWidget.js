import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import img from '../../public/delete_widget_ic.svg'





const SyltedInput = styled.input`
padding: 0.5em;
margin: 0.5em;
background: papayawhip;
border: none;
border-radius: 3px;
order: 1;
width: 100%;
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





function LinkWidget({del_index, del_function, widget_data, update_data}) {
  const [LinkCompData, setLinkCompData] = useState(widget_data)

  
  useEffect(() => {
    update_data(LinkCompData)
  }, [LinkCompData])

  const onTextChange = (e) => {

    setLinkCompData((prev_State) => {
      const new_obj = {
        ...prev_State,
        url: e.target.value
      }
      return new_obj
    })
    // console.log("🚀 ~ file: LinkWidget.js ~ line 20 ~ onTextChange ~ LinkCompData", LinkCompData)

    
  }




    
  return (
    <StyledWrapper>
      <StyledDeleteBtn onClick={(e) => del_function(del_index)}></StyledDeleteBtn>
      <SyltedInput placeholder='paste a link or enter text content' type='text' value={LinkCompData.url} onChange={onTextChange}></SyltedInput>
    </StyledWrapper>
   
  )
}

export default LinkWidget