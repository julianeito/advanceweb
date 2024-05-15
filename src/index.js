import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./components/AuthContext"; // Adjusted the path to components folder

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);