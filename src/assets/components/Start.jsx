import React from "react";

function Start(props) {
    return (
        <div className="div-test">
            <h2>Quizzical</h2>
            <span>Some description if needed</span>
            <button
                onClick={props.start}
            >Start quiz</button>
        </div>
    )
}

export default Start