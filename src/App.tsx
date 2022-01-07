import React from 'react';
import './App.css';
import GroupList from './components/grouplist/grouplist';
import ChatWindow from './components/chatwindow/chatwindow';

function App() {
  return (
  <div className="grid">
    <GroupList/>
    <ChatWindow/>
  </div>
  );
}

export default App;
