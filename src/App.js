import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

let ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let NotesContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"id","type":"uint256"},{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"removeNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"curId","type":"uint256"},{"name":"newText","type":"bytes32"}],"name":"editNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
let NotesContractAddress = '0xabb9cfe25d785222852d7d638fefe1034d2ce289';
let NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: [],
            text: [],
            newText: '',
        }
    }

    getNotes() {
        let rawNotes = NotesContract.getNotes();
        this.setState({
            id: String(rawNotes[0]).split(','),
            text: String(rawNotes[1]).split(',')
        });
    }

    componentWillMount() {
        this.getNotes();
    }

    addNewNote() {
        let result = NotesContract.addNote.sendTransaction(parseInt(Date.now()), this.state.newText, {
            from: ETHEREUM_CLIENT.eth.accounts[0],
            gas: 3000000
        });
        this.getNotes();
    }

    removeNote(id) {
        let item = NotesContract.removeNote.sendTransaction(id, {
            from: ETHEREUM_CLIENT.eth.accounts[0],
            gas: 3000000
        });
        this.getNotes();
    }

    render() {
        let allNotes = [];

        let hexToAscii = function(hex) {
            let str = '',
                i = 0,
                l = hex.length;
            if (hex.substring(0, 2) === '0x') {
                i = 2;
            }
            for (; i < l; i+=2) {
                let code = parseInt(hex.substr(i, 2), 16);
                if (code === 0) continue; // this is added
                str += String.fromCharCode(code);
            }
            return str;
        };

        this.state.text.forEach((item, i) => {
            allNotes.unshift(
                <div>
                    <div className="list__item">{hexToAscii(this.state.text[i])}</div>
                    <div>edit</div>
                    <div id={this.state.id[i]} onClick={event => this.removeNote(event.target.id)}>x</div>
                </div>
            );
        });

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>A NoteChain</h2>
                </div>
                <div>
                    <input placeholder='New note' onChange={event => this.setState({newText: event.target.value})}/>
                    <button onClick={() => this.addNewNote()}>
                        Submit
                    </button>
                </div>
                <div>
                    {allNotes}
                </div>
            </div>
        );
    }
}

export default App;
