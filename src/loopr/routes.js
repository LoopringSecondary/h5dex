import React from 'react';
import {Switch, Redirect} from 'dva/router';
import Loopr from './loopr'

export default function Routes() {

  window.Wallet = new Loopr();
  return (
    <Switch>
      <Redirect from="/loopr" to="/dex"/>
    </Switch>
  );
}
