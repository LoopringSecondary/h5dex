import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import DexRoutes from './dex/routes';
import AuthRoutes from './auth/routes';
import Face2FaceRoutes from './face2face/routes';
import SocketProvider from 'modules/sockets/Provider';
import Locales from './modules/locales/container'
import Test from './test'


function RouterConfig({ history }) {
  return (
    <SocketProvider>
      <Locales>
        <Router history={history}>
          <div>
            <AuthRoutes />
            <DexRoutes />
            <Face2FaceRoutes/>
          </div>
        </Router>
      </Locales>
    </SocketProvider>
  )
}
export default RouterConfig;
