import React, {Component} from 'react';

class Item extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      text: props.text,
      isFocused: false
    };
  }

  valueChange = () => {
    this.props.saveValue({
        id: this.state.id,
        text: this.refs.input.value
      })
    this.setState({text: this.refs.input.value});
  }

  handleClick = () => {
    this.setState({isFocused: true});
  }

  onBlur = () => {
    this.setState({isFocused: false});
  }

  render() {
    let field = undefined;

    if (this.state.isFocused) {
        field = (
            <input autoFocus
                   onBlur={this.onBlur}
                   onChange={this.valueChange}
                   className="list__input"
                   ref={'input'}
                   value={this.state.text}/>
        );
    } else {
        field = (
            <div onClick={this.handleClick} className="list__text">{this.state.text}</div>
        );
    }

    return (
      <div id={this.state.id} className="list__item">
        {field}
        {this.props.showDelete
          ? <div className="list__icon list__icon--rm"
                 onClick={this.props.remove}>&#215;</div>
          : undefined
        }
      </div>
    )
  }
}

export default Item;
