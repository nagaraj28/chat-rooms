import React, { useState,useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client';

export const Context2 = createContext({});
const ContextProvider2: React.FC<{}> = ({children})=>{
    
    return <Context2.Provider value={{}}>
        {children}
    </Context2.Provider>
} 

export default ContextProvider2;