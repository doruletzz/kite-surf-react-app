import Login from './pages/auth/Login';

import './App.scss';

import 'leaflet/dist/leaflet.css';

import { Provider } from 'react-redux';
import { Navigate } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './features/app/store';
import Dashboard from './pages/spot/Dashboard';
import Register from './pages/auth/Register';

const App = () => {
	return (
		<main>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/home' element={<Dashboard />} />
						<Route path='/' element={<Navigate to='/home' />} />
					</Routes>
				</Router>
			</Provider>
		</main>
	);
};
export default App;
