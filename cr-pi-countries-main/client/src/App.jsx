import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomePage from './components/Home/Home';
import LandingPage from './components/Landing/Landingpage';
import CreateActivityForm from './components/CreateActivity/CreateActivityForm.jsx';
import CountryDetail from './components/Carddeteails/CountryDetail.jsx';
import ActivitiesList from './components/Activitylist/ActivitiesList.jsx'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-activity" element={<CreateActivityForm />} />
          <Route path="/countries/:idPais" element={<CountryDetail />} />
          <Route path="/activities" element={<ActivitiesList />} /> 
          <Route path="/countries/busqueda/:name" element={<CountryDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
