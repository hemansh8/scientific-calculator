import Delete from '../../public/backspace-fill-svgrepo-com.svg';
import SizeUp from '../../public/resize-up-svgrepo-com.svg';
import SizeDown from '../../public/resize-down-svgrepo-com.svg';
import Image from 'next/image';

export const numpad = [
    {
        id: "clear",
        content: "AC",
        action: "clear"
    },
    {
        id: "delete",
        content: <Image src={Delete} alt='delete'/>,
        action: "delete"
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
        action: 'resize'
    },
    {
        id: "resize-down",
        content: <Image src={SizeDown} alt='size down'/>,
        action: 'resize'
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
        action: "result"
    }
];