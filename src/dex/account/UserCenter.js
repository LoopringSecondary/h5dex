import React from 'react'
import { NavBar, NoticeBar, Tabs } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { Link, Redirect, Route, Switch } from 'dva/router'
import Containers from 'modules/containers'
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { OpenOrderList } from '../orders/ListOrders'
import ListBalance from '../tokens/ListBalance'
import ListMyFills from '../fills/ListMyFills'
import { getShortAddress } from '../../modules/formatter/common'
import storage from 'modules/storage'
import intl from 'react-intl-universal'



class UserCenter extends React.Component {
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
          {
            false &&
            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} className="color-back-1" >
                  Notice: Loopr is in Beta phase, traing fee is free for every order when total is over 1.0 WETH
            </NoticeBar>
          }
          <NavBar
            className="bg-primary"
            mode="dark"
            leftContent={null && [
              <span className="" key="1"><WebIcon type="home" /></span>,
            ]}
            rightContent={null && [
              <span className="" key="1" onClick={()=>window.Toast.info('Coming Soon', 1, null, false)}><i className="icon-cog-o"></i></span>
            ]}
          >
          {intl.get('usercenter.page_title')}
          </NavBar>

          <div className="pt35 pb35 text-left bg-primary">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col">
                <div className="text-center color-white fs16 pl15 pr15" style={{wordBreak:'break-all'}}>
                  {getShortAddress(storage.wallet.getUnlockedAddress())}
                  {
                    false &&
                    <div className="fs14 color-white-3 mt5" onClick={()=>window.Toast.info('Coming Soon', 1, null, false)}>
                      {intl.get('usercenter.actions_switch_wallet')} <WebIcon type="right" />
                    </div>
                  }
                </div>
              </div>
              <div className="col-auto">
              </div>
            </div>
          </div>
          <div className="height-auto tabs-no-border">
            <Tabs
              tabs={
                [
                  { title: <div onClick={changeTab.bind(this,'assets')} className={`pt5 pb5 fs16 d-block w-100 text-center ${isActive('assets') ? 'text-primary' : 'color-black'}`}>{intl.get('common.assets')}</div> },
                  { title: <div onClick={changeTab.bind(this,'orders')} className={`pt5 pb5 fs16 d-block w-100 text-center ${isActive('orders') ? 'text-primary' : 'color-black'}`}>{intl.get('common.orders')}</div> },
                  { title: <div onClick={changeTab.bind(this,'fills')} className={`pt5 pb5 fs16 d-block w-100 text-center ${isActive('fills') ? 'text-primary' : 'color-black'}`}>{intl.get('common.fills')}</div> },
                ]
              }
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
            </Tabs>
            <Switch>
              <Route path={`${url}/assets`} exact render={()=>{
                return (
                  <div>
                    <div className="divider 1px zb-b-b"></div>
                    <ListBalance />
                  </div>
                )
              }} />
              <Route path={`${url}/orders`} exact render={()=>{
                return (
                  <div>
                    <Containers.Orders id="MyOpenOrders" alias="orders" initstate={{}}>
                      <div className="divider 1px zb-b-b"></div>
                      <OpenOrderList />
                    </Containers.Orders>
                  </div>
                )
              }} />
              <Route path={`${url}/fills`} exact render={()=>{
                return (
                  <div>
                    <div className="divider 1px zb-b-b"></div>
                    <Containers.Fills id="MyFills" alias="fills" initstate={{}}>
                      <ListMyFills />
                    </Containers.Fills>
                  </div>
                )
              }} />
              <Redirect path={`${match.url}/`} to={`${match.url}/assets`}/>
            </Switch>
            <div className="pb50"></div>
          </div>
          <div className="pb50"></div>
        </div>
      </LayoutDexHome>

    );
  }
}
export default UserCenter





