import React from 'react';

const Weather = (props) => {
    return(
        <div>
            <div className="inner-container">
                <h1>{props.city}</h1>
                <i className={`wi ${props.icon}`}></i>
                {props.celcius?
                <h1>
                    {props.celcius}&deg;
                </h1>
                :null}
                {/* Min Max Values*/}
                {(props.temp_max&&props.temp_min)?minmaxTemp(props.temp_min,props.temp_max):null}
                <h4>{props.description}</h4>
            </div>
        </div>
    )
}
function minmaxTemp(min,max){
    return(
        <h3>
            <span>
                {min}&deg;
            </span>
            <span>
                {max}&deg;
            </span>
        </h3>
    );
}
export default Weather;     
