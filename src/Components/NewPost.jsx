import React from 'react';
import { Redirect } from 'react-router-dom';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postValue: '',
      redirect: false
    }
  }

  changeTab = (event) => {
    let target = event.target.parentNode;
    document.querySelectorAll('.new-post__item').forEach(el => el.classList.remove('new-post_item-active'));
    target.classList.add('new-post_item-active');

    let name = event.target.dataset.name;
    let tabs = document.querySelectorAll('.new-post__tab');
    let activeTab = Array.from(tabs).find(el => el.dataset.name === name);

    tabs.forEach(tab => tab.classList.remove('new-post_tab-active'));
    activeTab.classList.add('new-post_tab-active');
  }

  onAreaInput = (event) => {
    let value = event.target.value;
    this.setState({ postValue: value });
  }

  onCloseButton = () => {
    this.setState({ redirect: true });
  }

  onSubmitBtn = () => {
    fetch('http://localhost:7777/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: 0, content: this.state.postValue })
    })
      .then(() => this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' push ></Redirect>
    }

    return (
      <div className="new-post container">

        <div className="new-post__header">
          <ul className="new-post__nav">
            <li className='new-post__item new-post_item-active'>
              <button className='btn new-post__btn publication'
                onClick={(event) => this.changeTab(event)} data-name='Публикация'>Публикация</button>
            </li>
            <li className='new-post__item'>
              <button className='btn new-post__btn camera'
                onClick={(event) => this.changeTab(event)} data-name='Фото/Видео'>Фото/Видео</button>
            </li>
            <li className='new-post__item'>
              <button className='btn new-post__btn video'
                onClick={(event) => this.changeTab(event)} data-name='Трансляция'>Прямой Эфир</button>
            </li>
          </ul>
          <button className='btn close-btn' onClick={this.onCloseButton} />
        </div>

        <div className="new-post__main">
          <div className="new-post__tab new-post_tab-active" data-name='Публикация'>
            <div className="avatar"></div>
            <textarea name="" id="" cols="55" rows="2" className='new-post__textarea'
              onChange={(event) => this.onAreaInput(event)}></textarea>
          </div>

          <div className="new-post__tab" data-name='Фото/Видео'>
            <div className="avatar"></div>
            <div className="new-post__inner">
              <h2>Unlock</h2>
            </div>
          </div>

          <div className="new-post__tab" data-name='Трансляция'>
            <div className="avatar"></div>
            <div className="new-post__inner">
              <h2>Unlock</h2>
            </div>
          </div>
        </div>

        <div className="new-post__footer">
          <button className='btn new-post__post-btn btn_theme_default' onClick={this.onSubmitBtn}>Опубликовать</button>
        </div>
      </div>
    )
  }

}

export default NewPost;