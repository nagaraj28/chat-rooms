import React from 'react';
import './App.css';
import GroupList from './components/grouplist/grouplist';
import ChatWindow from './components/chatwindow/chatwindow';
import ContextProvider from './context/context';

function App() {
  return (
    <ContextProvider>
       <div className="grid">
    <GroupList/>
    <ChatWindow/>
  </div>
    </ContextProvider>
 
  );
}

export default App;
