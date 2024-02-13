import Backspace from '../../public/backspace-fill-svgrepo-com.svg';
import SizeUp from '../../public/resize-up-svgrepo-com.svg';
import SizeDown from '../../public/resize-down-svgrepo-com.svg';
import Image from 'next/image';

export const regular = [
    {
        id: "delete",
        content: "AC",
        action: true
    },
    {
        id: "backspace",
        content: <Image src={Backspace} alt='backspace'/>,
        action: true
    },
    {
        id: "percentage",
        content: "%"
    },
    {
        id: "divide",
        content: "/"
    },
    {
        id: "7",
        content: "7"
    },
    {
        id: "8",
        content: "8"
    },
    {
        id: "9",
        content: "9"
    },
    
    {
        id: "multiply",
        content: "*"
    },
    {
        id: "4",
        content: "4"
    },
    {
        id: "5",
        content: "5"
    },
    
    {
        id: "6",
        content: "6"
    },
    {
        id: "subtract",
        content: "-"
    },
    {
        id: "1",
        content: "1"
    },
    {
        id: "2",
        content: "2"
    },
    {
        id: "3",
        content: "3"
    },
    {
        id: "plus",
        content: "+"
    },
    {
        id: "resize-up",
        content: <Image src={SizeUp} alt='size up'/>,
        action: true
    },
    {
        id: "resize-down",
        content: <Image src={SizeDown} alt='size down'/>,
        action: true
    },
    {
        id: "0",
        content: "0"
    },
    {
        id: "period",
        content: "."
    },
    {
        id: "result",
        content: "=",
        action: true
    }
];

export const special = [
    {
        id: "degree",
        content: "DEG",
        action: true
    },
    {
        id: "radian",
        content: "RAD",
        action: true
    },
    {
        id: "inverse",
        content: "INV",
        action: true
    },
    {
        id: "factorial",
        content: "n!",
        action: false,
        expression: "!" 
    },
    {
        id: "sin",
        content: "sin",
        action: false,
        expression: "sin("
    },
    {
        id: "cos",
        content: "cos",
        action: false,
        expression: "cos("
    },
    {
        id: "acos",
        content: "acos",
        action: false,
        expression: "acos("
    },
    {
        id: "tan",
        content: "tan",
        action: false,
        expression: "tan("
    },
    {
        id: "atan",
        content: "atan",
        action: false,
        expression: "atan("
    },
    {
        id: "log",
        content: "log",
        action: false,
        expression: "log("
    },
    {
        id: "antilog",
        content: <>10<sup>x</sup></>,
        action: false,
        expression: "10^"
    },
    {
        id: "square",
        content: <>x<sup>2</sup></>,
        action: false,
        expression: "^2"
    },
    {
        id: "square-root",
        content: "sqrt",
        action: false,
        expression: "sqrt("
    },
    {
        id: 'pi',
        content: 'pi'
    },
    {
        id: "bracket-open",
        content: "("
    },
    {
        id: "bracket-close",
        content: ")"
    }
];