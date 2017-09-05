import React, { Component } from 'react';
import logo from './ethereum.png';
import './App.css';
import Web3 from 'web3';

let ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let NotesContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"id","type":"uint256"},{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"removeNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"curId","type":"uint256"},{"name":"newText","type":"bytes32"}],"name":"editNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
let NotesContractAddress = '0xdb400744013c9b8177329050aad18c32c0f21625';
let NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: [],
            text: [],
            newText: '',
            edit: false,
        }

        this.editNote = this.editNote.bind(this);
    }

    editNote(){
        this.setState({
            edit:       true,
            oldUser:    this.state.user
        });
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
                <div className="list__item">
                    <div className="list__text">{hexToAscii(this.state.text[i])}
                    </div>
                    <input className="list__input--hidden" value={this.state.text}
                           onChange={this.changeText}
                           action
                           disabled={this.state.edit === false}/>
                    <div className="list__icon list__icon--edit"
                            disabled={this.state.edit === true}
                            onClick={this.editNote}>&#8249;
                    </div>
                    <div className="list__icon list__icon--rm"
                         id={this.state.id[i]}
                         onClick={event => this.removeNote(event.target.id)}>&#215;
                     </div>
                </div>
            );
        });

        return (
            <div className="main">
                <div className="main__header">
                    <img src={logo} className="main__logo" alt="logo"/>
                    <h2 className="main__title">A NoteChain</h2>
                </div>
                <div>
                    <input autoFocus={true}
                           className="main__input"
                           placeholder='Type your note here'
                           onChange={event => this.setState({newText: event.target.value})}/>
                    <br/>
                    <button className="main__btn" onClick={() => this.addNewNote()}>
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
