import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Subscribers({subscribers}) {
//user_name
//user_image

  const list_items_arr = subscribers.map((ele, index) => {
    return (
      <div key={ele._id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={ele.user_info.image} />
          </ListItemAvatar>
          <ListItemText
            primary={ele.user_info.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  secondary txt- 
                </Typography>
                {"extra text"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  })

  return (

    <List sx={{ width: '80%', bgcolor: 'background.transparent', order: '10', alignItems: 'center'}}>
      {list_items_arr}
    </List>
  );
}
