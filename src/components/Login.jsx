import React, { Component, Fragment } from 'react';
import {
  MDBContainer, MDBRow, MDBCol, MDBBtn,
} from 'mdbreact';

class Login extends Component {
    state = { }

    render() {
      return (
        <Fragment>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6" className="login-main">
                <form>
                  <p className="h3 text-center mb-3">Herme.io</p>
                  <p className="h4 text-center mb-4">Sign in</p>
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Username</label>
                  <input type="text" id="defaultFormLoginEmailEx" className="form-control" />
                  <br />
                  <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Password</label>
                  <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
                  <div className="text-center mt-4">
                    <MDBBtn color="indigo" type="submit">Login</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Fragment>
      );
    }
}

export default Login;
