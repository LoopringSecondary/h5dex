import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import Pages from './pages';
import ListNotifications from './tickers/ListNotifications'

const UnLogged = ()=>{
  const isLogged = !!window.WALLET && !!window.WALLET.address
  if(isLogged){
    return <Redirect to="/wallet" />
  }else{
    return (
      <Switch>
        <Route path="/home" component={Pages.Todo} />
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
        <Route path={`/`} exact component={Pages.Home} />
        <Route path={`/home`} exact component={Pages.Home} />
        <Route path={`/myOrders`} exact component={My} />
        <Route path={`/myFills`} exact component={My} />
        <Route path={`/settings`} exact component={My} />
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
    const {match,location} = this.props;
    // const {url} = match;
    const url = ""
    return (
      <Switch>
        <Route path={`/`} exact component={Loged} />
        <Route path={`/Home`} exact component={Loged} />
        <Route path={`/myOrders`} component={Loged} />
        <Route path={`/myFills`} exact component={Loged} />
        <Route path={`/settings`} exact component={Loged} />
      </Switch>
    );
  }
}




