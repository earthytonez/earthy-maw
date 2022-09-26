import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

import { GRID_BORDER_COLOR, PAPER_BORDER_RADIUS } from './constants';

export default styled(Button)`
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 0;
  border-radius: ${PAPER_BORDER_RADIUS};
  border: 1px solid ${GRID_BORDER_COLOR};

  :hover {
    color: #2e8b57;
  }
`;