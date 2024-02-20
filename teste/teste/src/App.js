import React, { Component } from 'react';
import './App.css';
import '../src/data/data.json'

//Components
import MyComponent from './components/MyComponent';

//const fightSkills = ['Kickboxing', 'Jiu-Jitsu'];

const App = () =>  {

  const buttonEvent = () => {
    alert('You clicked!')
  }

  return (
    <div>
      <MyComponent name="Gustavo"/>
      <p>My MMA Skills are: {fightSkills.map(fight => ` ${fight}`)}</p>
      <button onClick={buttonEvent} className='btn'>click here</button>
    </div>
  );
}

export default App;
