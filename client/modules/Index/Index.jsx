import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchPosts} from './IndexActions';

import {Post} from '../Post/Post';

import styles from './Index.scss';

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    const {dispatch} = this.props;

    this.setState({isMounted: true});

    dispatch(fetchPosts());
  }

  render () {
    const {isFetching, posts} = this.props;

    var postNodes = posts.map((post) => {
      return (
        <Post
          post={post}
        />
      );
    });

    return (
      <div id={styles.index}>
        <div className={styles.title}>
          TRENDING
        </div>
        <div>
          {postNodes}
        </div>
        {isFetching &&
          <div>Fetching</div>
        }
      </div>
    );
  }
}

Index.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const {index} = state;
  const {isFetching, posts} = index;

  return {
    isFetching,
    posts
  };
}

export default connect(mapStateToProps)(Index);
