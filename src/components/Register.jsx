import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Register extends Component {
		state = { }

		render() {
			return (
				<Fragment>
					<MDBContainer>
						<MDBRow>
							<MDBCol md="6" className="form-main">
								<form>
									<p className="h4 text-center mb-5">Welcome to Herme.io</p>
									<div>
										<div className="field">
											<input type="text" placeholder="First Name" id="defaultFormRegisterNameEx" className="form-control" />
										</div>
										<div className="field">
											<input type="text" placeholder="Last Name" id="defaultFormRegisterNameEx" className="form-control" />
											<br />
										</div>
									</div>
									<input type="text" placeholder="Username" id="defaultFormRegisterEmailEx" className="form-control" />
									<br />
									<input type="password" placeholder="Password" id="defaultFormRegisterPasswordEx" className="form-control" />
    							<br />
									<input type="password" placeholder="Confirm your password" id="defaultFormRegisterConfirmEx" className="form-control" />
									<br />

									<div className="text-center mt-4">
										<MDBBtn color="unique" type="submit">Register</MDBBtn>
										<p className="mt-3">
											Have an account?
											<Link to="/login"> Login</Link>
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

export default Register;
