import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledText = styled.p`
  color: darkgoldenrod;
  text-decoration: underline;
`

const App = () => (
  <div>
    <h1>React parcel starter</h1>
    <StyledText>This text is styled with styled components :)</StyledText>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
