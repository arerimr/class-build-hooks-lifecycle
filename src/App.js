import { useState, useEffect } from "react";
import days from "./data";
const colors = [
  "papayawhip",
  "blanchedalmond",
  "peachpuff",
  "bisque",
  "cornsilk",
  "lightyellow",
];

function App() {
  const [color, setColor] = useState("lemonchiffon");
  const [dog, setDog] = useState({});
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(0);
  const [today, setToday] = useState({});
  const [vibe, setVibe] = useState("");


  //function that does not update state on a component mounting (ex: page load)

  // function getData(){
  //   console.log("i'm getting data")
  // }

  useEffect(()=>{
    setNumber(Math.floor(Math.random()* 100))
    // getData()
  }, [])

  // Multiple useEffects
  
  useEffect(()=>{
    setToday(days[index])
    //set dependency that is dependant on the useEffect
  }, [index])

  function handleOnChange(event) {
    setVibe(event.target.value);
  }
  
  useEffect(()=>{
    console.log(vibe)
  }, [vibe])

//color changes when month changes

  useEffect(()=>{
    setColor(colors[index])
  },[today.month, index])

  function getFeaturedDog(){
   let dogUrl = `https://dog.ceo/api/breeds/image/random`

   fetch(dogUrl)
   .then((res)=> res.json())
   .then((x)=>setDog(x))
   .catch((e)=> console.log(e))
  }

  useEffect(()=>{
    getFeaturedDog()
  }, [])



  function updateIndex() {
    setIndex((index + 1) % days.length);
  }

  return (
    <div className="App">
      <header style={{ backgroundColor: color }}>
        <h1>Daily Home Page </h1>
        <button onClick={updateIndex}>Update Day</button>
      </header>
      <main>
        <div className="date">
          <h2>Todays date:</h2>
          <h3>{today.weekday}</h3>
          <h4>{today.month}</h4>
          <h5>{today.day}</h5>
        </div>
        <div className="lucky">
          <h2>Today's lucky number is: {number}</h2>
        </div>
        <div className="vibe">
          <input type="text" onChange={handleOnChange} />
          <h4>Today's vibe is: </h4>
          <h5>{vibe}</h5>
        </div>
        <div className="dog">
          <button onClick={getFeaturedDog}>Change dog</button>
          <h2>Featured dog:</h2>
          <img src={dog.message} alt="Featured Dog" />
        </div>
      </main>
    </div>
  );
}

export default App;
