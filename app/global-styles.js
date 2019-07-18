import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters {
    display: flex;
    justify-content: space-between;
    padding: 0 100px
}
a.active {
  background: seagreen;
}
button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary {
  box-shadow: none;
}
button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary a {
  padding: 0;
  background: none
}
`;

export default GlobalStyle;
