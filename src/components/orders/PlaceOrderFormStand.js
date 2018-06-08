import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import PlaceOrderPreview from './PlaceOrderPreview';
import PlaceOrderAdvance from './PlaceOrderAdvance';
import PlaceOrderPriceHelper from './PlaceOrderPriceHelper';
import PlaceOrderAmountHelper from './PlaceOrderAmountHelper';
import {FillList} from './PlaceOrderAmountHelper';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
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
    const showPriceHelper= ()=>{
      showLayer({id:'placeOrderPriceHelper'})
    }
    const { getFieldProps } = this.props.form;
    const { type } = this.state;

    const PlaceOrderForm = (props)=>{
      const { side } = props
      return (
        <List className="bg-none no-border">
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            placeholder="0.00000000"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<WebIcon type="profile" style={{padding:'7px'}} onClick={showLayer.bind(this,{id:'placeOrderPriceHelper',side:'sell'})} />}
          ><div className="fs20">Price</div></InputItem>
          <InputItem
            type={type}
            placeholder="0.00000000"
            clear
            moneyKeyboardAlign="left"
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<WebIcon type="profile" style={{padding:'7px'}} onClick={showLayer.bind(this,{id:'placeOrderAmountHelper',side:'sell'})} />}
          ><div className="fs20">Amount</div></InputItem>
          {
            true &&
            <InputItem
              type={type}
              placeholder="0.00000000"
              extra={<span className="fs16 color-black-4">{null && "WETH"}</span>}
              clear
              moneyKeyboardAlign="left"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              editable={false}
            ><div className="fs20">Total</div></InputItem>
          }
          {
            false &&
            <InputItem
              type={type}
              placeholder="0.00000000"
              extra={<span className="fs16 color-black-4">{null && "LRC"}</span>}
              clear
              moneyKeyboardAlign="left"
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
              <div className="col color-black-3 fs20 pl0">Advanced</div>
              <div className="col-auto color-black-3 fs16 pr0">
                <WebSwitch onChange={(checked)=>{showLayer({id:'placeOrderAdvance',side})}} />
              </div>
            </div>
            {
              side === 'sell' &&
              <Button onClick={showLayer.bind(this,{id:'placeOrderPreview',side})} className="w-100 d-block mb10 color-white bg-red-500" type="warning">Place Sell Order</Button>
            }
            {
              side === 'buy' &&
              <Button onClick={showLayer.bind(this,{id:'placeOrderPreview',side})} className="w-100 d-block mb10 bg-green-500 color-white">Place Buy Order</Button>
            }
          </Item>
        </List>
      )
    }
    const {side} = this.state
    const tabChange = (side)=>{
      this.setState({
        side
      })
    }
    return (
      <div className="bg-grey-100">
        <NavBar
          className="zb-b-b"
          mode="light"
          icon={null && <Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={null && [
            <Icon key="1" type="ellipsis" />,
          ]}
          leftContent={null && [
            <WebIcon key="1" type="menu-fold" />,
          ]}
        >
        LRC-WETH
        </NavBar>
        <div className="no-underline">
          <Tabs
            tabs={
              [
                { title: <div className="fs20 pt5 pb5">Buy LRC</div> },
                { title: <div className="fs20 pt5 pb5">Sell LRC</div> },
              ]
            }
            tabBarBackgroundColor={'#fff'}
            tabBarActiveTextColor={side === 'buy' ? "#43a047" : "#f44336"}
            tabBarInactiveTextColor={"#000"}
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
                { title: <Badge count={2} className="text-center d-block w-100 pl10">Balances</Badge> },
                { title: <Badge className="text-center d-block w-100 pl10">Orders</Badge> },
                { title: <Badge className="text-center d-block w-100  pr10">Trades</Badge> },
              ]
            }
            tabBarBackgroundColor="#f5f5f5"
            tabBarActiveTextColor={"#000"}
            tabBarInactiveTextColor={"#999"}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div className="bg-grey-100">
              <TokenList />
            </div>
            <div>
              <OrderList />
            </div>
            <div>
              <FillList />
            </div>
          </Tabs>
        </div>
        <Containers.Layers id="placeOrderPreview">
          <UiContainers.Popups id="placeOrderPreview">
            <PlaceOrderPreview />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderAdvance">
          <UiContainers.Popups id="placeOrderAdvance">
            <PlaceOrderAdvance />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderPriceHelper">
          <UiContainers.Popups id="placeOrderPriceHelper">
            <PlaceOrderPriceHelper />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderAmountHelper">
          <UiContainers.Popups id="placeOrderAmountHelper">
            <PlaceOrderAmountHelper />
          </UiContainers.Popups>
        </Containers.Layers>
      </div>
    );
  }
}

const PlaceOrderForm = createForm()(connect(({layers})=>({layers}))(PlaceOrder))
export default PlaceOrderForm


export const TokenNotEnough = ()=>{
  return (
    <div className="">
      哈哈哈哈哈
    </div>
  )
}
const TokenListComp = (props)=>{
  const {dispatch} = props
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const tokens = [
    {
      symbol:"LRC",
      balance:12680.0001,
      required:15000.0001,
    },
    {
      symbol:"WETH",
      balance:21.3652,
      required:20.1278,
    },
    {
      symbol:"ETH",
      balance:85.0001,
      required:0.0001,
    },
  ]
  return (
    <div className="fs20">
      <table className="w-100 fs16">
        <thead>
          <tr className="">
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Token</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Required</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Lack</th>
            <th hidden className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Enough</th>
          </tr>
        </thead>
        <tbody>
            {
              tokens.map((token,index)=>
                <tr key={index} onClick={showLayer.bind(this,{id:'tokenNotEnough'})}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{token.symbol}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{token.balance}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{token.required}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{
                      Number(token.balance - token.required).toFixed(4)>0 ? '0.0000' :
                      <span className="color-red-500">
                        <WebIcon type="exclamation-circle mr5" />
                        {Number(token.required - token.balance).toFixed(4)}
                      </span>
                    }
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
      <Containers.Layers id="tokenNotEnough">
        <UiContainers.Popups id="tokenNotEnough">
          <TokenNotEnough />
        </UiContainers.Popups>
      </Containers.Layers>
    </div>
  )
}
export const TokenList = connect()(TokenListComp)

export const OrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5].map((item,index)=>
            <tr key={index} className="color-black-2">
              { index%2 == 0 && <td className="zb-b-b p10 text-center color-green-500">Buy</td> }
              { index%2 == 1 && <td className="zb-b-b p10 text-center color-red-500">Sell</td> }
              <td className="zb-b-b p10 text-right">0.00095</td>
              <td className="zb-b-b p10 text-right">1000.00</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-center">
              { index === 0 && <WebIcon className="zb-b-b color-red-500" type="exclamation-circle" /> }
              { index === 1 && <WebIcon className="zb-b-b color-blue-500" type="clock-circle" /> }
              { index === 2 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
              { index === 3 && <WebIcon className="zb-b-b color-grey-300" type="close-circle" /> }
              { index === 4 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}




