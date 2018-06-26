import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps,Toast } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'
import {getTokensByMarket} from 'modules/formatter/common'
import {toBig,toHex,getDisplaySymbol} from 'LoopringJS/common/formatter'
import intl from 'react-intl-universal';
import * as orderFormatter from 'modules/orders/formatters'
import moment from 'moment'
import config from 'common/config'
import Notification from 'LoopringUI/components/Notification'
import storage from 'modules/storage'



const Item = List.Item;

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  }
}
const PlaceOrderForm = (props)=>{
  const {dispatch,placeOrder,lastPrice,marketcap,balance,preference,trading} = props
  const {side,pair} = placeOrder
  const tokens = getTokensByMarket(pair)
  let amount = placeOrder.amountInput
  let price = placeOrder.priceInput
  if(!placeOrder.priceChanged && price === '0' && lastPrice) {
    dispatch({
      type:'placeOrder/priceChangeEffects',
      payload:{
        price:lastPrice
      }
    })
  }
  const total = (Number(amount) > 0) && (Number(price) > 0) ? toBig(amount).times(toBig(price)).toString(10) : 0
  let sell = {}, buy = {}
  if(side === 'buy') {
    sell = {token : tokens.right}
    buy = {token : tokens.left}
  } else {
    sell = {token : tokens.left}
    buy = {token : tokens.right}
  }
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
  const amountChange = (value)=>{
     dispatch({
       type:'placeOrder/amountChange',
       payload:{
         amountInput:value
       }
     })
  }
  const priceChange = (value)=>{
     dispatch({
       type:'placeOrder/priceChangeEffects',
       payload:{
         price:value
       }
     })
  }
  const showAdvanceChange = (value)=>{
    dispatch({
      type:'placeOrder/showAdvanceChange',
      payload:{
        showAdvance:true
      }
    })
    showLayer({id:'helperOfAdvance'})
  }
  const toConfirm = async () => {
    if (Number(price) <= 0) {
      Toast.info('Please enter valid price', 3, null, false);
      return
    }
    if (Number(amount) <= 0) {
      Toast.info('Please enter valid amount', 3, null, false);
      return
    }
    if(price !== placeOrder.priceInput) {
      priceChange(price)
    }
    if(!storage.wallet.getUnlockedAddress()) {
      Notification.open({
        message: intl.get('notifications.title.place_order_failed'),
        type: "error",
        description: intl.get('notifications.message.wallet_locked')
      });
      return
    }
    if(!balance || !marketcap) {
      Notification.open({
        message:intl.get('notifications.title.place_order_failed'),
        description:intl.get('notifications.message.failed_fetch_data_from_server'),
        type:'error'
      })
      return
    }
    const total = toBig(price).times(amount)
    const totalWorth = orderFormatter.calculateWorthInLegalCurrency(marketcap, tokens.right, total)
    if(!totalWorth.gt(0)) {
      Notification.open({
        message:intl.get('notifications.title.place_order_failed'),
        description:intl.get('notifications.message.failed_fetch_data_from_server'),
        type:'error'
      })
      return
    }
    let allowed = false
    let currency = preference.currency;
    let priceSymbol = getDisplaySymbol(currency)
    if(currency === 'USD') {
      priceSymbol = '100' + priceSymbol
      if(totalWorth.gt(100)) {
        allowed = true
      }
    } else {
      priceSymbol = '500' + priceSymbol
      if(totalWorth.gt(500)) {
        allowed = true
      }
    }
    if(!allowed) {
      Notification.open({
        message:intl.get('notifications.title.not_allowed_place_order_worth'),
        description:intl.get('notifications.message.not_allowed_place_order_worth', {worth: priceSymbol}),
        type:'error'
      })
      return
    }
    showLayer({id:'placeOrderSteps'})
  }
  const showAmountHelper = () => {
    if(side === 'buy') {
      if(Number(price) > 0) {
        showLayer({id:'helperOfAmount',side:'sell'})
      } else {
        Toast.info('Please enter valid price', 3, null, false);
      }
    } else {
      showLayer({id:'helperOfAmount',side:'sell'})
    }
  }
  return (
    <div>
       <div hidden className="pl10 pr10 pt10 pb5 bg-white">
         <div className="divider 1px zb-b-b"></div>
         <SegmentedControl values={['Buy LRC', 'Sell LRC']} style={{height:'40px'}}/>
       </div>
       <List className="bg-none no-border">
        <InputItem
          type="money"
          placeholder="00.000000"
          value={price ? price : null}
          clear
          moneyKeyboardAlign="right"
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          extra={<WebIcon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={showLayer.bind(this,{id:'helperOfPrice',side:'sell'})} />}
          onChange={priceChange}
        ><div className="fs16">Price</div></InputItem>
      </List>
      <List className="bg-none no-border">
        <InputItem
          type="money"
          placeholder="00.000000"
          value={amount ? amount : null}
          clear
          onChange={amountChange}
          moneyKeyboardAlign="right"
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          extra={<WebIcon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={showAmountHelper} />}
        ><div className="fs16">Amount</div></InputItem>
      </List>
      {
        false &&
        <List className="bg-none no-border">
          <InputItem
            type="money"
            placeholder="00.000000"
            value={total}
            clear
            moneyKeyboardAlign="right"
            onChange={(v) => { console.log('onChange', v); }}
            onBlur={(v) => { console.log('onBlur', v); }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            editable={false}
          ><div className="fs16">Total</div></InputItem>
        </List>
      }
      <List className="bg-none no-border">
        {
          false &&
          <InputItem
            type="money"
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
            type="money"
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
          <div hidden className="row align-items-center ml0 mr0 mb15 mt10">
            <div className="col color-black-3 fs16 pl0">Total</div>
            <div className="col-auto color-black-3 fs16 pr0">
              {total} {tokens.right}
            </div>
          </div>
          <div className="row align-items-center ml0 mr0 mb15 mt10">
            <div className="col color-black-3 fs16 pl0">
              Total {total} {tokens.right}
            </div>
            <div className="col-auto color-black-3 fs16 pr0">
              Advance <WebSwitch value={placeOrder.showAdvance} onChange={showAdvanceChange} />
            </div>
          </div>
          {
            side === 'sell' &&
            <Button onClick={toConfirm} className="w-100 d-block mb10 color-white bg-red-500" type="warning">
            Total {total} {tokens.right}
            </Button>
          }
          {
            side === 'buy' &&
            <Button onClick={toConfirm} className="w-100 d-block mb10 bg-green-500 color-white">
            Total {total} {tokens.right}
            </Button>
          }
        </Item>
      </List>

    </div>
  )
}
export default connect(({
  placeOrder,
  sockets:{tickers, balance, marketcap},
  settings:{preference,trading}
})=>({
  placeOrder,
  lastPrice:tickers.item.loopr ? tickers.item.loopr.last : null,
  balance:balance.items ? balance.items : null,
  marketcap:marketcap.items ? marketcap.items : null,
  preference,trading
}))(PlaceOrderForm)







