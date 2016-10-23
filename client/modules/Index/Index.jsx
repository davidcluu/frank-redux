import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from './IndexActions';

//import styles from './Index.scss';

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.setState({ isMounted: true });

    dispatch(fetchPosts());
  }

  render () {
    var postNodes = this.props.posts.map((post) => {
      return (
        <div>
          {post._id} {post.title} {post.content}
        </div>
      );
    });

    return (
      <div>
        {postNodes}
      </div>
    );
  }
}

Index.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  const { index } = state;
  const { posts } = index;

  return {
    posts
  }
}

export default connect(mapStateToProps)(Index);
