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
    const isActive = (path)=>{
      return pathname.indexOf(path) > -1
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
              title={
                <span className={isActive("/dex/markets") ? "text-primary" : ''}>{intl.get("common.markets")}</span>
              }
              key="markets"
              icon={
                <i className="icon-market fs22 color-primary-light-bak"></i>
              }
              selectedIcon={
                <i className="icon-market fs22 text-primary"></i>
              }
              selected={isActive("/dex/markets")}
              onPress={() => {
                changeTab('markets')
              }}
            />
            <TabBar.Item
              icon={<i className="icon-trade-m fs22 color-primary-light-bak" />}
              selectedIcon={<i className="icon-trade-m fs22 text-primary" />}
              title={<span className={isActive("/dex/placeOrder") ? "text-primary" : ''}>{intl.get("common.trade")}</span>}
              key="placeOrder"
              selected={isActive("/dex/placeOrder")}
              onPress={() => {
                changeTab('placeOrder')
              }}
            />
            <TabBar.Item
              badge="3"
              icon={<i className="icon-bell fs22 color-primary-light-bak" style={{position:"relative",top:"2px"}}  />}
              selectedIcon={<i className="icon-bell fs22 text-primary" style={{position:"relative",top:"2px"}} />}
              title={<span className={isActive("/dex/todos") ? "text-primary" : ''} style={{position:"relative",top:"-2px"}} >{intl.get('todos.tab_title')}</span>}
              key="Notifications"
              selected={isActive("/dex/todos")}
              onPress={() => {
                changeTab('todos')
              }}
            />
            <TabBar.Item
              icon={<i className="icon-user fs22 color-primary-light-bak" />}
              selectedIcon={<i className="icon-user fs22 text-primary" />}
              title={
                <span className={isActive("/dex/usercenter") ? "text-primary" : ''}>{intl.get("user_center.tab_title")}</span>
              }
              key="usercenter"
              selected={isActive("/dex/usercenter")}
              onPress={() => {
                changeTab('usercenter')
              }}
            />
          </TabBar>
        </div>
      </div>
    )
  }
}

export default DexHomeLayout
