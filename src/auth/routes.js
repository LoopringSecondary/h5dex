import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import AuthByLoopr from './loopr/AuthByLoopr'
import AuthByImtoken from './imtoken/AuthByImtoken'
import AuthByMock from './mock/AuthByMock'
import Auth from './index.js'
import storage from 'modules/storage'

const UnLogged = ()=>{
  const isLogged = !!storage.wallet.getUnlockedAddress()
  if(isLogged){
    return <Redirect to="/dex" />
  }else{
    return (
      <Switch>
         <Route path={`/auth`} exact component={Auth} />
         <Route path={`/auth/mock`} exact component={AuthByMock} />
         <Route path={`/auth/loopr`} exact component={AuthByLoopr} />
         <Route path={`/auth/imtoken`} exact component={AuthByImtoken} />
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




