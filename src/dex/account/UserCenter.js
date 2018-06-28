import React from 'react'
import { Badge, Grid, NavBar, NoticeBar, SegmentedControl, Tabs } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import Containers from 'modules/containers'
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { OpenOrderList } from '../orders/ListOrders'
import ListBalance from '../tokens/ListBalance'
import ListMyFills from '../fills/ListMyFills'
import { getShortAddress } from '../../modules/formatter/common'
import storage from 'modules/storage'
import intl from 'react-intl-universal'

const OrderListHeader = ()=>{
  return null
  // return (
  //   <div className="color-black-2">
  //     <div className="row ml0 mr0 fs14">
  //       <div className="col text-center pt10 pb10 zb-b-r">
  //         {intl.get('common.markets')} <WebIcon className="fs12" type="down" />
  //       </div>
  //       <div className="col text-center pt10 pb10 zb-b-r">
  //         {intl.get('common.sides')} <WebIcon className="fs12" type="down" />
  //       </div>
  //       <div className="col text-center pt10 pb10 ">
  //         {intl.get('common.status')} <WebIcon className="fs12" type="down" />
  //       </div>
  //     </div>
  //   </div>
  // )
}

class UserCenter extends React.Component {
  render() {
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
            className="bg-primary-dark"
            mode="dark"
            leftContent={null && [
              <span className="" key="1"><WebIcon type="home" /></span>,
            ]}
            rightContent={[
              <span className="" key="1" onClick={()=>{}}><WebIcon type="setting" /></span>
            ]}
          >
          {intl.get('usercenter.page_title')}
          </NavBar>
          <div className="pt35 pb35 text-left bg-primary">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col">
                <div className="text-center color-white fs16 pl15 pr15" style={{wordBreak:'break-all'}}>
                  {getShortAddress(storage.wallet.getUnlockedAddress())}
                  <div className="fs14 color-white-3 mt5">
                    {intl.get('usercenter.actions_switch_wallet')} <WebIcon type="right" />
                  </div>
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
                  { title: <Badge className="pt5 pb5 fs16 d-block w-100 text-center">{intl.get('common.assets')}</Badge> },
                  { title: <Badge className="pt5 pb5 fs16 d-block w-100 text-center">{intl.get('common.orders')}</Badge> },
                  { title: <Badge className="pt5 pb5 fs16 d-block w-100 text-center">{intl.get('common.fills')}</Badge> },
                ]
              }
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div>
                <div className="divider 1px zb-b-b"></div>
                <ListBalance />
              </div>
              <div>
                <Containers.Orders id="MyOpenOrders" alias="orders" initstate={{}}>
                  <OrderListHeader />
                  <div className="divider 1px zb-b-b"></div>
                  <OpenOrderList />
                </Containers.Orders>
              </div>
              <div>
                <div className="divider 1px zb-b-b"></div>
                <Containers.Fills id="MyFills" alias="fills" initstate={{}}>
                  <ListMyFills />
                </Containers.Fills>
              </div>
            </Tabs>
            <div className="pb50"></div>
          </div>
          <div className="pb50"></div>
        </div>
      </LayoutDexHome>

    );
  }
}
export default UserCenter





