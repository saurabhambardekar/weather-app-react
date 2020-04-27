import React from "react";
import '../app-component/form.css';
const Form = props => {
    return(
    <div className="form">
        <form onSubmit={props.loadWeather}>
        <div>
            <div>
                <input type="text" name="city" autoComplete="off" placeholder="City"/>
            </div>
            <div>
                <button>Get Weather</button>
            </div>
        </div>
        </form>
        
    </div>  
    )       
}

export default Form;