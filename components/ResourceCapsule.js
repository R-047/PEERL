import React, { useEffect, useState } from "react";
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
import ListItemButton from '@mui/material/ListItemButton';

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
}) {
  const [userInfoState, setuserInfoState] = useState({
    user_name: "",
    user_img: "/empty_face.svg",
  });
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [notebooks_arr, setnotebooks_arr] = useState([])

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
      const result = await axios.get(`${HOST_URL}/api/getNotebooks?user_id=${user_id}`);

      console.log("user_infooooooooooooooooooooooooooooooooooo", result.data);
      setnotebooks_arr(result.data)
    }
    fetchData();
    fetchNotebooks()

  }, []);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const notebooks_items_arr = notebooks_arr.map(ele => {
    return (
      <ListItemButton>
              <ListItemText primary={ele.notebook_name} />
      </ListItemButton>
    )
  })

  

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
          <ToggleButton
            value="check"
            selected={selected}
            onChange={(e) => {
              e.stopPropagation();
              // setSelected(!selected);
              handleOpen(e);
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </ResourceCapsuleHeader>
        <ResourceRect>
          <h1>{title}</h1>
          <p>{resource_ratings}</p>
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
          <List dense={true}>
            
            {notebooks_items_arr}
          </List>
        </Box>
      </Modal>
    </>
  );
}

export default ResourceCapsule;
