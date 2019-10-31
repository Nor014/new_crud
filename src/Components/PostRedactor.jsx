import React from 'react';
import Post from './Post';

class PostRedactop extends React.Component {
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
    return (
      <>
        {this.state.posts.length > 0 &&
          <Post data={this.state.posts.find(el => el.id === +this.props.match.params.id)} edit={true} />}
      </>
    )
  }

}

export default PostRedactop;