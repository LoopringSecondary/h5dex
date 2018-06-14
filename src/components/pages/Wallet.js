import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import Layout from '../../layout';
import Footer from '../../layout/Footer';
import intl from 'react-intl-universal';
import Tickers from '../tickers';
import Orders from '../orders';
import My from '../orders/My';
import { TabBar,NavBar,Icon } from 'antd-mobile';
import ListTokens from '../tokens/ListTokens';
import Trade from './Trade';
import { Icon as WebIcon } from 'antd';

class Wallet extends React.Component {
  constructor(props) {
      super(props);
  }
  render(){
    const {match,location} = this.props;
    console.log('Wallet props',this.props)
    const {url} = match;
    const {pathname} = location
    const changeTab = (path) => {
      routeActions.gotoPath(`${url}/${path}`);
    };
    return (
      <div style={{ }}>
              <Switch>
                <Route path={`${url}/assets`} exact render={() =>
                  <ListTokens />
                }/>
                <Route path={`${url}/trade`} exact render={() =>
                  <Trade />
                }/>
                <Route path={`${url}/settings`} exact render={() =>
                  <div className="p30">
                    Settings
                  </div>
                }/>
                <Redirect path={`${match.url}/`} to={`${match.url}/assets`}/>
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
                    title="Wallet"
                    key="assets"
                    icon={<WebIcon type="pay-circle-o" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="pay-circle-o" className="fs22" style={{marginTop:'4px'}} />}
                    selected={pathname === `${url}/assets`}
                    badge={null && 1}
                    onPress={() => {
                      changeTab('assets')
                    }}
                    data-seed="logId"
                  />
                  <TabBar.Item
                    icon={<WebIcon type="compass" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="compass" className="fs22" style={{marginTop:'4px'}} />}
                    title="Trade"
                    key="trade"
                    badge={null && 'new'}
                    selected={pathname === `${url}/trade`}
                    onPress={() => {
                      changeTab('trade')
                    }}
                    data-seed="logId1"
                  />
                  <TabBar.Item
                    icon={<WebIcon type="setting" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="setting" className="fs22" style={{marginTop:'4px'}} />}
                    title="Settings"
                    key="settings"
                    selected={pathname === `${url}/settings`}
                    onPress={() => {
                      changeTab('settings')
                    }}
                  />
                </TabBar>
              </div>
      </div>
    )
  }
}

export default Wallet
