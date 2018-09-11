import React from 'react'
import {Redirect, Route, Switch } from 'dva/router'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import { TabBar } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import UserCenter from '../account/UserCenter'
import Markets from '../tickers/Markets'
import PlaceOrder from '../orders/PlaceOrderForm'

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
      <div style={{ }}>
              <Switch>
                <Route path={`${url}/markets`} exact component={Markets} />
                <Route path={`${url}/placeOrder`} exact component={PlaceOrder} />
                <Route path={`${url}/userCenter`} exact component={UserCenter} />
                <Redirect path={`${match.url}/`} to={`${match.url}/markets`}/>
              </Switch>
              <div className="tabbar-only-bar">
                <TabBar
                  unselectedTintColor="#949494"
                  selectedTintColor="#000"
                  tintColor="#000"
                  barTintColor="white"
                  style={{position:"fixed",bottom: 0,left:0,right:0}}
                  className="position-fixed"
                >
                  <TabBar.Item
                    title={intl.get("common.markets")}
                    key="markets"
                    icon={
                      <i className="icon-LRC fs22"  style={{marginTop:'4px'}}></i>
                    }
                    selectedIcon={
                      <WebIcon type="line-chart" className="fs22" style={{marginTop:'4px'}} />
                    }
                    selected={pathname === `${url}/markets`}
                    onPress={() => {
                      changeTab('markets')
                    }}
                  />
                  <TabBar.Item
                    icon={<WebIcon type="sync" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="sync" className="fs22" style={{marginTop:'4px'}} />}
                    title={intl.get("common.trade")}
                    key="placeOrder"
                    selected={pathname === `${url}/placeOrder`}
                    onPress={() => {
                      changeTab('placeOrder')
                    }}
                  />
                  <TabBar.Item
                    icon={<WebIcon type="user" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="setting" className="fs22" style={{marginTop:'4px'}} />}
                    title={intl.get("user_center.tab_title")}
                    key="userCenter"
                    selected={pathname === `${url}/userCenter`}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'userCenter',
                      });
                      changeTab('userCenter')
                    }}
                  />
                </TabBar>
              </div>
      </div>
    )
  }
}

export default Home
