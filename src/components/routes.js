import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import Pages from './pages';
import Tokens from './tokens';
import Orders from './orders';
import Fills from './fills';
import Transactions from './transactions';
import Account from './account';
import Tickers from './tickers';
import Setting from './setting';
import Tools from './tools';
import UnlockModals from './account/unlock/Modals'

const UnLogged = ()=>{
  const isLogged = !!window.WALLET && !!window.WALLET.address
  if(isLogged){
    return <Redirect to="/wallet" />
  }else{
    return (
      <Switch>
        <Route path="/" exact component={Pages.Home} />
        <Route path="/home" component={Pages.Home} />
        <Route path="/unlock" component={Pages.Unlock} />
      </Switch>
    )
  }
}
const Logged = ()=>{
  // const isLogged =  !!window.WALLET && !!window.WALLET.address
  const isLogged = true
  if(isLogged){
    return (
      <Switch>
        <Route path={`/wallet`} component={Pages.Wallet} />
        <Route path="/placeOrder" exact component={Orders.PlaceOrderForm} />
        <Route path="/placeOrderSimple" exact component={Orders.PlaceOrderFormSimple} />
        <Route path="/placeOrderStand" exact component={Orders.PlaceOrderFormStand} />
        <Route path="/trade/:market" component={Pages.Trade} />
        <Route path="/trade" exact component={Pages.Trade} />
      </Switch>
    )
  }else{
    return <Redirect to="/home" />
  }
}

export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
          <Switch>
            <Route path="/" exact component={Logged} />
            <Route path="/home" component={Logged} />
            <Route path="/unlock" component={Logged} />
            <Route path="/wallet" render={Logged} />
            <Route path="/placeOrder" render={Logged} />
            <Route path="/placeOrderSimple" render={Logged} />
            <Route path="/placeOrderStand" render={Logged} />
            <Route path="/trade" render={Logged} />
            <Route path="/dev" exact component={Pages.Test} />
          </Switch>
          <Orders.Modals />
          <Fills.Modals />
          <Transactions.Modals />
          <Tokens.Modals />
          <Account.Modals />
          <Setting.Modals />
          <Tickers.Modals />
          <UnlockModals />
      </div>
    );
  }
}




