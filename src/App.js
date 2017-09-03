import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var NotesContractABI = [{"constant":false,"inputs":[{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"}];

var NotesContractAddress = '0x0cad54b5382e4ee23af3288ebccff59ab7bb5e43';
var NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          text: [],
      }
  }

  componentWillMount() {
    // var text = NotesContract.addNote('first note');
    // console.log(text);
    var data = NotesContract.getNotes();
    console.log(data);

    // this.setState({
    //     text: String(data[0]).split(','),
    // });
  }
  //
  // pushNote(_text) {
  //   NotesContract.addNote('first note');
  //   //peopleContract.addPerson(/*_firstName, _lastName, _age*/'asdasda','asdasd',56);
  //   //this.setState({deadline: this.state.newDeadline})
  // };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!!!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
