import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import AuthByAddress from './address/AuthByAddress'
import AuthByLoopr from './loopr/AuthByLoopr'
import AuthByImtoken from './imtoken/AuthByImtoken'
import AuthByMock from './mock/AuthByMock'

const routes = ()=>{
 return (
  <Switch>
     <Route path={`/auth`} exact component={AuthByAddress} />
     <Route path={`/auth/mock`} exact component={AuthByMock} />
     <Route path={`/auth/loopr`} exact component={AuthByLoopr} />
     <Route path={`/auth/imtoken`} exact component={AuthByImtoken} />
     <Route path={`/auth/address`} exact component={AuthByAddress} />
   </Switch>
 )
}
export default routes







