import React from 'react';
import {Switch, Redirect} from 'dva/router';
import {message} from 'antd'
import MockWallet from './MockWallet'

export default function Routes({match,location}) {

  const {params} = match;
  console.log('mock',params)
  if(params && params.pk){
    window.Wallet = new MockWallet(params.pk)
  }else{
    message.warn('please provide with your private key')
  }
  return (
    <Switch>
      <Redirect from="/mock" to="/dex"/>
    </Switch>
  );
}
