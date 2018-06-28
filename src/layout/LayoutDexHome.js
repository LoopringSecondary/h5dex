import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal';
import { TabBar,NavBar,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';

class DexHomeLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const url = routeActions.match.getUrl(this.props)
    const pathname = routeActions.location.getPathname(this.props)
    const changeTab = (path) => {
      routeActions.gotoPath(`/dex/${path}`);
    }
    return (
      <div style={{}}>
        {this.props.children}
        <div className="tabbar-only-bar">
          <TabBar
            style={{position:"fixed",bottom: 0,left:0,right:0}}
            className="position-fixed"
          >
            <TabBar.Item
              title={intl.get("common.markets")}
              key="markets"
              icon={
                <i className="icon-market fs22"></i>
              }
              selectedIcon={
                <i className="icon-market fs22"></i>
              }
              selected={pathname === `/dex/markets`}
              onPress={() => {
                changeTab('markets')
              }}
            />
            <TabBar.Item
              icon={<i className="icon-trade-m fs22" />}
              selectedIcon={<i className="icon-trade-m fs22" />}
              title={intl.get("common.trade")}
              key="placeOrder"
              selected={pathname.indexOf(`/dex/placeOrder`)>-1}
              onPress={() => {
                changeTab('placeOrder')
              }}
            />
            <TabBar.Item
              badge="6"
              icon={<i className="icon-bell fs22" />}
              selectedIcon={<i className="icon-bell fs22" />}
              title={intl.get('todos.tab_title')}
              key="Notifications"
              selected={pathname === `/dex/todos`}
              onPress={() => {
                changeTab('todos')
              }}
            />
            <TabBar.Item
              icon={<i className="icon-user fs22" />}
              selectedIcon={<i className="icon-user fs22" />}
              title={intl.get("user_center.tab_title")}
              key="userCenter"
              selected={pathname === `/dex/userCenter`}
              onPress={() => {
                changeTab('userCenter')
              }}
            />
          </TabBar>
        </div>
      </div>
    )
  }
}

export default DexHomeLayout
