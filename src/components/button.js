// import { useEffect } from "react";

export default function Button (props) {
    return (
        <button onClick={() => props.handler()} data-visible={props.visibility}>
            { props.children }
        </button>
    )
}