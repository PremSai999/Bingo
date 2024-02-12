import { createContext, useState} from "react";

export const BingoContext = createContext("");

export const BingoProvider = ({ children }) => {
    const [roomId, setRoomId] = useState('');
    const [matrix, setMatrix] = useState(Array.from({ length: 5 }, () => Array(5).fill(null)));
  
    return (
      <BingoContext.Provider value={{roomId, setRoomId, matrix, setMatrix}}>
        {children}
      </BingoContext.Provider>
    );
};
  