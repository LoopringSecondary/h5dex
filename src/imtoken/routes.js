import React from 'react';
import {Switch, Redirect} from 'dva/router';
import Imtoken from './Imtoken'


export  default function Routes() {

  if(window.imToken) {
   window.Wallet = new Imtoken(window.imToken);
    window.imToken.callAPI('native.alert', 'winner winner, chicken dinner！')
  } else {
    window.addEventListener('sdkReady', function() {
      window.Wallet = new Imtoken(window.imToken)
      window.imToken.callAPI('native.alert', 'winner winner, chicken dinner！')
    })
  }

  return (
    <Switch>
      <Redirect from="/imtoken" to="/test"/>
    </Switch>
  );


}
