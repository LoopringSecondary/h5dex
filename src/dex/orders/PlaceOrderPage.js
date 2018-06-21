import React from 'react'
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile'
import { Icon as WebIcon,Switch as WebSwitch } from 'antd'
import { connect } from 'dva'
import OrderDetail from './Detail'
import PlaceOrderSteps from './PlaceOrderSteps'
import PlaceOrderForm from './PlaceOrderForm'
import HelperOfAdvance from './HelperOfAdvance'
import HelperOfPrice from './HelperOfPrice'
import HelperOfAmount from './HelperOfAmount'
import HelperOfMarket from './HelperOfMarket'
import HelperOfBalance from './HelperOfBalance'
import HelperOfMyMarketOrders from './HelperOfMyMarketOrders'
import HelperOfMyMarketFills from './HelperOfMyMarketFills'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'

import LayoutDexHome from '../../layout/LayoutDexHome'
import {getTokensByMarket} from 'modules/formatter/common'

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

const Item = List.Item;
class PlaceOrderPage extends React.Component {
  render() {
    const {dispatch,placeOrder} = this.props
    const {side,pair} = placeOrder
    const params = routeActions.match.getParams(this.props)
    if(!params.market) {
      if(!pair){
        const defaultMarket = "LRC-WETH" // TODO
        routeActions.gotoPath(`/dex/placeOrder/${defaultMarket}`)
      }else{
        routeActions.gotoPath(`/dex/placeOrder/${pair}`)
      }
    }
    const pairTokens = getTokensByMarket(pair)
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
    const sideChange = (side)=>{
      dispatch({
        type:'placeOrder/sideChangeEffects',
        payload:{
          side
        }
      })
   }

   const gotoTrade = ()=>{
      routeActions.gotoPath(`/dex/markets/${pair}`)
    }
    return (
      <LayoutDexHome {...this.props}>
        <div className="bg-grey-100">
          <NavBar
            className=""
            mode="light"
            leftContent={[
              <span className="color-black-1" key="1" onClick={showLayer.bind(this,{id:'helperOfMarket'})}><WebIcon type="bars" /></span>,
            ]}
            rightContent={[
              <span className="color-black-1" key="1"  onClick={() => routeActions.gotoPath(`/dex/markets/${pair}`) }><WebIcon type="line-chart" /></span>
            ]}
          >
            <div>
              {pair}<WebIcon className="ml5" type="down" />
            </div>
          </NavBar>
          <div className="divider 1px zb-b-t"></div>
          <div className="no-underline tabs-no-border h-50 place-order-form">
            <div hidden className="p10 bg-white" >
              <SegmentedControl values={['Buy LRC', 'Sell LRC']} style={{height:'36px'}}/>
            </div>
            <Tabs
              tabs={
                [
                  { title: <div className="fs16">Buy {pairTokens.left}</div> },
                  { title: <div className="fs16">Sell {pairTokens.left}</div> },
                ]
              }
              tabBarBackgroundColor={side === 'buy' ? "#e8f5e9" : "#ffebee"}
              tabBarActiveTextColor={side === 'buy' ? "#43a047" : "#f44336"}
              tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
              tabBarTextStyle={{}}
              swipeable={false}
              initialPage={side==='buy'?0:1}
              onChange={(tab, index) => { sideChange(index==0 ? 'buy' : 'sell')}}
              onTabClick={(tab, index) => { }}
            >
              <PlaceOrderForm side="sell" showLayer={showLayer} />
            </Tabs>
          </div>
          <div className="divider 1px zb-b-t"></div>
          <div className="no-underline tabs-no-border">
            <Tabs
              tabs={
                [
                  { title: <div className="am-tabs-item-wrapper-bak"><div className="fs16 am-tabs-item-bak">Assets</div></div> },
                  { title: <div className="am-tabs-item-wrapper-bak"><div className="fs16 am-tabs-item-bak">Orders</div></div> },
                  { title: <div className="am-tabs-item-wrapper-bak"><div className="fs16 am-tabs-item-bak">Fills</div></div> },
                ]
              }
              tabBarBackgroundColor="#fff"
              tabBarActiveTextColor={"#000"}
              tabBarInactiveTextColor={"#999"}
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div className="zb-b-t">
                <HelperOfBalance />
              </div>
              <div className="">
                <HelperOfMyMarketOrders />
              </div>
              <div>
                <HelperOfMyMarketFills />
              </div>
            </Tabs>
            <div className="pb50"></div>
          </div>
          <Containers.Layers id="orderDetail">
            <UiContainers.Popups id="orderDetail">
              <OrderDetail />
            </UiContainers.Popups>
          </Containers.Layers>
          <Containers.Layers id="placeOrderSteps">
            <UiContainers.Popups id="placeOrderSteps">
              <PlaceOrderSteps />
            </UiContainers.Popups>
          </Containers.Layers>
          <Containers.Layers id="helperOfAdvance">
            <UiContainers.Popups id="helperOfAdvance">
              <HelperOfAdvance />
            </UiContainers.Popups>
          </Containers.Layers>
          <Containers.Layers id="helperOfPrice">
            <UiContainers.Popups id="helperOfPrice">
              <HelperOfPrice />
            </UiContainers.Popups>
          </Containers.Layers>
          <Containers.Layers id="helperOfAmount">
            <UiContainers.Popups id="helperOfAmount">
              <HelperOfAmount />
            </UiContainers.Popups>
          </Containers.Layers>
          <Containers.Layers id="helperOfMarket">
            <UiContainers.Popups id="helperOfMarket">
              <HelperOfMarket />
            </UiContainers.Popups>
          </Containers.Layers>
        </div>
      </LayoutDexHome>
    );
  }
}
export default connect(({placeOrder})=>({placeOrder}))(PlaceOrderPage)





