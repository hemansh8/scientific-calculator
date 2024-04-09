import React, { useState, useEffect, useRef } from "react";
import * as math from "mathjs";
import { regular, special } from "@/lib/numpad";
import Button from "./button";

export default function Calculator() {
    const [expression, setExpression] = useState("0");
    const [screenVal, setScreenVal] = useState("0");
    const [outputVisibility, setOutputVisibility] = useState("hide");
    const [resultFocus, setResultFocus] = useState(false);
    const [defaultOperators, setDefaultOperators] = useState(true);
    const [collapsed, setCollapsed] = useState(true);

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

    function inverse() {
        setDefaultOperators(prevView => !prevView);
    }

    function changeAngle() {
        setMode(mode === "rad" ? "deg" : "rad");
    }

    function toggleSpecial() {
        setCollapsed(prevCollapsed => !prevCollapsed);
    }

    function calculate(num) {
        setExpression(prevExpression => prevExpression === "0" ? num : prevExpression + num);
    }

    function degree(x) {
        return function (y) {
            return math[x](y * 180 / Math.PI);
        };
      }

      function inverseDegree(x) {
        return function (y) {
            return math[x](y) * Math.PI / 180;
        };
      }

    function updateResult() {
        try {
            const allVariables = {
                sin: mode === "rad" ? math.sin : degree('sin'),
                cos: mode === "rad" ? math.cos : degree('cos'),
                tan: mode === "rad" ? math.tan : degree('tan'),
                asin: mode === "rad" ? math.asin : inverseDegree('asin'),
                acos: mode === "rad" ? math.acos : inverseDegree('acos'),
                atan: mode === "rad" ? math.atan : inverseDegree('atan'),
            };
            const result = math.evaluate(expression, allVariables);
            if (expression === "0") {
                setOutputVisibility("hide");
                screenInput.current = "0";
            } else if (typeof result === "number" && !isNaN(result)) {
                setScreenVal(Number(result).toFixed(2));
                setOutputVisibility("show");
                screenInput.current = expression;
            } else {
                setScreenVal("Error: Invalid expression");
                setOutputVisibility("hide");
                screenInput.current = expression;
            }

            if (resultFocus) {
                setResultFocus(false);
            }
        } catch (error) {
            setScreenVal("Error: Invalid expression");
            setOutputVisibility("hide");
            screenInput.current = expression;
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
            case "inverse":
                inverse();
                break;
            case "angle":
                changeAngle();
                break;
            case "resize-up":
            case "resize-down":
                toggleSpecial();
                break;
            default:
                calculate(input);
                break;
        }
    }

    return (
        <div className="calculator">
            <p className="mode">
                {mode}
            </p>
            <div className="screen" data-mode={resultFocus}>
                <div className="input">{expression}</div>
                <div className="output" show={outputVisibility}>{screenVal}</div>
            </div>
            <div className="body">
                <div className="special" data-visible={!collapsed}>
                    { special.map(
                        (input) => {
                            const value = input.action === true ? input.id : input.action === false ? input.expression : input.content;
                            const visibility = input.visible ? input.visible === "default" ? defaultOperators : !defaultOperators : null;
                            const content = input.angle ? mode.toUpperCase() : input.content;
                            return (
                                <Button key={input.id} handler={() => checkInput(value)} visibility={visibility}>{content}</Button>
                            )
                        }
                    )}
                </div>
                <div className="regular">
                    { regular.map(
                        (input) => {
                            const value = input.action === true ? input.id : input.action === false ? input.expression : input.content;
                            const visibility = input.visible ? input.visible === "default" ? collapsed : !collapsed : null;
                            return (
                                <Button key={input.id} handler={() => checkInput(value)} visibility={visibility}>{input.content}</Button>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
}