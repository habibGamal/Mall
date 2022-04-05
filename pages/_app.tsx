import React, { useEffect, useState } from 'react';
import Nav from '../components/main/Nav';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/scss/bootstrap.scss';
if (typeof window !== "undefined") {
  require("jquery");
  require("popper.js");
  require("bootstrap");
}
import '../styles/style.scss'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store';
import Authenticating from '../directives/Authenticating';
import DefineRouter from '../directives/DefineRouter';
import Messages from '../components/messages/Messages';
import Popup from '../components/popup/Popup';
import AuthForm from '../components/popup/AuthForm';
import Loading from '../directives/Loading';

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [])
  return (
    <React.StrictMode>
      <Loading state={loaded}>
        <Provider store={store}>
          <Authenticating>
            <DefineRouter>
              <Messages />
              <header>
                <Nav />
                <Popup keyPopup="auth-form">
                  <AuthForm keyPopup="auth-form" />
                </Popup>
              </header>
              <Component {...pageProps} />
            </DefineRouter>
          </Authenticating>
        </Provider>
      </Loading>
    </React.StrictMode>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);
export default wrapper.withRedux(MyApp);