import React, {Component} from 'react';
import Item from './Item';
import logo from './ethereum.png';
import './App.css';
import Web3 from 'web3';

let ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let NotesContractABI =
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"notes","outputs":[{"name":"id","type":"uint256"},{"name":"text","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_text","type":"bytes32"}],"name":"addNote","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"removeNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNotes","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"curId","type":"uint256"},{"name":"newText","type":"bytes32"}],"name":"editNote","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
let NotesContractAddress = '0xd6acf71ef15e6f7bbc09094fab7a6b0881126be5';
let NotesContract = ETHEREUM_CLIENT.eth.contract(NotesContractABI).at(NotesContractAddress);

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    hexToAscii = hex => {
        let str = '',
            i = 0,
            l = hex.length;
        if (hex.substring(0, 2) === '0x') {
            i = 2;
        }
        for (; i < l; i += 2) {
            let code = parseInt(hex.substr(i, 2), 16);
            if (code === 0)
                continue;
            str += String.fromCharCode(code);
        }
        return str;
    };

    editNote = field => {
        let item = NotesContract.editNote.sendTransaction(field.id, field.text, {
            from: ETHEREUM_CLIENT.eth.accounts[0],
            gas: 3000000
        });
    }

    getNotes = () => {
        let rawNotes = NotesContract.getNotes(),
            listID = String(rawNotes[0]).split(','),
            listText = String(rawNotes[1]).split(',');

        let newItems = listID.map((item, index) => {
            if (item !== '') {
                return {
                    id: item,
                    text: this.hexToAscii(listText[index])
                };
            }
        })

        newItems = newItems[0] === undefined
            ? []
            : newItems;

        this.setState({items: newItems});
    }

    componentWillMount() {
        this.getNotes();
    }

    addNewNote() {
        let result = NotesContract.addNote.sendTransaction(parseInt(Date.now()), this.state.newNote, {
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
                           onChange={event => this.setState({newNote: event.target.value})}/>
                    <br/>
                    <button className="main__btn" onClick={() => this.addNewNote()}>
                        Submit
                    </button>
                </div>
                <div>
                    {this.state.items.map(item => {
                        return (<Item key={item.id}
                                      showDelete={this.state.items.length != 0}
                                      saveValue={this.editNote}
                                      remove={() => this.removeNote(item.id)} {...item}
                                />)
                    })}
                </div>
            </div>
        );
    }
}

export default App;
