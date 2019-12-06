import React, { Component } from 'react';
import Amplify, { Auth, Storage, API, Hub } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "../App.css"
import Home from './home';
import Upload from './upload';
import Browse from './browse';
import Settings from './settings';
import Result from './result';
declare var media_analysis_config;


Amplify.configure({
  Auth: {
    region: media_analysis_config.SOLUTION_REGION,
    userPoolId: media_analysis_config.SOLUTION_USERPOOLID,
    userPoolWebClientId: media_analysis_config.SOLUTION_USERPOOLWEBCLIENTID,
    identityPoolId: media_analysis_config.SOLUTION_IDENTITYPOOLID
  },
  Storage: {
    bucket: media_analysis_config.SOLUTION_BUCKET,
    region: media_analysis_config.SOLUTION_REGION,
    identityPoolId: media_analysis_config.SOLUTION_IDENTITYPOOLID
  },
  API: {
    endpoints: [
      {
        name: "VizonAnalysisApi",
        region: media_analysis_config.SOLUTION_REGION,
        endpoint: media_analysis_config.SOLUTION_ENDPOINT
      }
    ]
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.getVizonAnalysisConfig = this.getVizonAnalysisConfig.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.username);
  }

  getVizonAnalysisConfig() {
    return media_analysis_config;
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Browse} />
        <Route path='/home' component={Browse} />
        <Route path='/upload' render={(props) => <Upload {...props} getVizonAnalysisConfig={this.getVizonAnalysisConfig} />} />
        <Route path='/browse' component={Browse} />
        <Route path='/settings' component={Settings} />
        <Route path='/result/:objectid' component={Result} />
      </Switch>
    );
  }
}

export default App;
