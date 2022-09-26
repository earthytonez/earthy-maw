import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';

import { GRID_BORDER_COLOR, PAPER_BORDER_RADIUS } from './constants';

export default styled(Paper)`
  padding: 0;
  border-radius: ${PAPER_BORDER_RADIUS};
  border: 1px solid ${GRID_BORDER_COLOR};

`;

// :hover {
//   color: #2e8b57;
// }
