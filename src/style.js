import * as muiStyles from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledButton = muiStyles.styled(Button)`
    width: 20px;

    @media(max-width: 800px) {
           padding: 3px;
           font-size: 0.75rem;
        }

`;
