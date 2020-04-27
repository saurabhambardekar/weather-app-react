import React from 'react';
import './App.css';
import "weather-icons/css/weather-icons.css";
import Weather from './app-component/weather';
import Form from './app-component/form';
import axios from 'axios';
const API_key="13dca4601562f6e4ac7bc529091176a2"


class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celcius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false,
      bgcolor:true,
      list:[],
    }
    this.weatherIcon={
      thunderstorm: "wi-thunderstorm",
      drizzle:"wi-sheet",
      rain:"wi-storm-showers",
      snow:"wi-snow",
      atmosphere:"wi-fog",
      clear:"wi-clear",
      clouds:"wi-day-fog"
      }
  } 
  

  kelvintocel(temp){
    let degCel = Math.floor(temp-273.15); 
    return degCel
  }
  getWeatherIcon(icons,rangeID){
    switch(true){
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.weatherIcon.thunderstorm})
        break;
      case rangeID>=300 && rangeID<=321:
        this.setState({icon:this.weatherIcon.drizzle})
        break;
      case rangeID>=500 && rangeID<=531:
        this.setState({icon:this.weatherIcon.rain})
        break;
      case rangeID>=600 && rangeID<=622:
        this.setState({icon:this.weatherIcon.snow})
        break;
      case rangeID>=701 && rangeID<=781:
        this.setState({icon:this.weatherIcon.atmosphere})
        break; 
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.weatherIcon.thunderstorm})
        break;
      case rangeID==800:
        this.setState({icon:this.weatherIcon.clear})
        break;
      case rangeID>=801 && rangeID<=804:
        this.setState({icon:this.weatherIcon.clouds})
        break;
      default:this.setState({icon:this.weatherIcon.clouds});
    }
  }

  getWeather = async (e) => {
    e.preventDefault();  
    const city=e.target.elements.city.value;
    const country=document.getElementById('select').value;  
    if(city&&country){
      const api_call = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();
      console.log(response)

      this.setState(
          {
          city:`${response.name},${response.sys.country}`, 
          celcius:this.kelvintocel(response.main.temp),
          temp_max:`Max: ${this.kelvintocel(response.main.temp_max)}`,
          temp_min:`Min : ${this.kelvintocel(response.main.temp_min)}`,
          description:response.weather[0].description,
        }
      )
      this.getWeatherIcon(this.weatherIcon,response.weather[0].id)  
    }else{
      this.setState({error:true});
      }

  }
  componentWillMount(){
    this.changeCountry()
  }
  changeCountry = async() => { 
    const api_call = await axios.get('https://restcountries.eu/rest/v2/all')
    const name = api_call.data.map(elements=>elements.name)
    this.setState({
      list:name,
    })
    console.log(this.state.list)
  }
  changeBg = () => {
    this.setState({bgcolor:!this.state.bgcolor})
  }
  render(){
    return( 


      <div className="App"  style={{backgroundColor:`${this.state.bgcolor?'#87CEEB':'#0C1445'}`}}>
        <button  onClick={this.changeBg} className="app-inner-btn" style={{backgroundColor:`${this.state.bgcolor?'#87CEEB':'#0C1445'}`, color:`${this.state.bgcolor?'#0C1445':'#87CEEB'}`, borderColor:`${this.state.bgcolor?'#0C1445':'#87CEEB'}`}}>{this.state.bgcolor?'Light':'Dark'}</button>
          <div className="App-inner">
            <select id="select" className="select">
              {this.state.list.map(element => {return(
                <option key={element} value="country" className="select-box">
                  {element}
                </option>
              )
              })} 
            </select>
            <Form loadWeather={this.getWeather} error={this.state.error} />
            <Weather 
            city={this.state.city} 
            country={this.state.country} 
            celcius={this.state.celcius} 
            temp_max={this.state.temp_max} 
            temp_min={this.state.temp_min} 
            description={this.state.description} 
            icon={this.state.icon}/>
        </div>
      </div>
    );
  }

}

export default App;
