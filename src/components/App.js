import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';

function App() {
	return (
		<Fragment>
			<BrowserRouter>
				{/* token: true */}
				<Switch>
					{localStorage.getItem('token') && <Route path="/herme.io/*" component={Home} />}
				</Switch>

				{/* token: false */}
				<Switch>
					{ !localStorage.getItem('token') && <Route exact path="/herme.io/login" component={Login} />}
					{ !localStorage.getItem('token') && <Route exact path="/herme.io/register" component={Register} />}
					{ !localStorage.getItem('token') && <Route path="/herme.io/*" component={Login} /> }
				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
