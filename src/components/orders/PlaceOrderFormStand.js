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
        <div>
           <List className="bg-none no-border">
            <InputItem
              {...getFieldProps('money3')}
              type={type}
              placeholder="0.00000000"
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              extra={<WebIcon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={showLayer.bind(this,{id:'placeOrderPriceHelper',side:'sell'})} />}
            ><div className="fs20">Price</div></InputItem>
          </List>
          <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="0.00000000"
              clear
              moneyKeyboardAlign="left"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              extra={<WebIcon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={showLayer.bind(this,{id:'placeOrderAmountHelper',side:'sell'})} />}
            ><div className="fs20">Amount</div></InputItem>
          </List>
          <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="0.00000000"
              extra={<WebIcon type="exclamation-circle-o" onClick={()=>{}} />}
              clear
              moneyKeyboardAlign="left"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              editable={false}
            ><div className="fs20">Total</div></InputItem>
          </List>
          <List className="bg-none no-border">
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

    }
    return (
      <div className="bg-grey-100">
        <NavBar
          className=""
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="bars" /></span>,
          ]}
          rightContent={[
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="line-chart" /></span>
          ]}
        >
        LRC-WETH
        </NavBar>
        <div className="no-underline tabs-no-border h-50 place-order-form">
          <Tabs
            tabs={
              [
                { title: <div className="fs20">Buy LRC</div> },
                { title: <div className="fs20">Sell LRC</div> },
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
                { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">Opens</Badge> },
                { title: <Badge className="text-center pt10 pb10 d-block w-100">Fills</Badge> },
                { title: <Badge className="pr10  pt10 pb10 text-center d-block w-100">History</Badge> },
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
              <OpenOrderList />
            </div>
            <div>
              <FillList />
            </div>
            <div>
              <HistoryOrderList />
            </div>
          </Tabs>
          <div className="pb50"></div>
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
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Selling</th>
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

export const OpenOrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2">
              <td hidden className="zb-b-b p10 text-center">
                {index%2 == 0 && <span className="color-green-500">Buy</span>}
                {index%2 == 1 && <span className="color-red-500">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 == 0 && <span className="color-green-500">0.00095000</span>}
                {index%2 == 1 && <span className="color-red-500">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index <=2 && <WebIcon className="zb-b-b color-red-500" type="exclamation-circle" /> }
                { index >=3 && <WebIcon className="zb-b-b color-blue-500" type="clock-circle" /> }
              </td>
            </tr>
          )
        }
        <tr className="color-black-2">
          <td colSpan={10} className="zb-b-b p15 text-center">
              <Button className="color-grey-600">All Orders</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export const HistoryOrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2">
              <td hidden className="zb-b-b p10 text-center">
                {index%2 == 0 && <span className="color-green-500">Buy</span>}
                {index%2 == 1 && <span className="color-red-500">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 == 0 && <span className="color-green-500">0.00095000</span>}
                {index%2 == 1 && <span className="color-red-500">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index%3 === 0 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
                { index%3 === 1 && <WebIcon className="zb-b-b color-black-4" type="close-circle" /> }
                { index%3 === 2 && <WebIcon className="zb-b-b color-black-4" type="clock-circle" /> }
              </td>
            </tr>
          )
        }
        <tr className="color-black-2">
          <td colSpan={10} className="zb-b-b p15 text-center">
              <Button className="color-grey-600">All Orders</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}





