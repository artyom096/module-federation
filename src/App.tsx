import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

const RemoteApp = React.lazy(() => import("remote/RemoteApp"));

function App() {
  const [remoteText, setRemoteText] = useState<string>("REMOTE application");

  const changeRemoteTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemoteText(e.target.value);
  };

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>HOST application</p>
          <label htmlFor="remoteInput">
            Поменять текст удаленного приложения:
          </label>
          <input
            id="remoteInput"
            value={remoteText}
            onChange={(e) => changeRemoteTextHandler(e)}
          />
        </header>
      </div>
      <React.Suspense fallback="Loading...">
        <ErrorBoundary>
          <RemoteApp remoteText={remoteText} />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
}

export default App;
