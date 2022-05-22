import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Image from "next/image";
import TagsComponent from "./TagsComponent";
import getConfig from "next/config";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { UserTypeContext } from '../contexts/UserTypeContext'
import {getSession} from 'next-auth/react'

dayjs.extend(relativeTime);

//username
//user dp
//resource title
//resource description
//resource tags
//total number of items
//resource posted date
//appreciation

const { publicRuntimeConfig } = getConfig();
const { HOST_URL } = publicRuntimeConfig;

const UserDp = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;
`;

const ResourceTitle = styled.div``;

const ResourceDescription = styled.div``;
const ResourceCapsuleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const ResourceCapsuleHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ResourceRect = styled.div`
  display: flex;
  flex-direction: column;
`;


const ApproveBtn = styled.button`
  
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ResourceCapsule({
  user_id,
  time,
  title,
  resource_ratings,
  tags,
  res_id,
  mode
})



{
  const [userInfoState, setuserInfoState] = useState({
    user_name: "",
    user_img: "/empty_face.svg",
  });
  const [UserType, UpdateUserType] = useContext(UserTypeContext)
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [notebooks_arr, setnotebooks_arr] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${HOST_URL}/api/user?user_id=${user_id}`);
      console.log("user_infooooooooooooooooooooooooooooooooooo", result.data);
      setuserInfoState({
        user_name: result.data.name,
        user_img: result.data.image,
      });
    }
    async function fetchNotebooks() {
      const session = await getSession()
      const id = session.id
      const result = await axios.get(
        `${HOST_URL}/api/getNotebooks?user_id=${id}`
      );

      console.log("user_infooooooooooooooooooooooooooooooooooo", result.data);
      setnotebooks_arr(result.data);
    }
    fetchData();
    fetchNotebooks();
  }, []);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };



  const approveResFunc = async (e) => {
    e.stopPropagation();
    const response = await axios.post(`${HOST_URL}/api/approve_res`, { resource_id: res_id })
    console.log(response.data)
  }

  const handleListItemClick = async (event, notebook_id) => {
    event.stopPropagation();
    const response = await axios.post(`${HOST_URL}/api/save_res`, { notebook_id: notebook_id, resource_id: res_id })
    console.log(response.data)
    if(response.data.message == 'success'){
      setOpen(false)
    }


  }

  const notebooks_items_arr = notebooks_arr.map((ele) => {
    return (
      <ListItemButton
        key = {ele._id}
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, ele._id)}
      >
        <ListItemText primary={ele.notebook_name} />
      </ListItemButton>
    );
  });

  return (
    <>
      <ResourceCapsuleWrapper id={res_id}>
        <ResourceCapsuleHeader>
          <UserInfoWrapper>
            <UserDp>
              <Image src={userInfoState.user_img} layout="fill" />
            </UserDp>
            {userInfoState.user_name}
          </UserInfoWrapper>
          {dayjs(time).fromNow()}
          {mode!="staged" && UserType!="NM" ? <ToggleButton
            value="check"
            selected={selected}
            onChange={(e) => {
              e.stopPropagation();
              // setSelected(!selected);
              handleOpen(e);
            }}
          >
            <CheckIcon />
          </ToggleButton> : null}
          {(mode == "staged" && UserType == 'RA' ) && <ApproveBtn onClick={approveResFunc}>approve</ApproveBtn>}
        </ResourceCapsuleHeader>
        <ResourceRect>
          <h1>{title}</h1>
          {mode!="staged" && <p>{resource_ratings}</p>}
        </ResourceRect>
        <TagsComponent mode="read" tags={tags} />
      </ResourceCapsuleWrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            select the notebook
          </Typography>
          <List dense={true}>{notebooks_items_arr}</List>
        </Box>
      </Modal>
    </>
  );
}

export default ResourceCapsule;
