import React from "react";
import App from "../App";
// import $ from "jquery";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Amplify, { Hub, Auth } from 'aws-amplify';
import { Authenticator, Greetings } from "aws-amplify-react";
import { Container, NavbarBrand, Navbar, Nav, NavItem, NavLink, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import './AppWithAuth.css'

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

class AppWithAuth extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      username: "",
      isSignedIn: false,
      identityId: ""
    };
    const listener = (data) => {

      switch (data.payload.event) {

        case 'signIn':
          this.setCurrentUser();
          this.rerender();
          break;
        default:
      }
    }
    Hub.listen('auth', listener);
    this.setCurrentUser();
    this.signOutHandler = this.signOutHandler.bind(this);
  }

  rerender = () => this.forceUpdate();

  fetchCurrentUser = async () => {
    const currentUser = await Auth.userPool.getCurrentUser();
    return currentUser;
  };

  setCurrentUser = async () => {
    const currentUser = await this.fetchCurrentUser();
    if (currentUser !== undefined && currentUser !== null) {
      this.setState({
        username: currentUser.username,
        isSignedIn: true
      });
    } else {
      this.setState({
        username: null,
        isSignedIn: false
      });
    }
    console.log(currentUser)
  }
  signOut = async () => {
    const currentUser = await this.fetchCurrentUser();
    await currentUser.signOut();
    await this.setCurrentUser();
    this.rerender();
  };

  signOutHandler = () => {
    this.signOut();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <div className="navbar-wrapper">
              <Container>
                <Navbar color="dark">
                  <NavbarBrand tag={Link} to="/home">
                    <img src="../assets/images/beyondvisionlogo_v2.png" className="header-logo d-inline-block align-top" alt="" />
                    BeyondVision.ai</NavbarBrand>
                  {this.state.isSignedIn && (<Nav className="ml-auto">
                    <NavItem color="white">
                      <NavLink tag={Link} to="/upload" className="text-light">Upload</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/browse" className="text-light">Browse</NavLink>
                    </NavItem>
                    {/*<NavItem>
                      <NavLink tag={Link} to="/settings" className="text-light">Settings</NavLink>
                    </NavItem>*/}
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        {this.state.username}
                      </DropdownToggle>
                      <DropdownMenu right>
                        {/*<DropdownItem tag={Link} to="/settings">
                          Settings
                        </DropdownItem>
                        <DropdownItem divider />*/}
                        <DropdownItem onClick={this.signOutHandler}>
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>)}
                </Navbar>
              </Container>
            </div>
            {!this.state.isSignedIn && (
              <Authenticator hide={[Greetings]} />
            )}
            {this.state.isSignedIn && (
              <App username={this.state.username} />
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default AppWithAuth;
