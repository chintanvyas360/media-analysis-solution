import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Container, Row, Col } from 'reactstrap';
import diagram from '../img/diagram.png';

class Home extends Component {

  render() {
    return (
      <div>
        <Container>
          <Col>
              <h1 className="display-3"  align="center">BeyondVision.ai Demo</h1>
              <hr className="my-2" />
          </Col>
          <Col>
              <h3 className="display-5">Architecture</h3>
              <hr />
              <img src={diagram} className="img-fluid" alt="diagram"/>
              <hr />
          </Col>
        </Container>
      </div>

    );
  }
}

export default withAuthenticator(Home);
