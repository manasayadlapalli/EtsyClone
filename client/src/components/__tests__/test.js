import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Home from '../Home';
import Navbar from '../Navbar';


// test('render Home component', ()=> {
//     render(<Home/>);
//     const homeElement = screen.getByTestId('home-1');
//     expect(homeElement).toBeInTheDocument();
// })

// test('render Navbar component', ()=> {
//     render(<Navbar/>);
//     const navbarElement = screen.getByTestId('navbar-1');
//     expect(navbarElement).toBeInTheDocument();
// })

describe('Home', () => {
    test('renders Home component', () => {
      render(<Home />);  

    expect(screen.getByRole('div')).toBeInTheDocument();
    });
  });