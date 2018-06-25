import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import AuthByAddress from './address/AuthByAddress'
import AuthByLoopr from './loopr/AuthByLoopr'
import AuthByImtoken from './imtoken/AuthByImtoken'

const routes = ()=>{
  const walletType = ''
  const url = 'auth'
  switch (walletType) {
      case 'imtoken':
        return (
          <Switch>
            <Route path={`/${url}/imtoken`} exact component={AuthByImtoken} />
            <Redirect to={`/${url}/imtoken`} />
          </Switch>
        )
        break;
      case 'loopr':
        return (
          <Switch>
            <Route path={`/${url}/loopr`} exact component={AuthByLoopr} />
            <Redirect to={`/${url}/loopr`} />
          </Switch>
        )
        break;
      default:
        return (
          <Switch>
            <Route path={`/${url}/address`} exact component={AuthByAddress} />
            <Redirect to={`/${url}/address`} />
          </Switch>
        )
      break;
    }
}
export default routes







