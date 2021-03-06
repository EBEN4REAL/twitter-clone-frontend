import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import React from 'react';
import './App.css';
import Users from './components/Users';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/LandingPage';
import {setContext} from "apollo-link-context"
import Signup from './components/Pages/Signup';
import Login from './components/Pages/Login';
import IsAuthenticated from './components/IsAuthenticated';
import Profile from './components/Pages/Profile';

const httpLink = new HttpLink({uri: 'http://localhost:4000'})

const authLink = setContext(async(req, {headers}) => {
  const token = localStorage.getItem('token')

  return {
    ...headers,
    headers: {
      Authorization: token ? `bearer ${token}`  : null
    }
  }
})

const link = authLink.concat(httpLink as  any)
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache()
})

let name: string = "Eben"
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/landing" exact>
            <Landing />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <IsAuthenticated>
            <Route path="/profile" exact>
              <Profile />
            </Route>
          </IsAuthenticated>
          <IsAuthenticated>
            <Route path="/users" exact>
              <Users />
            </Route>
          </IsAuthenticated>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
    
  );
}

export default App;
