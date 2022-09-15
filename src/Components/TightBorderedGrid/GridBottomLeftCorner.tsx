import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';

import { GRID_BORDER_COLOR } from './constants';

export default styled(Grid)`
  border-bottom: 1px solid ${GRID_BORDER_COLOR};
  border-right: 1px solid ${GRID_BORDER_COLOR};
  padding: 8px;
  padding-top: 4px;
`;

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1
//     },
//     gridWrapper: {
//       border: "1px solid grey",
//       display: "grid",
//       backgroundColor: "grey",
//       gridRowGap: 1,
//       gridColumnGap: 1,
//       gridTemplateAreas: `
//       "title title title"
//       "a1 a2 a3"
//       "b1 b2 b3"
//       "c1 c2 c3"
//       `,
//       gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//       "& > *": {
//         backgroundColor: "white"
//       }
//     },
//     paper: {
//       padding: theme.spacing(2),
//       margin: "auto",
//       maxWidth: 500
//     },
//     bottomRight: {
//       justifyContent: "flex-end"
//     },
//     outerColumn: {
//       borderRight: "1px solid grey",
//       borderBottom: "1px solid grey",
//       borderLeft: "1px solid grey"
//     },
//     centerColumn: {
//       borderBottom: "1px solid grey"
//     }
//   }));
  