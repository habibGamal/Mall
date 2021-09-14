import { useState } from 'react';
import Nav from '../components/main/Nav';
import PopupForm from '../components/main/PopupForm';
import 'bootstrap/dist/css/bootstrap.min.css';
if (typeof window !== "undefined") {
  require("jquery");
  require("popper.js");
  require("bootstrap");
}
import '../styles/style.scss'

function MyApp({ Component, pageProps }) {
  
  const [popup,setPopup] = useState(false);
  return (
    <>
    <header>
        <Nav popup={popup} setPopup={setPopup} />
        <PopupForm active={popup} />
      </header>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
