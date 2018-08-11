import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentDidMount() {
    const source = new EventSource('http://localhost:4000/updates');
    source.addEventListener(
      'connected',
      event => {
        const message = JSON.parse(event.data);
        this.setState({
          messages: [
            ...this.state.messages,
            {text: `Connected: ${message.welcomeMsg}`, date: null, id: 0},
          ],
        });
      },
      false,
    );
    source.addEventListener(
      'update',
      event => {
        const message = JSON.parse(event.data);
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: message.value,
              date: message.date,
              id: this.state.messages.length + 1,
            },
          ],
        });
      },
      false,
    );
  }

  renderMessages() {
    return this.state.messages.map(message => (
      <li className="App-message" key={message.id}>
        {message.text} | {message.date}
      </li>
    ));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SSE Server connected </h1>
        </header>
        <p className="App-intro">
          Receiving message from node server-sent events:
          {this.renderMessages()}
        </p>
      </div>
    );
  }
}

export default App;
