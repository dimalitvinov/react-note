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

  onBlur() {
    this.setState({isFocused: false});
  }

  render() {
    let classHide = [];
    let classShow = ['hidden'];
    if (this.state.isFocused) {
      classHide.push('hidden');
      classShow.push('show');
    }

    return (
      <div id={this.state.id} className="list__item">
        <div className={classHide.join(' ')}
             onClick={this.handleClick.bind(this)}>{this.state.text}</div>
        <input className={classShow.join(' ')}
               autoFocus={true}
               onBlur={this.onBlur.bind(this)}
               onChange={this.valueChange}
               ref={'input'}
               value={this.state.text}/>
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
