import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var NotesContractABI = [{"constant":false,"inputs":[{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"}];

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

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          text: [],
      }
  }

  componentWillMount() {
    var result = NotesContract.addNote.sendTransaction('fifth note', {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 3000000,});
    var data = NotesContract.getNotes();
    console.log(data);

  }

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
