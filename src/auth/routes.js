import React from 'react'
import { Link, Redirect, Route, Switch } from 'dva/router'
import AuthByLoopr from './loopr/AuthByLoopr'
import AuthByImtoken from './imtoken/AuthByImtoken'
import AuthByMock from './mock/AuthByMock'
import Auth from './index.js'
import storage from 'modules/storage'
import Privacy from './terms/Privacy'
import Terms from './terms/Terms'

const UnLogged = ()=>{
  const isLogged = !!storage.wallet.getUnlockedAddress()
  if(false){
    return <Redirect to="/dex" />
  }else{
    return (
      <Switch>

         <Route path={`/auth`} exact component={Auth} />
         <Route path={`/auth/mock`} exact component={AuthByMock} />
         <Route path={`/auth/loopr`} exact component={AuthByLoopr} />
         <Route path={`/auth/imtoken`} exact component={AuthByImtoken} />
         <Route path={`/auth/terms`} exact component={Terms} />
        <Route path={`/auth/privacy`} exact component={Privacy} />
       </Switch>
    )
  }
}
const Logged = ()=>{
  const isLogged =  !!storage.wallet.getUnlockedAddress()
  if(isLogged){
    return <Redirect to="/dex" />
  }else{
    return <Redirect to="/auth" />
  }
}
export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Switch>
        <Route path={`/auth`}  component={UnLogged} />
      </Switch>
    );
  }
}




