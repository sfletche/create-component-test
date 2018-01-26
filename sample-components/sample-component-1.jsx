import React from 'react';
import Logo from './logo';
import { components as navigationComponents } from '../../navigation';
const { Navigation } = navigationComponents;

function SampleComponent1() {
  return (
    <header className="header">
      <div className="container header--wrapper">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default SampleComponent1;
