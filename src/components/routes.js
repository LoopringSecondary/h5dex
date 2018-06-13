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
import My from './orders/My'
import MyOrders from './tickers/Orders'
import ListNotifications from './tickers/ListNotifications'
import ListTokens from './tokens/ListTokens'
import TokenDetail from './tokens/TokenDetail'
import ConvertForm from './tokens/ConvertForm'
import PlaceOrderP2P from './orders/PlaceOrderP2P'

const UnLogged = ()=>{
  const isLogged = !!window.WALLET && !!window.WALLET.address
  if(isLogged){
    return <Redirect to="/wallet" />
  }else{
    return (
      <Switch>
        <Route path="/home" component={Pages.HomeTabBar} />
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
        <Route path="/" exact component={Pages.HomeTabBar} />
        <Route path="/tokens" exact component={ListTokens} />
        <Route path="/tokenDetail" exact component={TokenDetail} />
        <Route path="/convert" exact component={ConvertForm} />
        <Route path="/home" exact component={Pages.HomeTabBar} />
        <Route path="/home/tabbar" exact component={Pages.HomeTabBar} />
        <Route path="/home/tabs" exact component={Pages.HomeTabs} />
        <Route path={`/wallet`} component={Pages.Wallet} />
        <Route path="/placeOrder/p2p" exact component={PlaceOrderP2P} />
        <Route path="/placeOrder/simple" exact component={Orders.PlaceOrderFormSimple} />
        <Route path="/placeOrder/stand" exact component={Orders.PlaceOrderFormStand} />
        <Route path="/placeOrder/convert" exact component={Orders.PlaceOrderConvertForm} />
        <Route path="/trade/detail" exact component={Tickers.Detail} />
        <Route path="/my" exact component={My} />
        <Route path="/orders/detail" exact component={Orders.Detail} />
        <Route path="/orders" exact component={MyOrders} />
        <Route path="/notifications" exact component={ListNotifications} />
        { false && <Route path="/trade/:market" component={Pages.Trade} /> }
        { false && <Route path="/trade" exact component={Pages.Trade} /> }
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
            <Route path="/tokens" component={Logged} />
            <Route path="/tokenDetail" component={Logged} />
            <Route path="/convert" component={Logged} />
            <Route path="/home" component={Logged} />
            <Route path="/unlock" component={Logged} />
            <Route path="/wallet" render={Logged} />
            <Route path="/placeOrder" render={Logged} />
            <Route path="/placeOrderSimple" render={Logged} />
            <Route path="/placeOrderStand" render={Logged} />
            <Route path="/trade" render={Logged} />
            <Route path="/orders" render={Logged} />
            <Route path="/my" render={Logged} />
            <Route path="/notifications" render={Logged} />
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




