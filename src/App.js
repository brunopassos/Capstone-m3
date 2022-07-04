
import { ThemeProvider } from "@mui/system";
import { theme } from "./GlobalStyle";
import { StyledButton } from "./style";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <StyledButton color="secondary" variant="contained">
            Botão
          </StyledButton>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
