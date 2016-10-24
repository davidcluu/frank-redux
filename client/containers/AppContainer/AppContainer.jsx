/* eslint max-len: 0 */
import React, {Component} from 'react';
import Helmet from 'react-helmet';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render () {
    return (
      <div>
        <Helmet
          defaultTitle="Test"
          titleTemplate="%s - Test"
          meta={[
            {charset: 'utf-8'},
            {'http-equiv': 'x-ua-compatible', content: 'ie=edge'},
            {name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0'},
            {name: 'keywords', content: ''},
            {name: 'author', content: ''},
            {name: 'robots', content: 'index, follow'},
            {name: 'revisit-after', content: '1 days'}
          ]}
          link={[
            {rel: 'author', href: 'humans.txt'}
          ]}
        />

        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default AppContainer;
