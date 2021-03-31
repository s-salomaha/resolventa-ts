import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {State} from './context/State';
import {Navbar} from './components/Navbar';
import {Filter} from './components/Filter';
import {Resources} from './components/Resources';

function App() {
  return (
    <>
      <State>
        <BrowserRouter >
          <Navbar/>
          <div className="main container pt-5">
            <h1 className="my-4">Hundreds of characters <br />from the TV show Rick and Morty.</h1>
            <p><a href="https://rickandmortyapi.com/documentation/" target="_blank" rel="noreferrer">The Rick and Morty API</a> are used.</p>
            <Filter/>
            <Resources/>
          </div>
          <footer className="border-top">
            <div className="container py-4">
              <div>© 2021 Rick and Morty characters.</div>
            </div>
          </footer>
        </BrowserRouter >
      </State>
    </>
  );
}

export default App;
