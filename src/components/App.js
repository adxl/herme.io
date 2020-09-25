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
					{localStorage.getItem('token') && <Route exact path="/" component={Home} />}
					{localStorage.getItem('token') && <Route path="/*" component={Home} />}
				</Switch>

				{/* token: false */}
				<Switch>
					{ !localStorage.getItem('token') && <Route exact path="/login" component={Login} />}
					{ !localStorage.getItem('token') && <Route exact path="/register" component={Register} />}
					{ !localStorage.getItem('token') && <Route path="/*" component={Login} /> }
				</Switch>
			</BrowserRouter>
		</Fragment>
	);
}

export default App;
