import {useEffect} from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login.js'
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'

const promise = loadStripe('pk_test_51I7xlyAkZiPHiocx1AqDg81GffkWdR7UQyQI4hx8pzUP6Z5ffHwAGL3pL3yEQ2mUiWGhUMFvcut7vJkmJCbhAGzK00h3DGqs0o');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when component loads
    auth.onAuthStateChanged(authUser => {
      console.log('USER>>> ',authUser);

      if(authUser) {
        //the user is logged in/ was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        //the user logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

        <Route path='/login'>
          <Login />
        </Route>

          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>

          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/orders'>
            <Orders />
          </Route>

          <Route path='/'>
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
