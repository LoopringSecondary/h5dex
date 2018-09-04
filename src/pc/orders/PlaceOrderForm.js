import React from 'react'
import { Button, InputItem, List, SegmentedControl, Toast } from 'antd-mobile'
import { Icon as WebIcon,Affix } from 'antd'
import { connect } from 'dva'
import { getTokensByMarket } from 'modules/formatter/common'
import { getDisplaySymbol, toBig} from 'LoopringJS/common/formatter'
import intl from 'react-intl-universal'
import * as orderFormatter from 'modules/orders/formatters'
import moment from 'moment'
import config from 'common/config'
import Notification from 'LoopringUI/components/Notification'
import storage from 'modules/storage'
import Worth from 'modules/settings/Worth'

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
  const marketConfig = config.getMarketBySymbol(tokens.left, tokens.right)
  const right = config.getTokenBySymbol(tokens.right)
  const amountPrecision = Math.max(0, right.precision - marketConfig.pricePrecision)
  let amount = placeOrder.amountInput
  let price = placeOrder.priceInput
  let lastPriceFormated = lastPrice
  if(pair) {
    const marketConfig = config.getMarketBySymbol(tokens.left, tokens.right)
    if(marketConfig) {
      lastPriceFormated = orderFormatter.formatPriceByMarket(lastPrice, marketConfig)
    }
  }
  if(!placeOrder.priceChanged && Number(lastPriceFormated) !== Number(price)) {
    dispatch({
      type:'placeOrder/priceChange',
      payload:{
        priceInput:lastPriceFormated
      }
    })
  }
  const submitEnable = orderFormatter.isValidAmount(price) && orderFormatter.isValidAmount(amount)
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
   const sideChange = (e)=>{
     const side = e.nativeEvent.selectedSegmentIndex === 0 ? 'buy' : 'sell'
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
    if (!orderFormatter.isValidAmount(price)) {
      Toast.info(intl.get('common.invalid_item', {item: intl.get('common.price')}), 1, null, false);
      return
    }
    if (!orderFormatter.isValidAmount(amount)) {
      Toast.info(intl.get('common.invalid_item', {item: intl.get('common.amount')}), 1, null, false);
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
      priceSymbol = '10' + priceSymbol
      if(totalWorth.gt(10)) {
        allowed = true
      }
    } else {
      priceSymbol = '50' + priceSymbol
      if(totalWorth.gt(50)) {
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
    const validSince = moment()
    const validUntil = moment().add(1, 'months')
    dispatch({type:'placeOrder/validTimeChange', payload:{validSince, validUntil}})
    showLayer({id:'placeOrderSteps'})
  }
  const showAmountHelper = () => {
    if(side === 'buy') {
      if(Number(price) > 0) {
        showLayer({id:'helperOfAmount',side:'sell'})
      } else {
        Toast.info(intl.get('common.invalid_item', {item: intl.get('common.price')}), 1, null, false);
      }
    } else {
      showLayer({id:'helperOfAmount',side:'sell'})
    }
  }
  const menu1 = `${intl.get("common.buy")} ${tokens.left}`
  const menu2 = `${intl.get("common.sell")} ${tokens.left}`
  return (
    <div>
      <div className="bg-white p15">
        <div className="segmented-fs16 mb10">
          <SegmentedControl
            values={[menu1, menu2]}
            style={{height:'40px'}}
            className="m-auto"
            selectedIndex={side === 'buy' ? 0 : 1}
            onChange={sideChange}
          />
        </div>
         <List className="no-border am-list-bg-none selectable">
          <InputItem
            type="money"
            placeholder={`0.${'0'.repeat(marketConfig.pricePrecision)}`}
            value={price ? price : null}
            clear={false}
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            className="circle h-default"
            extra={
              <div style={{width:'auto',textAlign:'right'}}>
                <span className="mr10 color-black-3"><Worth amount={price} symbol={tokens.right}/></span>
                <span className="color-black-3">{tokens.right}</span>
                <WebIcon hidden className="text-primary" type="question-circle-o" style={{padding:'2px 0px 5px'}} onClick={showAmountHelper} />
              </div>
            }
            onChange={priceChange}
          ><div className="fs14 color-black-3 pr5">{intl.get("common.price")}</div></InputItem>
          <InputItem
            type="money"
            placeholder={amountPrecision > 0 ? `0.${'0'.repeat(amountPrecision)}` : '0'}
            value={amount ? amount : null}
            clear={false}
            onChange={amountChange}
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            className="circle h-default mt10"
            extra={
              <div style={{width:'auto',textAlign:'right'}}>
                <WebIcon className="text-primary mr10" type="question-circle-o" style={{padding:'2px 0px 5px'}} onClick={showAmountHelper} />
                <span className="mr5 color-black-3">{tokens.left}</span>
              </div>
            }
          ><div className="fs14 color-black-3 pr5">{intl.get("common.amount")}</div></InputItem>
          <InputItem
            type="money"
            placeholder={amountPrecision > 0 ? `0.${'0'.repeat(amountPrecision)}` : '0'}
            value={amount ? amount : null}
            clear={false}
            onChange={amountChange}
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            className="circle h-default mt10"
            extra={
              <div style={{width:'auto',textAlign:'right'}}>
                <span className="mr5 color-black-3">{tokens.right}</span>
              </div>
            }
          ><div className="fs14 color-black-3 pr5">{intl.get("common.total")}</div></InputItem>
          <Affix>
            {
              side === 'sell' &&
              <Button onClick={toConfirm} className={`w-100 d-block mt10 fs16 ${submitEnable ? " " : "t-light-bak"}`} type={"primary"} disabled={false}>
                <div className="row ml0 mr0 no-gutters">
                  <div className="col">{amount ? amount : 0} {tokens.left}</div>
                  <div className="col-auto" style={{background:'rgba(0,0,0,0.05)',padding:'0 1.2rem'}}>→</div>
                  <div className="col">{total} {tokens.right}</div>
                </div>
              </Button>
            }
            {
               side === 'buy' &&
              <Button onClick={toConfirm} className={`w-100 d-block mt10 fs16 ${submitEnable ? " " : "t-light-bak"}`} type={"primary"} disabled={false}>
                <div className="row ml0 mr0 no-gutters">
                  <div className="col">{total} {tokens.right}</div>
                  <div className="col-auto" style={{background:'rgba(0,0,0,0.05)',padding:'0 1.2rem'}}>→</div>
                  <div className="col">{amount ? amount : 0} {tokens.left}</div>
                </div>
              </Button>
            }
          </Affix>
        </List>
      </div>
      <div className="divider 1px zb-b-t"></div>
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







