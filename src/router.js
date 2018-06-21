import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import WalletRoutes from './wallet/routes';
import DexRoutes from './dex/routes';
import SocketProvider from 'modules/sockets/Provider';
import Locales from './modules/locales/container'
import Loopr from './loopr/routes'
import Imtoken from './imtoken/routes'
import Test from './test'

function RouterConfig({ history }) {
  return (
    <SocketProvider>
      <Locales>
      <Router history={history}>
        <div>
          <WalletRoutes />
          <DexRoutes />
          <Route path="/test" exact component={Test}/>
          <Route path="/loopr" exact component={Loopr}/>
          <Route path="/imtoken" exact component={Imtoken}/>
        </div>
      </Router>
      </Locales>
    </SocketProvider>
  )
}
export default RouterConfig;
