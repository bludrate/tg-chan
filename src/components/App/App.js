import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../Main';
import Channel from '../Channel';
import NotFound from '../NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//import actions from '../../actions';

function select( state ) {
  return {};
}

class AppRoutes extends Component {
  componentWillMount() {
    const { history} = this.props;
    this.unsubscribeFromHistory = history.listen( this.handleLocationChange );
  }

  handleLocationChange = (location) => {
    window.trackPageView({
      title: 'tg-chan',
      page_path: location.pathname
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  render() {
    return (<Switch>
      <Route path="/" exact component={Main}/>
      <Route path="/channel/:username" exact component={Channel}/>
      <Route path="/channel/:username/:postIndex" exact component={Channel}/>
      <Route component={NotFound}/>
    </Switch>);
  }
}

const AppRoutesWithStore = withRouter( connect(select)(AppRoutes) );

class App extends Component {
  render() {
    const Router = this.props.router;
    return (
      <Provider store={this.props.store}>
        <Router context={this.props.context} location={this.props.location}>
          <AppRoutesWithStore/>
        </Router>
      </Provider>
    );
  }
}
export default App;
