import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import WalletRoutes from './wallet/routes';
import DexRoutes from './dex/routes';
import SocketProvider from 'modules/sockets/Provider';
import Locales from './modules/locales/container'

function RouterConfig({ history }) {
  return (
    <SocketProvider>
      <Locales>
      <Router history={history}>
        <div>
          <WalletRoutes />
          <DexRoutes />
        </div>
      </Router>
      </Locales>
    </SocketProvider>
  )
}
export default RouterConfig;
