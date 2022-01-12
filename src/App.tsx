import React from 'react';
import './App.css';
import GroupList from './components/grouplist/grouplist';
import ChatWindow from './components/chatwindow/chatwindow';
import ContextProvider from './context/context';
import SocketContextProvider from './context/scoketContext';

function App() {
  return (
    <SocketContextProvider>
       <ContextProvider>
       <div className="grid">
    <GroupList/>
    <ChatWindow/>
  </div>
    </ContextProvider>
    </SocketContextProvider>
   
 
  );
}

export default App;
