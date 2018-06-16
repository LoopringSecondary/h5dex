import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import Pages from './pages';
import Tokens from './tokens';
import Transactions from './transactions';
import Account from './account';
import Setting from './setting';
import UnlockModals from './account/unlock/Modals'
import ListTokens from './tokens/ListTokens'
import TokenDetail from './tokens/TokenDetail'
import ConvertForm from './tokens/ConvertForm'
import Todo from './pages/Todo'
import Send from './tokens/TransferForm'
import Send2 from './tokens/TransferForm2'

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
        <Route path="/todo" exact component={Todo} />
        <Route path="/dapp/convert" exact component={ConvertForm} />
        <Route path="/wallet/send" exact component={Send2} />
        <Route path="/wallet/send2" exact component={Send} />
        <Route path="/wallet/transfer" exact component={Send} />
        <Route path="/wallet/receive" exact component={Todo} />
        <Route path="/wallet/scan" exact component={Todo} />
        <Route path="/wallet" component={Pages.Wallet} />
        <Route path="/tokens" exact component={ListTokens} />
        <Route path="/tokenDetail" exact component={TokenDetail} />
        <Redirect path={`/`} to={`/wallet`}/>
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
            <Route path="/dapp" component={Logged} />
            <Route path="/wallet" render={Logged} />
            <Route path="/trade" render={Logged} />
            <Route path="/todo" render={Logged} />
            <Route path="/token" component={Logged} />
            <Route path="/tokens" component={Logged} />
            <Route path="/tokenDetail" component={Logged} />
            <Route path="/convert" component={Logged} />
            <Route path="/unlock" component={Logged} />
            <Route path="/dev" exact component={Pages.Test} />
          </Switch>
      </div>
    );
  }
}




