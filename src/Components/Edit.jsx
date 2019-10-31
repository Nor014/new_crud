import React from 'react';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postData: this.props.postData }
  }

  onTextAreaChange = (event) => {
    let value = event.target.value
    this.setState((prevState) => ({ ...prevState, postData: value }), () => console.log(this.state))
  }

  onEditSave = () => {
    fetch('http://localhost:7777/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: this.props.id, content: this.state.postData })
    })
      .then(res => console.log(res))
      .then(() => this.props.onEditSave(this.state.postData))
  }

  render() {
    return (
      <div className="edit container">
        <div className="edit__header">
          <p>Редактировать публикацию</p>
          <button className='btn close-btn' onClick={this.props.onEditClose} />
        </div>
        <div className="edit__content">
          <div className="post__avatar avatar"></div>
          <textarea name="" id="" cols="50" rows="4" className='new-post__textarea'
            value={this.state.postData} onChange={(event) => this.onTextAreaChange(event)}> </textarea>
        </div>
        <div className="post__edit">
          <button className='btn link-btn btn_theme_default post__edit-btn' onClick={this.onEditSave}>Сохранить </button>
        </div>
      </div>
    )
  }

}

export default Edit;