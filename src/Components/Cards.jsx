import React from 'react';
import { Link } from 'react-router-dom';

import Post from './Post';


class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }

  componentDidMount() {
    fetch('http://localhost:7777/posts')
      .then(res => res.json())
      .then(data => this.setState({ posts: data }))
  }

  render() {
    const sortPosts = [].concat(this.state.posts).sort((a, b) => b.created - a.created)

    return (
      <div className="posts">
        <div className="container container_add-link">
          <Link className='btn link-btn btn_theme_default' to='/posts/new'> Создать пост </Link>
        </div>

        {sortPosts.length > 0 &&
          <div className="posts__wrap">
            {sortPosts.map(post => <Post key={post.id} data={post} />)}
          </div>}
      </div>
    )
  }

}

export default Cards;