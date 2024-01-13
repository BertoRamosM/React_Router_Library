import { useEffect } from "react";
import "./App.css";
import ProfilePicture from "./assets/images/73201347.jpg";
import { useState } from "react";

const NAVIGATION_EVENT = 'pushState';

function navigate(href) {
  window.history.pushState({}, "", href)

  //custom event
  const navigationEvent = new Event('pushstate')
  window.dispatchEvent(navigationEvent)
}

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Home page for our React Router</p>
      <button onClick={() => navigate("/about")}>About</button>{" "}
    </>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src={ProfilePicture} alt="profile picture of Bertus" />
        <p>Hi! Im Bertus and this is a clone of React Router</p>
        <button onClick={()=>navigate('/')}>Home</button>
      </div>
    </>
  );

}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener(NAVIGATION_EVENT, onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
    }
  },[])

  return (
      <main>
        {currentPath === '/' && <HomePage />}
        {currentPath === '/about' && <AboutPage />}
      </main>
  );
}

export default App;
