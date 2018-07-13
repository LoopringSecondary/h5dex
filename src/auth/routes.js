import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import AuthByAddress from './address/AuthByAddress'
import AuthByLoopr from './loopr/AuthByLoopr'
import AuthByImtoken from './imtoken/AuthByImtoken'
import AuthByMock from './mock/AuthByMock'
import storage from 'modules/storage'

const UnLogged = ()=>{
  const isLogged = !!storage.wallet.getUnlockedAddress()
  if(isLogged){
    return <Redirect to="/dex" />
  }else{
    return (
      <Switch>
         <Route path={`/`} exact component={AuthByAddress} />
         <Route path={`/auth`} exact component={AuthByAddress} />
         <Route path={`/auth/mock`} exact component={AuthByMock} />
         <Route path={`/auth/loopr`} exact component={AuthByLoopr} />
         <Route path={`/auth/imtoken`} exact component={AuthByImtoken} />
         <Route path={`/auth/address`} exact component={AuthByAddress} />
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
        <Route path={`/`}  component={UnLogged} />
        <Route path={`/auth`}  component={UnLogged} />
      </Switch>
    );
  }
}




