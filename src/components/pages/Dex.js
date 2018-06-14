import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal';
import My from '../orders/My';
import Markets from '../tickers/Markets';
import PlaceOrder from '../orders/PlaceOrderFormStand';
import { TabBar,NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';

class Dex extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'markets',
      };
  }
  render(){
    const {match} = this.props;
    const {url} = match;
    const changeTab = (path) => {
      routeActions.gotoPath(`${url}/${path}`);
    };
    return (
      <div style={{ }}>
              <Switch>
                <Route path={`${url}/markets`} exact component={Markets} />
                <Route path={`${url}/trade`} exact component={PlaceOrder} />
                <Route path={`${url}/my`} exact component={My} />
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
                    title="Markets"
                    key="markets"
                    icon={
                      <WebIcon type="line-chart" className="fs22" style={{marginTop:'4px'}} />
                    }
                    selectedIcon={
                      <WebIcon type="line-chart" className="fs22" style={{marginTop:'4px'}} />
                    }
                    selected={this.state.selectedTab === 'markets'}
                    badge={null && 1}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'markets',
                      });
                      changeTab('markets')
                    }}
                    data-seed="logId"
                  />
                  <TabBar.Item
                    icon={<WebIcon type="sync" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="sync" className="fs22" style={{marginTop:'4px'}} />}
                    title="Trade"
                    key="trade"
                    badge={null && 'new'}
                    selected={this.state.selectedTab === 'trade'}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'trade',
                      });
                      changeTab('trade')
                    }}
                    data-seed="logId1"
                  />
                  <TabBar.Item
                    icon={<WebIcon type="user" className="fs22" style={{marginTop:'4px'}} />}
                    selectedIcon={<WebIcon type="setting" className="fs22" style={{marginTop:'4px'}} />}
                    title="My"
                    key="my"
                    selected={this.state.selectedTab === 'my'}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'my',
                      });
                      changeTab('my')
                    }}
                  />
                </TabBar>
              </div>
      </div>
    )
  }
}

export default Dex
