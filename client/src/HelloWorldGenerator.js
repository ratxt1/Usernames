import React, { Component } from 'react';
import 'whatwg-fetch';

class HelloWorldGenerator extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
    };
    this.pollInterval = null;
    this.listHelloWorlds = this.listHelloWorlds.bind(this)
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch('/api/comments/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  submitHelloWorld = (e) => {
    e.preventDefault();
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({text: 'Hello World!'}),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({error: null });
    });
  }

  listHelloWorlds = () => {
    console.log(this.state.data)
    let map1 = this.state.data.map((x) => (
    <li >{x.text} {x._id}</li>
    ))
    return map1
  }

  render() {
    return (
      <div className="container">
        <div className="list">
          <h2>Comments:</h2>
          {this.listHelloWorlds()}
        </div>
        <div className="button">
          <button onClick={(e) => this.submitHelloWorld(e)} > BUTTON </button>
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default HelloWorldGenerator;