import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Login extends Component {
    state = { }

    render() {
    	return (
    		<Fragment>
    			<MDBContainer>
    				<MDBRow>
    					<MDBCol md="6" className="form-main">
    						<form>
    							<p className="h3 text-center mb-3">Herme.io</p>
    							<p className="h4 text-center mb-4">Sign in</p>
    							<input type="text" placeholder="Username" id="defaultFormLoginEmailEx" className="form-control" />
    							<br />
    							<input type="password" placeholder="Password" id="defaultFormLoginPasswordEx" className="form-control" />
    							<div className="text-center mt-4">
    								<MDBBtn color="indigo" type="submit">Login</MDBBtn>
    								<p className="mt-3">
                      Not a member?
    									<Link to="/register"> Register</Link>
    								</p>
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
