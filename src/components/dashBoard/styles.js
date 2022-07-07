import { Paper } from "@mui/material";
import * as muiStyles from '@mui/material/styles'
import styled from "styled-components";

export const MainSection = styled.main`

  .redLine{
    border-top: 2px solid red;

    margin-bottom: 0.62rem;
  }
`

export const MainPaper = muiStyles.styled(Paper)`
  width: 90%;
  height: auto;

  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.25rem;

  border-radius: 0.62rem;
`
export const ContainerInfo = styled.div`
  width: 90%;

  display: flex;
  justify-content: space-between;

  gap: 0.62rem;

  margin-bottom: 2.5rem;

  h1{
    color: var(--blue);

    font-size: 1.37rem;
    font-weight: 800;
  }

  h2{
    font-weight: 500;
    font-size: 1.25rem;
  }
`