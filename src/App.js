import React, {Component} from 'react';
import Item from './Item';
import './App.css';
import logo from './ethereum.png';
import * as config from './config.js';

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
        let item = config.NotesContract.editNote.sendTransaction(field.id, field.text, {
            from: config.ETHEREUM_CLIENT.eth.accounts[0],
            gas: 3000000
        });
    }

    getNotes = () => {
        let rawNotes = config.NotesContract.getNotes(),
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
        let result = config.NotesContract.addNote.sendTransaction(parseInt(Date.now()), this.state.newNote, {
            from: config.ETHEREUM_CLIENT.eth.accounts[0],
            gas: 3000000
        });
        if (result == true) {
        } else {
        }
        this.getNotes();
    }

    removeNote(id) {
        let item = config.NotesContract.removeNote.sendTransaction(id, {
            from: config.ETHEREUM_CLIENT.eth.accounts[0],
            gas: 3000000
        });
        this.getNotes();
    }


    render() {
        return (
            <div className="main">
                <div className="main__header">
                    <img src={logo} className="main__logo" alt="logo"/>
                    <h2 className="main__title">A NoteChain</h2>
                </div>
                <div>
                    <input autoFocus
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
                    }).reverse()}
                </div>
            </div>
        );
    }
}

export default App;
