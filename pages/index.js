import Head from 'next/head'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import Slider from '../components/slider/Slider'
import Stores from '../components/stores/Stores'
import auth from '../api/auth'
import { connect } from 'react-redux'
import { $Async } from '../redux/async_actions'
import { self } from '../api/instance'
function Home() {
  // for fast test login and logout functionality

  async function login() {
    await auth.login({ 'email': 'habibmisi3@gmail.com', 'password': 'gh090807' });
    $Async.Reauth();
  }
  async function adminLogin() {
    await auth.adminLogin({ 'email': 'habibmisi3@gmail.com', 'password': 'gh090807' });
    $Async.Reauth();
  }
  async function logout() {
    await auth.logout().then(res => console.log(res));
    $Async.Reauth();
  }
  async function adminLogout() {
    await auth.adminLogout().then(res => console.log(res));
    $Async.Reauth();
  }
  function testAuth() {
    auth.isAuthenticated().then(res => console.log(res));
  }
  function getCookie() {
    auth.getKey().then(res => console.log(res));
  }
  function clearTokens() {
    auth.clearAllTokens().then(res => console.log(res));
  }
  function registerAdmin() {
    auth.adminRegister({ 'name': 'Habib', 'email': 'admin@gmail.com', 'password': 'tp060504' })
  }
  async function test() {
    const r = await self.post('/get_user_info');
    console.log(r);
  }
  return (
    <>
      <Head>
        <title>Mall</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <Stores />
      <Categories />
      <Products
        title="Latest"
      />
      <Products
        title="Men"
      />
      <Products
        title="Women Fashion"
      />
      <button onClick={login} className="btn btn-primary">Login</button>
      <button onClick={logout} className="btn btn-primary">Logout</button>
      <button onClick={registerAdmin} className="btn btn-primary">Register as admin</button>
      <button onClick={adminLogin} className="btn btn-primary">Login as admin</button>
      <button onClick={adminLogout} className="btn btn-primary">Logout as admin</button>
      <button onClick={testAuth} className="btn btn-primary">I am authenticated</button>
      <button onClick={getCookie} className="btn btn-primary">get cookie</button>
      <button onClick={clearTokens} className="btn btn-primary">clear all tokens</button>
      <button onClick={test} className="btn btn-primary">test</button>
    </>
  )
}

const mapStateToProps = state => ({
  authenticated: state.main.authenticated,
  router: state.router,
});

export default connect(mapStateToProps)(Home);