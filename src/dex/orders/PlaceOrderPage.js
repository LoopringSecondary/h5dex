import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import OrderDetail from './Detail';
import PlaceOrderSteps from './PlaceOrderSteps';
import HelperOfAdvance from './HelperOfAdvance';
import HelperOfPrice from './HelperOfPrice';
import HelperOfAmount from './HelperOfAmount';
import HelperOfMarket from './HelperOfMarket';
import {OpenOrderList} from './ListOrders';
import ListBalance from '../tokens/ListBalance';
import ListMyFills from '../fills/ListMyFills';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import PlaceOrderForm from './PlaceOrderForm'
import LayoutDexHome from '../../layout/LayoutDexHome'
import {getTokensByMarket} from 'modules/formatter/common'

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
            onLeftClick={() => routeActions.gotoPath(`/dex/markets/${pair}`)}
            leftContent={[
              <span className="color-black-1" key="1"  onClick={gotoTrade}><WebIcon type="line-chart" /></span>
            ]}
            rightContent={[
              <span className="color-black-1" key="1" ><WebIcon type="question-circle-o" /></span>,
            ]}
          >
            <div className="" onClick={showLayer.bind(this,{id:'helperOfMarket'})}>
              {pair}<WebIcon className="ml5" type="down" />
            </div>
          </NavBar>
          <div className="no-underline tabs-no-border h-50 place-order-form">
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
          <div className="no-underline">
            <Tabs
              tabs={
                [
                  { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">Assets</Badge> },
                  { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">Orders</Badge> },
                  { title: <Badge className="text-center pt10 pb10 d-block w-100">Fills</Badge> },
                ]
              }
              tabBarBackgroundColor="#f6f6f6"
              tabBarActiveTextColor={"#000"}
              tabBarInactiveTextColor={"#999"}
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





