import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import './App.css';
import './Blocks/btn/btn.css';
import './Blocks/newPost/newPost.css';
import './Blocks/Post/Post.css';
import './Blocks/Cards/Cards.css';
import './Blocks/Editor/Editor.css';
import Cards from './Components/Cards';
import NewPost from './Components/NewPost';
import PostRedactor from './Components/PostRedactor';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div className='main'>
            <Switch>
              <Route exact path='/' component={Cards} />
              <Route exact path='/posts/new' component={NewPost} />
              <Route exact path='/posts/:id' component={PostRedactor} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
