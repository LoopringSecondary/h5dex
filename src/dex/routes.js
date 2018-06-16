import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import Pages from './pages';
import Orders from './orders';
import ListTodos from './notifications/ListTodos'

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
        <Route path={`/dex/myOrders`} exact component={Orders.ListMyOrders} />
        <Route path={`/dex/myFills`} exact component={Pages.Todo} />
        <Route path={`/dex/settings`} exact component={Pages.Todo} />
        <Route path={`/dex/todos`} exact component={ListTodos} />
        <Route path={`/dex/messages`} exact component={Pages.Todo} />
        <Route path={`/dex`} component={Pages.Home} />

      </Switch>
    )
  }else{
    return <Redirect to="/dex" />
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
        <Route path={`/dex`}  component={Logged} />
        {false && <Redirect from="/" to="/dex" />}
      </Switch>
    );
  }
}




