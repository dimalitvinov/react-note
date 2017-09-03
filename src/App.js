import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var NotesContractABI = [{"constant":false,"inputs":[{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newText","type":"bytes32"}],"name":"editNote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"}];

var NotesContractAddress = '0xb444e3fce758ec72e979cae5803cdeb819336ea6';
var NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);

// ETHEREUM_CLIENT.fromWei(ETHEREUM_CLIENT.eth.getBalance(ETHEREUM_CLIENT.eth.coinbase), "ether");
// function checkAllBalances() {
//     var totalBal = 0;
//     for (var acctNum in ETHEREUM_CLIENT.eth.accounts) {
//         var acct = ETHEREUM_CLIENT.eth.accounts[acctNum];
//         var acctBal = ETHEREUM_CLIENT.fromWei(ETHEREUM_CLIENT.eth.getBalance(acct), "ether");
//         totalBal += parseFloat(acctBal);
//         console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
//     }
//     console.log("  Total balance: " + totalBal + " ether");
// };
// checkAllBalances();

// var seconds = new Date().getTime() / 1000;

class App extends Component {

  constructor(props) {
      super(props);

      var data = NotesContract.getNotes();
      var html = [];
      for (var i = 0; i < data.length; i++) {
        html.push(<div>{data[i]}</div>);
      }

      this.state = {
          text: [],
          allText: html,
      }
  }

  getNotes() {
      var data = NotesContract.getNotes();
      var html = [];
      for (var i = 0; i < data.length; i++) {
        html.push(<div>{data[i]}</div>);
      }

      this.setState({allText: html});
  }

  componentDidMount() {
      this.getNotes();
  }

  addNewNote() {
      var result = NotesContract.addNote.sendTransaction(this.state.text, {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 3000000,});
      this.setState({text: this.state.allText})
      this.getNotes();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>A NoteChain</h2>
        </div>
        <div>
            <input placeholder='New note' onChange={event => this.setState({text: event.target.value})}/>
            <button onClick={() => this.addNewNote()}>
                Submit
            </button>
        </div>
        <div>
            {this.state.allText}
        </div>
      </div>
    );
  }
}

export default App;
