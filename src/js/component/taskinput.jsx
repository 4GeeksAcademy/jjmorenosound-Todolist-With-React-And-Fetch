import React from "react";
import { useState } from "react";

export let TaskInput = (props) => {
    return (
        <input 
            type="text" 
            className="form-control col-6" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default" 
            value={props.value} 
            onChange={props.onChange}
        />
    );
};