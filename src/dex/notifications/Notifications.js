import React from 'react'
import { NavBar, NoticeBar, Tabs } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { Link, Redirect, Route, Switch } from 'dva/router'
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'
import ListTodos from './ListTodos'
import storage from 'modules/storage'
import intl from 'react-intl-universal'

class Notifications extends React.Component {
  render() {
    const {match,location} = this.props;
    const {url} = match;
    const {pathname} = location;
    const changeTab = (path) => {
      routeActions.gotoPath(`${url}/${path}`);
    }
    const isActive = (path) => {
      if(pathname === `${url}/${path}`){
        return true
      }
    }
    return (
      <LayoutDexHome {...this.props}>
        <div className="bg-grey-100">
          <NavBar
            className=""
            mode="light"
            leftContent={null && [
              <span className="" key="1"><WebIcon type="home" /></span>,
            ]}
            rightContent={null && [
              <span className="" key="1" onClick={()=>window.Toast.info('Coming Soon', 1, null, false)}><i className="icon-cog-o"></i></span>
            ]}
          >
          消息
          </NavBar>
          <div className="divider 1px"></div>
          <div className="height-auto tabs-no-border">
            <Tabs
              tabs={
                [
                  { title: <div onClick={changeTab.bind(this,'tasks')} className={`pt5 pb5 fs16 d-block w-100 text-center ${isActive('tasks') ? 'text-primary' : 'color-black'}`}>Tasks</div> },
                  { title: <div onClick={changeTab.bind(this,'txs')} className={`pt5 pb5 fs16 d-block w-100 text-center ${isActive('txs') ? 'text-primary' : 'color-black'}`}>ETH Txs</div> },
                ]
              }
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
            </Tabs>
            <Switch>
              <Route path={`${url}/tasks`} exact render={()=>{
                return (
                  <div>
                    <div className="divider 1px zb-b-b"></div>
                    <ListTodos />
                  </div>
                )
              }} />
              <Route path={`${url}/txs`} exact render={()=>{
                return (
                  <div>
                    <div className="divider 1px zb-b-b"></div>
                    <div className="fs18 color-black-4 p15">Txs</div>
                  </div>
                )
              }} />
              <Redirect path={`${match.url}/`} to={`${match.url}/tasks`}/>
            </Switch>
            <div className="pb50"></div>
          </div>
          <div className="pb50"></div>
        </div>
      </LayoutDexHome>

    );
  }
}
export default Notifications





