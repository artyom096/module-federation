import logo from "./logo.svg";
import "./App.css";

interface IRemoteProps {
  remoteText?: string;
}

const App: React.FC<IRemoteProps> = ({ remoteText }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{remoteText || "REMOTE application"}</p>
      </header>
    </div>
  );
};

export default App;
