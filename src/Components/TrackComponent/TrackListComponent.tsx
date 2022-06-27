// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";

import Track from "./Objects/Track.ts";
import TrackComponent from "./TrackComponent.tsx";

import { observer } from "mobx-react-lite";

import List from '@mui/joy/List';

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: "100%",
  height: "90vh",
});

interface TrackListComponentProps {
  tracks: Array<Track>;
}

const TrackListComponent = observer((props: TrackListComponentProps) => {
  const { tracks } = props;
  return (
    <List>
      {tracks.map((track: Track, i: number) => (
            <TrackComponent key={i} track={track}></TrackComponent>
        ))}
    </List>


  );
});

export default TrackListComponent

{/* <List>
{data.map((item, index) => (
  <React.Fragment key={index}>
    <ListItem>
      <ListItemButton
        {...(index === 0 && { variant: 'soft', color: 'primary' })}
        sx={{ p: 2 }}
      >
        <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
          <Avatar
            alt=""
            src={item.avatar}
            srcSet={item.avatar2x}
            sx={{ borderRadius: 'sm' }}
          />
        </ListItemDecorator>
        <Box sx={{ pl: 2, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.5,
            }}
          >
            <Typography level="body3">{item.name}</Typography>
            <Typography level="body3" textColor="text.tertiary">
              {item.date}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ mb: 0.5 }}>{item.title}</Typography>
            <Typography level="body2">{item.body}</Typography>
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
    <ListDivider sx={{ m: 0 }} />
  </React.Fragment>
))}
</List> */}


{/* <Table sx={{ minWidth: '100%' }}>
<TableBody>
  {tracks.map((track: Track, i: number) => (
    <TableRow
      key={i}
      style={{
        position: "relative",
        height: "6vh",
        width: "100%",
        display: "inline-block",
        float: "left",
        margin: "4px 0px",
      }}
    >
      <TrackComponent track={track}></TrackComponent>
    </TableRow>
  ))}
</TableBody>
</Table> */}
