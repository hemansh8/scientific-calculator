import React, { useState, useEffect, useRef } from "react";
import * as math from "mathjs";
import { regular, special } from "@/lib/numpad";
import Button from "./button";

export default function Calculator() {
    const [expression, setExpression] = useState("0");
    const [screenVal, setScreenVal] = useState("0");
    const [outputVisibility, setOutputVisibility] = useState("hide");
    const [resultFocus, setResultFocus] = useState(false);

    // const [customVariables, setCustomVariables] = useState({});
    // Default mode is "rad"
    const [mode, setMode] = useState("rad");
    useEffect(() => updateResult(), [expression]);
    useEffect(() => keyEvents(), []);

    const screenInput = useRef("0");

    const numpadValues = [...regular, ...special ].map((btn) => (
        btn.action === true ? btn.id : btn.action === false ? btn.expression : btn.content
    ));

    function clearScreen() {
        setExpression("0");
        setScreenVal("0");
    }

    function backspace() {
        let newExpression = screenInput.current.slice(0, -1);
        if (newExpression === "") {
            newExpression = "0";
        }
        setExpression(newExpression);
    }

    function showResult() {
        setOutputVisibility("show");
        setResultFocus(true);
    }

    function calculate(num) {
        setExpression(prevExpression => prevExpression === "0" ? num : prevExpression + num);
    }

    function updateResult() {
        try {
            const result = math.evaluate(expression);
            if (expression === "0") {
                setOutputVisibility("hide");
                screenInput.current = "0";
            } else if (typeof result === "number" && !isNaN(result)) {
                setScreenVal(Number(result).toFixed(4));
                setOutputVisibility("show");
                screenInput.current = result.toString();
            } else {
                setScreenVal("Error: Invalid expression");
                setOutputVisibility("hide");
            }

            if (resultFocus) {
                setResultFocus(false);
            }
        } catch (error) {
            setScreenVal("Error: Invalid expression");
            setOutputVisibility("hide");
        }
    }

    
    function keyEvents() {
        window.addEventListener('keydown', handleKeyEvents);
        return () => {
            window.removeEventListener('keydown', handleKeyEvents);
        }
    }

    function handleKeyEvents(e) {
        console.log(e.key.toLowerCase());
        const key = e.key.toLowerCase();
        key && numpadValues.indexOf(key) > -1 && checkInput(key);
    }

    function checkInput(input) {
        switch (input) {
            case "delete":
                clearScreen();
                break;
            case "backspace":
                backspace();
                break;
            case "result":
                showResult();
                break;
            default:
                calculate(input);
                break;
        }
    }

    return (
        <div className="calculator">
            <div className="screen" mode={resultFocus}>
                <div className="input">{expression}</div>
                <div className="output" show={outputVisibility}>{screenVal}</div>
            </div>
            <div className="body">
                <div className="special">
                    { special.map(
                        (input) => {
                            const value = input.action === true ? input.id : input.action === false ? input.expression : input.content;
                            return (
                                <Button key={input.id} handler={() => checkInput(value)}>{input.content}</Button>
                            )
                        }
                    )}
                </div>
                <div className="regular">
                    { regular.map(
                        (input) => {
                            const value = input.action === true ? input.id : input.action === false ? input.expression : input.content;
                            return (
                                <Button key={input.id} handler={() => checkInput(value)}>{input.content}</Button>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
}