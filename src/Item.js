import React, {Component} from 'react';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            text: props.text
        };
    }

    valueChange = () => {
        this.props.saveValue({
            id: this.state.id,
            text: this.refs.input.value
        })
        this.setState({text: this.refs.input.value});
    }

    render() {
        return (
            <div id={this.state.id} className="list__item">
                <div className="list__text">{this.state.text}</div>
                <input className="list__input--hiddenn"
                       onChange={this.valueChange}
                       ref={'input'}
                       value={this.state.text}/>
                <div className="list__icon list__icon--edit"/>
                    {this.props.showDelete
                        ? <div className="list__icon list__icon--rm" onClick={this.props.remove}>&#215;
                            </div>
                        : undefined
                    }

            </div>
        )
    }
}

export default Item;
