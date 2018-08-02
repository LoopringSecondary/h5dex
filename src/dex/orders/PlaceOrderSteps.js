import React from 'react'
import { Icon } from 'antd'
import { Button } from 'antd-mobile'
import { clearHexPrefix, toBig, toHex } from 'LoopringJS/common/formatter'
import config from 'common/config'
import intl from 'react-intl-universal'
import * as orderFormatter from 'modules/orders/formatters'
import Notification from 'LoopringUI/components/Notification'
import { createWallet } from 'LoopringJS/ethereum/account'
import { getTokensByMarket } from 'modules/formatter/common'
import { Page, Pages } from 'LoopringUI/components/Pages'
import { connect } from 'dva'
import moment from 'moment'
import storage from 'modules/storage'
import {signOrder} from '../../common/utils/signUtils'

const OrderMetaItem = (props) => {
  const {label, value,showArrow=false,onClick=()=>{}} = props
  return (
    <div onClick={onClick} className="row ml0 mr0 pl0 pr0 zb-b-t no-gutters" style={{padding:'7px 0px'}}>
      <div className="col">
        <div className="fs14 color-black-2 lh30 text-left">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs14 color-black-1 text-wrap lh30 text-left">{value}</div>
      </div>
      {
        !!showArrow &&
        <div className="col-auto text-right">
          <div className="fs14 text-primary text-wrap lh30 text-left ml5">
            <Icon type="right" />
          </div>
        </div>
      }

    </div>
  )
}
const WalletItem = (props) => {
  const {title, description,icon,layout,showArrow} = props
  if(layout === 'vertical'){
    return (
      <div className="pl10 pr10 pt15 pb15">
        <div className="text-center color-black-1">
          <i className={`fs28 icon-${icon}`}></i>
        </div>
        <div className="fs18">{title}</div>
      </div>
    )
  }else{
    return (
      <div className="row pt15 pb15 pl10 pr10 ml0 mr0 align-items-center zb-b-b no-gutters">
        <div className="col-auto pr5 text-center color-black-1 fs24" style={{minWidth:'40px'}}>
          {typeof icon === 'string' &&
            <i className={`icon-${icon}`}></i>
          }
          {typeof icon !== 'string' && icon}
        </div>
        <div className="col pl10">
          <div className="fs16 color-black-1 text-wrap text-left">{title}</div>
          { description && <div className="fs14 color-black-3 text-left">{description}</div> }
        </div>
        {showArrow &&
          <div className="col-auto text-right color-black-3">
            <Icon type="right" />
          </div>
        }
      </div>
     )
  }
}

const PlaceOrderResult = ({
  }) => {
  return (
    <div className="">
        {
          true &&
          <div className="text-center p15">
            <i className={`fs50 icon-success`}></i>
            <div className="fs24 color-black-1">订单提交成功！</div>
            <div className="row no-gutters mt15">
              <div className="col-6">
                <Button className="m5 fs18" size="" type="default"> 查看订单 </Button>
              </div>
              <div className="col-6">
                <Button className="m5 fs18" size="" type="default"> 继续下单 </Button>
              </div>
            </div>
          </div>
        }
        {
          false &&
          <div className="text-center p15">
            <Icon type="close-circle" className="fs50 text-error" />
            <div className="fs18 color-black-1 mt15">您取消了订单提交</div>
            <div className="mt10">

            </div>
          </div>
        }
    </div>
  );
};
function PlaceOrderSteps(props) {
  const {placeOrder, settings, marketcap, dispatch} = props
  const {side, pair, priceInput, amountInput, validSince, validUntil} = placeOrder
  const total = toBig(amountInput).times(toBig(priceInput)).toString(10)
  const tokens = getTokensByMarket(pair)
  const lrcFeeValue = orderFormatter.calculateLrcFee(marketcap, total, 2, tokens.right)
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
  const showTTL = () => {
    // hideLayer({id:'placeOrderSteps'})
    showLayer({id:'helperOfTTL'})
  }
  const next = async (page) => {
    hideLayer({id:'placeOrderSteps'})
    let order = {};
    order.owner = storage.wallet.getUnlockedAddress()
    order.delegateAddress = config.getDelegateAddress();
    order.protocol = settings.trading.contract.address;
    const tokenB =  side.toLowerCase() === "buy" ? config.getTokenBySymbol(tokens.left) : config.getTokenBySymbol(tokens.right);
    const tokenS = side.toLowerCase() === "sell" ? config.getTokenBySymbol(tokens.left) : config.getTokenBySymbol(tokens.right);
    order.tokenB = tokenB.address;
    order.tokenS = tokenS.address;
    order.amountB = toHex(toBig(side.toLowerCase() === "buy" ? amountInput : total).times('1e' + tokenB.digits));
    order.amountS = toHex(toBig(side.toLowerCase() === "sell" ? amountInput : total).times('1e' + tokenS.digits));
    order.lrcFee = toHex(toBig(lrcFeeValue).times(1e18));
    order.validSince = toHex(validSince.unix());
    order.validUntil = toHex(validUntil.unix());
    order.marginSplitPercentage = 50;
    order.buyNoMoreThanAmountB = side.toLowerCase() === "buy";
    order.walletAddress = config.getWalletAddress();
    order.orderType = 'market_order'
    const authAccount = createWallet()
    order.authAddr = authAccount.getAddressString();
    order.authPrivateKey = clearHexPrefix(authAccount.getPrivateKeyString());
    dispatch({type:'placeOrder/rawOrderChange', payload:{rawOrder:order}})
    // TODO 验证钱包类型
    // page.gotoPage({id:'wallet'})
    const signResult = await signOrder(order)
    if(signResult.error) {
      Notification.open({
        message:intl.get('notifications.title.place_order_failed'),
        description:signResult.error.message,
        type:'error'
      })
      return
    }
    const signedOrder = {...order, ...signResult.result};
    signedOrder.powNonce = 100;
    const response = await window.RELAY.order.placeOrder(signedOrder)
    // console.log('...submit order :', response)
    if (response.error) {
      Notification.open({
        message:intl.get('notifications.title.place_order_failed'),
        description:response.error.message,
        type:'error'
      })
    } else {
      Notification.open({
        message:intl.get('notifications.title.place_order_success'),
        description:intl.get('notifications.message.place_order_success'),
        type:'success'
      })
    }
  }
  return (
    <div className="">
        <Pages active="order">
          <Page id="order" render={({page})=>
            <div>
              <div hidden className="p15 color-black-1 fs18 zb-b-b text-center">
                <div className="row">
                  <div className="col-auto text-left" onClick={hideLayer.bind(this,{id:'placeOrderSteps'})}>
                    <Icon type="close" />
                  </div>
                  <div className="col">{intl.get('place_order.title')}</div>
                  <div className="col-auto color-white">
                    <Icon type="close" />
                  </div>
                </div>
              </div>
              <div className="p15 bg-white">
                <div className="pb20 row ml0 mr0 no-gutters align-items-center justify-content-center">
                  <div className="col-auto">
                    <div className="radius-circle bg-primary color-white d-inline-flex justify-content-center align-items-center" style={{width:"40px",height:'40px'}}>
                      <i className={`icon-token-${side === 'buy' ? tokens.right : tokens.left} fs24`}/>
                    </div>
                  </div>
                  <div className="col-auto pl25 pr25 text-center">
                    <Icon type="swap" className={`color-black-1 fs20`} />
                  </div>
                  <div className="col-auto">
                    <div className="radius-circle bg-primary color-white d-inline-flex justify-content-center align-items-center" style={{width:"40px",height:'40px'}}>
                      <i className={`icon-token-${side === 'buy' ? tokens.left : tokens.right} fs24`}/>
                    </div>
                  </div>
                </div>
                {
                  side === 'buy' &&
                  <div>
                    <OrderMetaItem label={intl.get(`common.buy`)} value={`${amountInput} ${pair.split('-')[0]}`} />
                    <OrderMetaItem label={intl.get(`common.sell`)} value={`${total} ${pair.split('-')[1]}`} />
                  </div>
                }
                {
                  side === 'sell' &&
                  <div>
                    <OrderMetaItem label={intl.get(`common.sell`)} value={`${amountInput} ${pair.split('-')[0]}`} />
                    <OrderMetaItem label={intl.get(`common.buy`)} value={`${total} ${pair.split('-')[1]}`} />
                  </div>
                }
                <OrderMetaItem label={intl.get("common.price")} value={`${priceInput} ${pair}`} />
                <OrderMetaItem showArrow={false} onClick={()=>window.Toast.info('Coming Soon', 1, null, false)} label={intl.get('common.lrc_fee')} value={`${lrcFeeValue} LRC`} />
                <OrderMetaItem showArrow={true} onClick={()=>showTTL()} label={intl.get('common.ttl')} value={`${validSince.format('MM-DD HH:mm')} ~ ${validUntil.format('MM-DD HH:mm')}`}  />
              </div>
              <div>
                <div className="pt10 pb10 clor-black-3 fs12 zb-b-t">
                  <Icon className="mr5" type="exclamation-circle-o" />{intl.get('place_order_confirm.no_cost_gas')}
                </div>
                {
                  false &&
                  <Button type="primary" className="" onClick={next.bind(this, page)}>{intl.get('place_order_confirm.sign_and_submit')}</Button>
                }
                <div className="bg-primary color-white fs16" style={{lineHeight:'44px',height:'44px'}} onClick={next.bind(this, page)}>{intl.get('place_order_confirm.sign_and_submit')}</div>
              </div>
            </div>
          }/>
          <Page id="wallet" render={({page})=>
            <div className="div">
              <div className="p15 color-black-1 fs18 zb-b-b text-center no-gutters">
                <div className="row">
                  <div className="col-auto text-left pl20 pr20" onClick={page.gotoPage.bind(this,{id:'order'})}>
                    <Icon type="left"/>
                  </div>
                  <div className="col">Select Wallet</div>
                  <div className="col-auto color-white pl20 pr20">
                    <Icon type="left"/>
                  </div>
                </div>
              </div>
              <div className="bg-white">
                <WalletItem icon={<i className="icon-LRC fs32" />} title="Loopr" description="Loopring Official Wallet ( pc & mobile )" showArrow={true}/>
                <WalletItem icon="metamaskwallet" title="Metamask" description="Browser wallet ( only pc supported)" showArrow={true}/>
                <WalletItem icon="ledgerwallet" title="Ledger" description="Hardware wallet ( only pc supported)" showArrow={true}/>
                <WalletItem icon="hourglass" title="imToken" description="Comming Soon" showArrow={true}/>
                <WalletItem icon={<Icon type="plus" />} title="More Wallets" description="Comming Soon" showArrow={true}/>
              </div>
            </div>
          }/>
          <Page id="result" render={({page})=>
            <div className="div">
              <div className="p15 color-black-1 fs22 zb-b-b text-center">
                <div className="row">
                  <div className="col text-left">
                    <Icon type="close"/>
                  </div>
                  <div className="col-auto">Result</div>
                  <div className="col"></div>
                </div>
              </div>
              <PlaceOrderResult />
            </div>
          }/>
        </Pages>
    </div>
  )
}
function mapToProps(state) {
  return {
    placeOrder:state.placeOrder,
    settings:state.settings,
    marketcap:state.sockets.marketcap.items
  }
}
export default connect(mapToProps)(PlaceOrderSteps)
