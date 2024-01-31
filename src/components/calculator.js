import React, { useState, useEffect } from "react";
import * as math from "mathjs";
import { numpad } from "@/lib/numpad";
import Button from "./button";

export default function Calculator() {
    const [expression, setExpression] = useState("");
    const [screenVal, setScreenVal] = useState("");
    const [outputVisibility, setOutputVisibility] = useState("hide");
    // const [customVariables, setCustomVariables] = useState({});
    // Default mode is "rad"
    const [mode, setMode] = useState("rad");
    useEffect(() => updateResult(), [expression]);

    function clearScreen() {
        setExpression("");
        setScreenVal("");
    }

    function backspace() {
        const newExpression = expression.slice(0, -1);
        setExpression(newExpression);
    }

    function showResult() {
        console.log('SHow result');
    }

    function calculate(num) {
        setExpression(prevExpression => prevExpression + num);
    }

    function updateResult() {
        console.log(expression);
        try {
            const result = math.evaluate(expression);
            if (typeof result === "number" && !isNaN(result)) {
                setScreenVal(Number(result).toFixed(4));
                setOutputVisibility("show");
            } else {
                setScreenVal("Error: Invalid expression");
                setOutputVisibility("hide");
            }
        } catch (error) {
            setScreenVal("Error: Invalid expression");
            setOutputVisibility("hide");
        }
    }
 
    function checkInput(input) {
        switch (input.action) {
            case "clear":
                clearScreen();
                break;
            case "delete":
                backspace();
                break;
            case "result":
                showResult();
                break;
            default:
                calculate(input.content);
                break;
        }
    }

    return (
        <div className="calculator">
            <div className="screen">
                <div className="input">{expression}</div>
                <div className="output" show={outputVisibility}>{screenVal}</div>
            </div>
            <div className="body">
                { numpad.map(
                    (input) => (
                        <Button key={input.id} handler={() => checkInput(input)}>{input.content}</Button>
                    )
                )}
            </div>
        </div>
    );
}