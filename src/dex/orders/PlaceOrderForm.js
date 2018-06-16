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
import ListTickers from '../tickers/ListTickers';
import {OpenOrderList,HistoryOrderList} from './ListOrders';
import ListMyFills from '../fills/ListMyFills';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
const Item = List.Item;
const Brief = Item.Brief;


// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class PlaceOrder extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }
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
    const gotoConfirm= ()=>{

    }
    const gotoOrderDetail= (payload)=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          id:'orderDetail',
          ...payload
        }
      })
    }

    const showPriceHelper= ()=>{
      showLayer({id:'helperOfPrice'})
    }
    const { getFieldProps } = this.props.form;
    const { type } = this.state;

    const PlaceOrderForm = (props)=>{
      const { side } = props
      return (
        <div>
           <List className="bg-none no-border">
            <InputItem
              {...getFieldProps('money3')}
              type={type}
              placeholder="00.000000"
              clear
              moneyKeyboardAlign="right"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              extra={<WebIcon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={showLayer.bind(this,{id:'helperOfPrice',side:'sell'})} />}
            ><div className="fs16">Price</div></InputItem>
          </List>
          <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="00.000000"
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              extra={<WebIcon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={showLayer.bind(this,{id:'helperOfAmount',side:'sell'})} />}
            ><div className="fs16">Amount</div></InputItem>
          </List>
          <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="00.000000"
              extra={<WebIcon type="exclamation-circle-o" style={{padding:'2px 0px 5px 20px',outline:'5px'}} />}
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              editable={false}
            ><div className="fs16">Total</div></InputItem>
          </List>
          <List className="bg-none no-border">
            {
              false &&
              <InputItem
                type={type}
                placeholder="00.000000"
                extra={<span className="fs16 color-black-4">{null && "LRC"}</span>}
                clear
                moneyKeyboardAlign="right"
                onChange={(v) => { console.log('onChange', v); }}
                onBlur={(v) => { console.log('onBlur', v); }}
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                editable={false}
              >LRC Fee</InputItem>
            }
            {
              false &&
              <InputItem
                type={type}
                placeholder="06-10 12:00"
                extra={<span className="fs16 color-black-4">{null && "WETH"}</span>}
                clear
                moneyKeyboardAlign="left"
                onChange={(v) => { console.log('onChange', v); }}
                onBlur={(v) => { console.log('onBlur', v); }}
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                editable={false}
              >TTL</InputItem>
            }
            <Item>
              <div className="row align-items-center ml0 mr0 mb15 mt10">
                <div className="col color-black-3 fs16 pl0">Advanced</div>
                <div className="col-auto color-black-3 fs16 pr0">
                  <WebSwitch onChange={(checked)=>{showLayer({id:'helperOfAdvance',side})}} />
                </div>
              </div>
              {
                side === 'sell' &&
                <Button onClick={showLayer.bind(this,{id:'placeOrderSteps',side})} className="w-100 d-block mb10 color-white bg-red-500" type="warning">Place Sell Order</Button>
              }
              {
                side === 'buy' &&
                <Button onClick={showLayer.bind(this,{id:'placeOrderSteps',side})} className="w-100 d-block mb10 bg-green-500 color-white">Place Buy Order</Button>
              }
            </Item>
          </List>

        </div>

      )
    }
    const {side} = this.state
    const tabChange = (side)=>{
      this.setState({
        side
      })
    }
   const gotoTrade = ()=>{
      routeActions.gotoPath('/trade/detail')
    }
    return (
      <div className="bg-grey-100">
        <NavBar
          className=""
          mode="light"
          onLeftClick={() => routeActions.gotoPath('/wallet/trade')}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="home" /></span>,
          ]}
          rightContent={[
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="line-chart" /></span>
          ]}
        >
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>LRC-WETH <WebIcon className="ml5" type="down" /></div>
        </NavBar>
        <div className="no-underline tabs-no-border h-50 place-order-form">
          <Tabs
            tabs={
              [
                { title: <div className="fs16">Buy LRC</div> },
                { title: <div className="fs16">Sell LRC</div> },
              ]
            }
            tabBarBackgroundColor={side === 'buy' ? "#e8f5e9" : "#ffebee"}
            tabBarActiveTextColor={side === 'buy' ? "#43a047" : "#f44336"}
            tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
            tabBarTextStyle={{}}
            initialPage={0}
            onChange={(tab, index) => { tabChange(index==0 ? 'buy' : 'sell')}}
            onTabClick={(tab, index) => { }}
          >
            <PlaceOrderForm side="buy" />
            <PlaceOrderForm side="sell" />
          </Tabs>
        </div>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">My Orders</Badge> },
                { title: <Badge className="text-center pt10 pb10 d-block w-100">My Fills</Badge> },
              ]
            }
            tabBarBackgroundColor="#f5f5f5"
            tabBarActiveTextColor={"#000"}
            tabBarInactiveTextColor={"#999"}
            initialPage={0}
            swipeable={false}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div>
              <OpenOrderList gotoOrderDetail={gotoOrderDetail} />
            </div>
            <div>
              <ListMyFills />
            </div>
          </Tabs>
          <div className="pb50"></div>
        </div>
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
        <Containers.Layers id="orderDetail">
          <UiContainers.Popups id="orderDetail">
            <OrderDetail />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderMarketHelper">
          <UiContainers.Popups id="placeOrderMarketHelper">
            <div className="tabs-no-border" style={{height:'80vh'}}>
              <NavBar
                className="zb-b-b"
                mode="light"
                onLeftClick={() => console.log('onLeftClick')}
                leftContent={[
                  <span className="color-black-1 " onClick={hideLayer.bind(this,{id:'placeOrderMarketHelper'})}><WebIcon key="1" type="close" /></span>
                ]}
                rightContent={[
                  <span className="color-black-1"><WebIcon key="1" type="search" /></span>,
                ]}
              >
                Market
              </NavBar>
              <ListTickers />
            </div>
          </UiContainers.Popups>
        </Containers.Layers>

      </div>
    );
  }
}
const PlaceOrderForm = createForm()(connect(({layers})=>({layers}))(PlaceOrder))
export default PlaceOrderForm







