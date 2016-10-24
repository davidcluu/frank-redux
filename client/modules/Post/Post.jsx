import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import styles from './Post.scss';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    var upvoted = false;
    var downvoted = false;

    this.setState({
      isMounted: true,
      upvoted: upvoted,
      downvoted: downvoted
    });
  }

  upvote() {
    this.setState({
      upvoted: true,
      downvoted: false
    });
  }

  downvote() {
    this.setState({
      downvoted: true,
      upvoted: false
    });
  }

  render () {
    const {_id, user, comments, tags, image, description, score} = this.props.post;
    const {username} = user;
    const {upvoted, downvoted} = this.state;

    var shortenedDescription;
    if (description.length > 100) {
      shortenedDescription = description.substring(0, 100) + '...';
    } else {
      shortenedDescription = description;
    }

    var tagList = tags.map((tag) => {
      return (
        <span>
          <Link to={'/?search=' + tag} className={styles.tag}>{'#' + tag}</Link>
        </span>
      );
    });

    return (
      <div className={styles.post}>
        <div className={styles.container}>
          <img src={image} alt="test"/>
          <div className={styles.info}>
            <div className={styles.username}>
              {username}
            </div>
            <div className={styles.preview}>
              <div className={styles.left}>
                <div className={styles.description}>
                  {shortenedDescription}
                </div>
              </div>
              <div className={styles.right}>
                <div
                  className={styles.upvote + ' ' + (upvoted && styles.selected)}
                  onClick={() => this.upvote()}
                >&and;</div>
                <div>{score}</div>
                <div
                  className={styles.downvote + ' ' + (downvoted && styles.selected)}
                  onClick={() => this.downvote()}
                >&or;</div>
              </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.links}>
              <Link to={'/?id=' + _id} className={styles.viewComments}>{'VIEW ' + comments.length + ' COMMENTS'}</Link>
              {tagList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Post);
