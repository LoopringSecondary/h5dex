import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal';
import { TabBar,NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import UserCenter from '../account/UserCenter';
import Markets from '../tickers/Markets';
import PlaceOrder from '../orders/PlaceOrderPage';
import HelperOfDepth from '../orders/HelperOfDepth';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {match,location} = this.props;
    const {url} = match;
    const {pathname} = location;
    const changeTab = (path) => {
      routeActions.gotoPath(`${url}/${path}`);
    }
    return (
      <div style={{height:'100vh',overflow:'none' }}>
        <div className="" style={{height:'7vh'}}>
          <div className="bg-white" style={{width:'100%',height:'100%'}}></div>
        </div>
        <div className="row no-gutters ml0 mr0">
          <div className="col-auo p5" style={{height:'93vh',width:'22vw'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <PlaceOrder location={location} match={match} />
            </div>
          </div>
          <div className="col-auto p5" style={{height:'93vh',width:'22vw'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <NavBar
                className="bg-white"
                mode="light"
                onLeftClick={() => routeActions.goBack()}
                leftContent={null && [
                  <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
                ]}
                rightContent={null && [
                  <span className="color-black-1 " onClick={()=>{}}><WebIcon key="1" type="info-circle-o" /></span>
                ]}
              >
                <div className="color-black">OrderBook</div>
              </NavBar>
              <div className="divider 1px zb-b-t"></div>
              <HelperOfDepth />
            </div>
          </div>
          <div className="col-auto p5" style={{height:'93vh',width:'34vw'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <NavBar
                className="bg-white"
                mode="light"
                onLeftClick={() => routeActions.goBack()}
                leftContent={null && [
                  <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
                ]}
                rightContent={null && [
                  <span className="color-black-1 " onClick={()=>{}}><WebIcon key="1" type="info-circle-o" /></span>
                ]}
              >
                <div className="color-black">Kline Charts</div>
              </NavBar>
              <div className="divider 1px zb-b-t"></div>
              
            </div>
          </div>
          <div className="col-auto p5" style={{height:'93vh',width:'22vw'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <NavBar
                className="bg-white"
                mode="light"
                onLeftClick={() => routeActions.goBack()}
                leftContent={null && [
                  <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
                ]}
                rightContent={null && [
                  <span className="color-black-1 " onClick={()=>{}}><WebIcon key="1" type="info-circle-o" /></span>
                ]}
              >
                <div className="color-black">Trade History</div>
              </NavBar>
              <div className="divider 1px zb-b-t"></div>
              <HelperOfDepth />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Home
