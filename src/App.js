import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { AuthProvider } from './context/Auth-context';
import { Header } from './layouts/Header';
import { Hero } from './layouts/hero/Hero';
import { Main } from './layouts/Main';
import { Footer } from './layouts/Footer';

const history = createHistory();

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <div className="App">
          <Header />
          <Route exact path="/">
            <Hero />
          </Route>
          <Main />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
