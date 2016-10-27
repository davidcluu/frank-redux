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

  onUpvoteClick() {
    const {upvoted} = this.state;

    this.setState({
      upvoted: !upvoted,
      downvoted: false
    });
  }

  onDownvoteClick() {
    const {downvoted} = this.state;

    this.setState({
      downvoted: !downvoted,
      upvoted: false
    });
  }

  render () {
    const {post} = this.props;
    const {_id, user, comments, tags, image, description, score} = post;
    const {username} = user;
    const {upvoted, downvoted} = this.state;

    var shortenedDescription;
    if (description.length > 100) {
      shortenedDescription = description.substring(0, 100) + '...';
    } else {
      shortenedDescription = description;
    }

    var adjustedScore;
    if (upvoted) {
      adjustedScore = score + 1;
    } else if (downvoted) {
      adjustedScore = score - 1;
    } else {
      adjustedScore = score;
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
                  className={`${styles.upvote} ${(upvoted && styles.selected)}`}
                  onClick={() => this.onUpvoteClick()}
                  dangerouslySetInnerHTML={{__html: `
                    <svg viewBox="0 0 93 59" xmlns="http://www.w3.org/2000/svg">
                      <path d="M80.87 46H93L46.5 0 0 46h12.13L46.5 12l34.37 34z" fill-rule="evenodd"/>
                    </svg>
                  `}}
                />
                <div>{adjustedScore}</div>
                <div
                  className={`${styles.downvote} ${(downvoted && styles.selected)}`}
                  onClick={() => this.onDownvoteClick()}
                  dangerouslySetInnerHTML={{__html: `
                    <svg viewBox="0 -12 93 59" xmlns="http://www.w3.org/2000/svg">
                      <path d="M80.87 0H93L46.5 46 0 0h12.13L46.5 34 80.87 0z" fill-rule="evenodd"/>
                    </svg>
                  `}}
                />
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
