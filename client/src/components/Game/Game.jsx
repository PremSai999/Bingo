import React, { useContext, useEffect, useState } from "react";
import { BingoContext } from "../../context/BingoContext";
import { useSocket } from "../../context/SocketContext";
import isBingo from "../../utils/validate";
import { findIndices } from "../../utils/findIndices";
import { checkStart } from "../../utils/gameFuncs";
import Modal from "../Modal/Modal";
import "./Game.css";
import Chat from "../Chat/Chat";

function Game() {
    const socket = useSocket();

    const { matrix, setMatrix, bingoSize } = useContext(BingoContext);
    const [turn, setTurn] = useState(0);
    const [progress, setProgress] = useState(0);
    const [started, setStarted] = useState(false);
    const [gameSize, setGameSize] = useState(0);
    const [players, setPlayers] = useState([]);
    const [called, setCalled] = useState(false);
    const [winner, setWinner] = useState(null);
    const room = sessionStorage.getItem("room");
    const name = sessionStorage.getItem("name");

    useEffect(() => {
        if (socket && !started) {
            socket.emit("join-room", room);
            socket.on("getRoom", (room) => {
                checkStart(room).then((res) => {
                    if (res) {
                        setStarted(res.full);
                        setGameSize(res.players.length)
                        setPlayers(res.players);
                    }
                });
            });
            socket.on("receiveWinner", (name) => {
                setWinner(name);
            });
        }
    }, [socket, started]);

    useEffect(() => {
        if (gameSize!==0 && players.length === gameSize && !called) {
            console.log("entered", players);
            socket.on("clicked", (val) => {
                console.log(players, "gg");
                const data = findIndices(matrix, val);
                console.log(data);
                if (data) {
                    const { r, c } = data;
                    const newMatrix = [...matrix];
                    newMatrix[r][c].strike = true;
                    setMatrix(newMatrix);
                    setProgress((prevProgress) => {
                        const newProgress = isBingo(newMatrix, bingoSize);
                        if (newProgress > 4 && socket) {
                            socket.emit("sendWinner", { name, room });
                        }
                        return newProgress;
                    });
                    setTurn((turn) => (turn + 1) % players.length);
                }
            });
            setCalled(true);
        }
    }, [players, called, gameSize]);

    const clickedButton = (r, c) => {
        if (
            socket &&
            players &&
            players[turn] === name &&
            matrix[r][c].strike !== true
        ) {
            console.log(players);
            const newMatrix = [...matrix];
            newMatrix[r][c].strike = true;
            setMatrix(newMatrix);
            setProgress((prevProgress) => {
                const newProgress = isBingo(newMatrix, bingoSize);
                if (newProgress > 4 && socket) {
                    socket.emit("sendWinner", { name, room });
                } else {
                    socket.emit("click", { val: matrix[r][c].value, room });
                }
                return newProgress;
            });
            setTurn((turn) => (turn + 1) % players.length);
        }
    };

    return socket && started && players ? (
        <div className="game-container">
            <div className="game-content">
                <div className="matrix-container">
                    <div className="player-list">
                        {players.map((player, index) => (
                            <span
                                key={index}
                                className={`player ${
                                    player === players[turn]
                                        ? "current-player"
                                        : ""
                                }`}
                            >
                                {player}
                            </span>
                        ))}
                    </div>
                    <div
                        className="bingo-container"
                        style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "40px",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        <span style={{ color: progress > 0 ? "red" : "green" }}>
                            B
                        </span>
                        <span style={{ color: progress > 1 ? "red" : "green" }}>
                            I
                        </span>
                        <span style={{ color: progress > 2 ? "red" : "green" }}>
                            N
                        </span>
                        <span style={{ color: progress > 3 ? "red" : "green" }}>
                            G
                        </span>
                        <span style={{ color: progress > 4 ? "red" : "green" }}>
                            O
                        </span>
                    </div>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} className={"matrix-row"}>
                            {row.map((number, colIndex) => (
                                <button
                                    key={colIndex}
                                    className={`matrix-button ${
                                        number && number.strike ? "strike" : ""
                                    }`}
                                    onClick={() =>
                                        clickedButton(rowIndex, colIndex)
                                    }
                                >
                                    {number && number.value}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
                {winner && <Modal winner={winner} />}
            </div>
            <div className="chat-container">
                {socket && <Chat socket={socket} />}
            </div>
        </div>
    ) : (
        <div className="waiting">
            <h2>Wait till others join the game...</h2>
        </div>
    );
}

export default Game;
