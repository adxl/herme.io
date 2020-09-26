import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		username: '',
		password: '',
	}

	handleInputChange = (e) => {
		// console.log(e.target.id + ': ' + e.target.value);
		const { name } = e.target;
		const { value } = e.target;

		// disable default case since it never happens
		// eslint-disable-next-line default-case
		switch (name) {
		case 'firstName':
			this.setState({ firstName: value });
			break;
		case 'lastName':
			this.setState({ lastName: value });
			break;
		case 'username':
			this.setState({ username: value });
			break;
		case 'password':
			this.setState({ password: value });
			break;
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state),
		};

		fetch('https://herme-io.herokuapp.com/register/', options)
			.then((data) => {
				if (data.ok) { window.location.replace('http://localhost:3000/login'); }
			})
			.catch((error) => console.log(`caught:${error}`));
	}

	render() {
		return (
			<Fragment>
				<MDBContainer>
					<MDBRow>
						<MDBCol md="6" className="form-main">
							<form onSubmit={this.handleSubmit}>
								<p className="h4 text-center mb-5">Welcome to Herme.io</p>
								<div>
									<div className="field">
										<input name="firstName" type="text" placeholder="First Name" id="defaultFormRegisterFNameEx" className="form-control" onChange={this.handleInputChange} />
									</div>
									<div className="field">
										<input name="lastName" type="text" placeholder="Last Name" id="defaultFormRegisterLNameEx" className="form-control" onChange={this.handleInputChange} />
										<br />
									</div>
								</div>

								<input name="username" type="text" placeholder="Username" id="defaultFormRegisterEmailEx" className="form-control" onChange={this.handleInputChange} />
								<br />
								<input name="password" type="password" placeholder="Password" id="defaultFormRegisterPasswordEx" className="form-control" onChange={this.handleInputChange} />
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
