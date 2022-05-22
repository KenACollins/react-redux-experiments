import { createGlobalStyle } from 'styled-components';
import { SearchBar } from 'src/components/SearchBar';

const GlobalStyles = createGlobalStyle`
  body {
      background: #F2F2F2;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      margin-top: 8em;
      font-family: sans-serif;
  }
`;

const App = () => {
    return (
        <>
            <GlobalStyles />
            <SearchBar />
        </>
    );
};

export default App;