import { useEffect } from "react";

export default function Button (props) {

    useEffect(() => {
        window.addEventListener('keypress', (e) => {
            e.key === props.children && props.handler();
        });
    }, [])
    
    return (
        <button onClick={() => props.handler()}>
            { props.children }
        </button>
    )
}