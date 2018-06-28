import React from 'react'
import { Badge, Grid, List, NavBar, NoticeBar, SegmentedControl, Tabs } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import Containers from 'modules/containers'
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { OpenOrderList } from '../orders/ListOrders'
import ListBalance from '../tokens/ListBalance'
import ListMyFills from '../fills/ListMyFills'
import { getShortAddress } from '../../modules/formatter/common'
import storage from 'modules/storage'
import intl from 'react-intl-universal';
import * as tokenFormatter from 'modules/tokens/TokenFm'
import {toNumber,toBig,toFixed} from "LoopringJS/common/formatter";
import Worth from 'modules/settings/Worth'
import config from 'common/config'

const Item = List.Item;
const Brief = Item.Brief;

const OrderListHeader = ()=>{
  return (
    <div className="color-black-2">
      <div className="row ml0 mr0 fs14">
        <div className="col text-center pt10 pb10 zb-b-r">
          Markets <WebIcon className="fs12" type="down" />
        </div>
        <div className="col text-center pt10 pb10 zb-b-r">
          Sides <WebIcon className="fs12" type="down" />
        </div>
        <div className="col text-center pt10 pb10 ">
          Status <WebIcon className="fs12" type="down" />
        </div>
      </div>
    </div>
  )
}

class UserCenter extends React.Component {
  render() {
    const dispatch = this.props.dispatch
    const showLayer = (payload={})=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          ...payload
        }
      })
    }
    const hideLayer = (payload={})=>{
      dispatch({
        type:'layers/hideLayer',
        payload:{
          ...payload
        }
      })
    }
    const OrderStatus = [
      {
        icon: <Badge text="3"><WebIcon type="exclamation-circle-o" className="fs22 color-black-1 mb5" /></Badge>,
        text: <div className="fs14 color-black-2">Error</div>,
      },
      {
        icon: <WebIcon type="clock-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Open</div>,
      },
      {
        icon: <WebIcon type="pay-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Matched</div>,
      },
      {
        icon: <WebIcon type="check-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Completed</div>,
      },
      {
        icon: <WebIcon type="close-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Closed</div>,
      },
    ]
    const txStatus = [
      {
        icon: <WebIcon type="clock-circle-o" className="fs20 color-black-2 mb5" />,
        text: <div className="fs14 color-black-2">Pending</div>,
      },
      {
        icon: <WebIcon type="check-circle-o" className="fs20 color-black-2 mb5" />,
        text: <div className="fs14 color-black-2">Success</div>,
      },
      {
        icon: <WebIcon type="close-circle-o" className="fs20 color-black-2 mb5" />,
        text: <div className="fs14 color-black-2">Failed</div>,
      },
    ]
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
            className=""
            mode="light"
            leftContent={null && [
              <span className="color-black-1" key="1"><WebIcon type="home" /></span>,
            ]}
            rightContent={[
              <span className="color-black-1" key="1" onClick={()=>{}}><WebIcon type="setting" /></span>
            ]}
          >
          {intl.get('usercenter.page_title')}
          </NavBar>
          <div className="divider 1px zb-b-b"></div>
          <div className="pt25 pb25 text-left bg-white">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col">
                <div className="text-center color-black-1 fs16 pl15 pr15" style={{wordBreak:'break-all'}}>
                  {getShortAddress(storage.wallet.getUnlockedAddress())}
                  <div className="fs14 color-black-3 mt5">
                    {intl.get('usercenter.actions_switch_wallet')} <WebIcon type="right" />
                  </div>
                </div>
              </div>
              <div className="col-auto">
              </div>
            </div>
          </div>
          <div className="divider 1px zb-b-b"></div>
          <div hidden className="pl10 pr10 pt10 pb5 bg-white">
            <div className="divider 1px zb-b-b"></div>
            <SegmentedControl values={['Assets','Orders','Fills']} style={{height:'40px'}}/>
          </div>
          <div className="height-auto tabs-no-border">
            <Tabs
              tabs={
                [
                  { title: <Badge className="pt5 pb5 fs16 d-block w-100 text-center">{intl.get('common.all')}{intl.get('common.assets')}</Badge> },
                  { title: <Badge className="pt5 pb5 fs16 d-block w-100 text-center">{intl.get('common.all')}{intl.get('common.orders')}</Badge> },
                  { title: <Badge className="pt5 pb5 fs16 d-block w-100 text-center">{intl.get('common.all')}{intl.get('common.fills')}</Badge> },
                ]
              }
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div>
                <ListBalance />
              </div>
              <div>
                <Containers.Orders id="MyOpenOrders" alias="orders" initState={{}}>
                  <OrderListHeader />
                  <div className="divider 1px zb-b-b"></div>
                  <OpenOrderList />
                </Containers.Orders>
              </div>
              <div>
                <Containers.Fills id="MyFills" alias="fills" initState={{}}>
                  <ListMyFills />
                </Containers.Fills>
              </div>
            </Tabs>
            <div className="pb50"></div>
          </div>
          <div hidden>
            <div onClick={routeActions.gotoPath.bind(this,'/orders')} className="row ml0 mr0 p10 mt0 bg-white align-items-center no-gutters">
              <div className="col fs16 color-black-1">
                My Orders
              </div>
              <div className="col-auto fs14 color-black-3 pl20">
                Order & Fills <WebIcon type="right" />
              </div>
            </div>
            <Grid onClick={routeActions.gotoPath.bind(this,'/dex/myOrders')} className="my-dex-grid" data={OrderStatus} square={false} activeStyle={false} carouselMaxRow={1} isCarousel={true} />
          </div>
          <div hidden className="bg-white mt15">
            <div className="row ml0 mr0 p10 align-items-center no-gutters zb-b-t">
              <div className="col fs16 color-black-1">My Assets</div>
              <div className="col-auto fs14 color-black-3 pl20">
                All <WebIcon type="right" />
              </div>
            </div>
            <div className="zb-b-t">
              <ListBalance />
            </div>
          </div>
          <div hidden className="bg-white mt15">
            <div className="row ml0 mr0 p10 align-items-center no-gutters zb-b-t">
              <div className="col fs20 color-black-1">
                My Transactions
                <span hidden className="color-black-3 ml10 fs16">ETH</span>
              </div>
              <div className="col-auto fs18 color-black-3 pl20">
                All <WebIcon type="right" />
              </div>
            </div>
            <Grid className="my-dex-grid" data={txStatus} square={false} activeStyle={false} columnNum={4}/>
          </div>
          <div className="pb50"></div>
        </div>
      </LayoutDexHome>

    );
  }
}
export default UserCenter





