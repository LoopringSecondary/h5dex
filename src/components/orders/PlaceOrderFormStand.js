import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import PlaceOrerConfirm from './PlaceOrderConfirm';
import PlaceOrerAdvance from './PlaceOrderAdvance';
import PlaceOrerPriceHelper from './PlaceOrderPriceHelper';
import PlaceOrerAmountHelper from './PlaceOrderAmountHelper';
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
  }
  render() {
    const showLayer = (payload={})=>{
      this.props.dispatch({
        type:'layers/showLayer',
        payload:{
          ...payload
        }
      })
    }
    const hideLayer = (payload={})=>{
      this.props.dispatch({
        type:'layers/hideLayer',
        payload:{
          ...payload
        }
      })
    }
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div className="bg-grey-100">
        <NavBar
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
        <div className="row ml0 mr0 bg-white zb-b-t" style={{positiom:'relative',zIndex:'10'}}>
          <div className="col-6 text-center fs20 color-black pt15 pb15 zb-b-b " >Buy LRC</div>
          <div className="col-6 text-center fs20 pt15 pb15 zb-b-l font-weight-bold color-red-500 " >Sell LRC</div>
        </div>
        <List className="bg-none no-border">
          <InputItem
            {...getFieldProps('money3')}
            type={type}
            placeholder="0.00000000"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<WebIcon type="profile" />}
          >Price</InputItem>
          <InputItem
            type={type}
            placeholder="0.00000000"
            clear
            moneyKeyboardAlign="left"
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            extra={<WebIcon type="profile" />}
          >Amount</InputItem>
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
            >Total</InputItem>
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
              <div className="col color-grey-400 fs20 pl0">Advanced</div>
              <div className="col-auto color-black-3 fs16 pr0"><WebSwitch size="" /></div>
            </div>
            <Button className="w-100 d-block mb10" type="warning">Place Sell Order</Button>
          </Item>
        </List>
        <div className="no-underline">
          <Tabs
            tabBarBackgroundColor="#f5f5f5"
            tabs={
              [
                { title: <Badge count={2} className="text-left d-block w-100 pl10">My Balances</Badge> },
                { title: <Badge >My Orders</Badge> },
                { title: <Badge className="d-block w-100 text-right pr10">My Fills</Badge> },
              ]
            }
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div className="bg-grey-100">
              <BalanceList />
            </div>
            <div>
              <OrderList />
            </div>
            <div style={{minHeight: '150px'}}>

            </div>
          </Tabs>
        </div>
        {
          false &&
          <div className="p10 bg-white" style={{position:'absolute',bottom:'0',left:'0',right:'0'}}>
            <Button className="w-100 d-block" type="primary">Place Buy Order</Button>
          </div>
        }
        <PlaceOrderConfirmPopup  />
        <PlaceOrderAdvancePopup />
        <PlaceOrderPriceHelperPopup />
        <PlaceOrderAmountHelperPopup />
      </div>
    );
  }
}

const PlaceOrderForm = createForm(({layers})=>({layers}))(PlaceOrder);
export default PlaceOrderForm

export const BalanceList = ()=>{
  return (
    <table className="w-100">
      <thead>
        <tr className="">
          <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Token</th>
          <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
          <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Required</th>
          <th className="text-center zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Status</th>
        </tr>
      </thead>
      <tbody>
          <tr >
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">LRC</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">12680.0000</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">1000.0000</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
              <WebIcon className="text-warning" type="exclamation-circle" />
            </td>
          </tr>
          <tr >
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">ETH</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">85.0000</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">45.0000</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
              <WebIcon className="text-success" type="check-circle" />
            </td>
          </tr>
          <tr >
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">WETH</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">21.3652</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">26.1278</td>
            <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
              <WebIcon className="text-success" type="check-circle" />
            </td>
          </tr>
      </tbody>
    </table>
  )
}

export const OrderList = ()=>{
  return (
    <table className="w-100">
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
              { index%2 == 0 && <td className="zb-b-b p10 text-center text-up">Buy</td> }
              { index%2 == 1 && <td className="zb-b-b p10 text-center text-down">Sell</td> }
              <td className="zb-b-b p10 text-right">0.00095</td>
              <td className="zb-b-b p10 text-right">1000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-center">
              { index === 0 && <WebIcon className="zb-b-b text-warning" type="exclamation-circle" /> }
              { index === 1 && <WebIcon className="zb-b-b text-primary" type="clock-circle" /> }
              { index === 2 && <WebIcon className="zb-b-b text-success" type="check-circle" /> }
              { index === 3 && <WebIcon className="zb-b-b color-grey-300" type="close-circle" /> }
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export const PlaceOrderConfirmPopup = ()=>{
  return (
    <Modal
      popup
      visible={false}
      onClose={()=>{}}
      animationType="slide-up"
    >
      <PlaceOrerConfirm />
    </Modal>
  )
}
export const PlaceOrderAdvancePopup = ()=>{
  return (
    <Modal
      popup
      visible={false}
      onClose={()=>{}}
      animationType="slide-up"
    >
      <PlaceOrerAdvance />
    </Modal>
  )
}
export const PlaceOrderPriceHelperPopup = ()=>{
  return (
    <Modal
      popup
      visible={false}
      onClose={()=>{}}
      animationType="slide-up"
    >
      <PlaceOrerPriceHelper />
    </Modal>
  )
}
export const PlaceOrderAmountHelperPopup = ()=>{
  return (
    <Modal
      popup
      visible={false}
      onClose={()=>{}}
      animationType="slide-up"
    >
      <PlaceOrerAmountHelper />
    </Modal>
  )
}




