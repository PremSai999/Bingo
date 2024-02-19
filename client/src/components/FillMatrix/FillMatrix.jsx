import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BingoContext } from "../../context/BingoContext";
import { updateReady } from "../../utils/gameFuncs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
import "./FillMatrix.css";
import Invite from "../Invite/Invite";

function FillMatrix() {
    const { matrix, setMatrix, roomId, setRoomId } = useContext(BingoContext);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const room = sessionStorage.getItem("room");
        if (room) {
            setRoomId(room);
        }
    }, [setRoomId]);

    const copiedToClipboard = () => {
        copy(roomId);
        toast.success("Copied to clipboard!");
    };

    const assignNumber = (row, col) => {
        const newMatrix = [...matrix];
        if (newMatrix[row][col] === null) {
            newMatrix[row][col] = { value: count, strike: false };
            setCount((count) => count + 1);
            setMatrix(newMatrix);
        }
        console.log(matrix);
    };
    const temp = async () => {
        const matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 0));
        for (let i = 1; i <= 25; i++) {
            let row, col;
            do {
                row = Math.floor(Math.random() * 5);
                col = Math.floor(Math.random() * 5);
            } while (matrix[row][col] !== 0);
            matrix[row][col] = {value:i, strike:false};
        }
        const data = await updateReady(roomId);
        if (data.status === "ok") {
            setMatrix(matrix);
            navigate("/game");
        }
    };
    const startGame = async () => {
        if (count === 26) {
            const data = await updateReady(roomId);
            if (data.status === "ok") {
                setMatrix(matrix);
                navigate("/game");
            }
        }
    };

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "70vh",
                alignItems: "center",
            }}
        >
            <div className="matrix-container" style={{ width: "70%" }}>
                <h1>
                    Room Code: {roomId}{" "}
                    <FontAwesomeIcon
                        icon={faCopy}
                        onClick={copiedToClipboard}
                        style={{ color: "#a6a6a6", cursor: "pointer" }}
                    />
                </h1>
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="matrix-row">
                        {row.map((number, colIndex) => (
                            <button
                                key={colIndex}
                                className="matrix-button"
                                onClick={() => assignNumber(rowIndex, colIndex)}
                            >
                                {number != null &&
                                    number.value !== null &&
                                    number.value}
                            </button>
                        ))}
                    </div>
                ))}
                <button onClick={startGame}>Ready</button>
                <p>OR</p>
                <button onClick={temp}>temp</button>
            </div>
            <div
                style={{
                    width: "30%",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    margin: "5%",
                }}
            >
                <Invite />
            </div>
        </div>
    );
}

export default FillMatrix;
