import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import Pages from './pages';
import Orders from './orders';
import Tokens from './tokens';
import Markets from './tickers/Markets';
import MarketDetail from './tickers/Detail';
import Convert from './tokens/ConvertForm'
import PlaceOrder from './orders/PlaceOrderPage'
import UserCenter from './account/UserCenter'
import ListTodos from './notifications/ListTodos'
import Face2FacePage from '../face2face/Face2FacePage'
import Face2FaceModals from '../face2face/Modals'
import CommonModals from '../components/Modals'
import storage from 'modules/storage'


const UnLogged = ()=>{
  const isLogged = !!storage.wallet.getUnlockedAddress()
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
  const isLogged =  !!storage.wallet.getUnlockedAddress()
  if(isLogged){
    return (
      <div>
        <Switch>
          <Route path={`/dex/markets`} exact component={Markets} />
          <Route path={`/dex/markets/:market`} component={MarketDetail} />
          <Route path={`/dex/placeOrder`} exact component={PlaceOrder} />
          <Route path={`/dex/placeOrder/:market`} exact component={PlaceOrder} />
          <Route path={`/dex/todos`} exact component={ListTodos} />
          <Route path={`/dex/usercenter`} exact component={UserCenter} />
          <Route path={`/dex/convert`} exact component={Convert} />
          <Route path={`/dex/face2face`} exact component={Face2FacePage} />
          <Route path={`/dex/messages`} exact component={Pages.Todo} />
          <Route path={`/dex/myOrders`} exact component={Orders.ListMyOrders} />
          <Route path={`/dex/myFills`} exact component={Pages.Todo} />
          <Route path={`/dex/settings`} exact component={Pages.Todo} />
          <Redirect from="/dex" to="/dex/markets" />
        </Switch>
        <CommonModals />
        <Orders.Modals />
        <Tokens.Modals />
        <Face2FaceModals />
      </div>
    )
  }else{
    return <Redirect to="/auth" />
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
      </Switch>
    );
  }
}




