import { createContext, useEffect, useState} from "react";
import { getRoomData } from "../utils/gameFuncs";
export const BingoContext = createContext("");

export const BingoProvider = ({ children }) => {
    const [roomId, setRoomId] = useState('');
    const [bingoSize, setBingoSize] = useState(5);
    const [matrix, setMatrix] = useState(Array.from({ length: bingoSize }, () => Array(bingoSize).fill(null)));
    useEffect(()=>{
      const callThis = async ()=>{
        const data = await getRoomData(roomId||sessionStorage.getItem('room'));
        if(data.ok){
          setMatrix(Array.from({ length: data.data.bingoSize }, () => Array(data.data.bingoSize).fill(null)))
          setBingoSize(data.data.bingoSize)
          setRoomId(data.data.id)
        }
      };
      callThis()
    },[roomId])
    return (
      <BingoContext.Provider value={{roomId, setRoomId, matrix, setMatrix, bingoSize, setBingoSize}}>
        {children}
      </BingoContext.Provider>
    );
};
  