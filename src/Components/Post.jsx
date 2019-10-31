import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Edit from './Edit';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: this.props.data.content,
      id: this.props.data.id,
      redirect: false,
      showEdit: false,
    }
  }

  onPostDelite = () => {
    fetch(`http://localhost:7777/posts/${this.props.data.id}`, {
      method: 'DELETE'
    })
      .then(res => console.log(res))
      .then(() => this.setState({ redirect: true }))
  }

  onEditPost = () => {
    this.setState((prevState) => ({ ...prevState, showEdit: true }))
  }

  onEditSave = (data) => {
    this.setState((prevState) => ({ ...prevState, showEdit: false, postData: data }))
  }

  onEditClose = () => {
    this.setState((prevState) => ({ ...prevState, showEdit: false }))
  }

  render() {
    const { data, edit } = this.props;

    if (this.state.redirect) {
      return <Redirect to='/' push ></Redirect>
    }

    if (this.state.showEdit) {
      return <Edit postData={this.state.postData} id={this.state.id}
        onEditSave={this.onEditSave} onEditClose={this.onEditClose} />
    }

    return (
      <React.Fragment>
        <div className='post container'>
          {!edit && <Link to={`/posts/${data.id}`} className='post__link' />}

          <div className="post__profile">
            <div className="post__avatar avatar"></div>
            <div className="post__profile-data">
              <div className="post__profile-name">User</div>
              <p className="post__profile-data">{new Date(data.created).toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="post__content">{this.state.postData}</div>

          <div className="post__actions">
            <div className="post__likes post__actions-items">
              <button className="btn post__btn">Нравится</button>
            </div>
            <div className="post__comments post__actions-items">
              <button className="btn post__btn">Комментировать</button>
            </div>
          </div>

          {!edit
            ? <div className="post__commetns-inner">
              <div className="avatar avatar_size_small"></div>
              <input type="text" className="post__input" placeholder='Напишите комментарий...' />
            </div>
            : <div className="post__edit">
              <button className='btn link-btn btn_theme_default post__edit-btn' onClick={this.onEditPost}> Редактировать </button>
              <button className='btn link-btn btn_theme_default post__edit-btn btn_theme_red' onClick={this.onPostDelite}> Удалить </button>
            </div>
          }
        </div>
      </React.Fragment>
    )
  }

}

export default Post;