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
import { Provider } from 'react-redux'
import withRedux, { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store';
import Authenticating from '../directives/Authenticating';
import DefineRouter from '../directives/DefineRouter';
import Messages from '../components/messages/Messages';


function MyApp({ Component, pageProps }) {
  const [popup, setPopup] = useState(false);
  return (
    <Provider store={store}>
      <Authenticating>
        <DefineRouter>
          <Messages />
          <header>
            <Nav popup={popup} setPopup={setPopup} />
            <PopupForm active={popup} />
          </header>
            <Component {...pageProps} />
        </DefineRouter>
      </Authenticating>
    </Provider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);