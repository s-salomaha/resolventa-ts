import React from 'react';
import {ReactComponent as Logo} from '../logo.svg';
import {Wishlist} from '../components/Wishlist';

export const Navbar: React.FC = () => (
  <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
    <div className="container">
      <a href="/" className="navbar-brand text-uppercase">
        <Logo/>
        <span className="pl-2">Rick and Morty</span>
      </a>
      <div className="d-flex">
        <ul className="navbar-nav">
          <li className="nav-item">
          <a
            className="nav-link"
            href="https://github.com/s-salomaha/resolventa-ts"
            target="_blank"
            rel="noreferrer"
          >
            Github repository
          </a>
          </li>
        </ul>
        <Wishlist/>
      </div>
    </div>
  </nav>
);
