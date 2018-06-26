import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import AuthByAddress from './address/AuthByAddress'
import AuthByLoopr from './loopr/AuthByLoopr'
import AuthByImtoken from './imtoken/AuthByImtoken'
import AuthByMock from './mock/AuthByMock'

const routes = ()=>{
  const walletType = 'mock'
  switch (walletType) {
      case 'mock':
        return (
          <Switch>
            <Route path={`/auth`} exact component={AuthByMock} />
            <Route path={`/auth/mock`} exact component={AuthByMock} />
          </Switch>
        )
        break;
      case 'imtoken':
        return (
          <Switch>
            <Route path={`/auth`} exact component={AuthByImtoken} />
            <Route path={`/auth/imtoken`} exact component={AuthByImtoken} />
          </Switch>
        )
        break;
      case 'loopr':
        return (
          <Switch>
            <Route path={`/auth`} exact component={AuthByLoopr} />
            <Route path={`/auth/loopr`} exact component={AuthByLoopr} />
          </Switch>
        )
        break;
      default:
        return (
          <Switch>
            <Route path={`/auth`} exact component={AuthByAddress} />
            <Route path={`/auth/address`} exact component={AuthByAddress} />
          </Switch>
        )
      break;
    }
}
export default routes







