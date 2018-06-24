import React from 'react';
import { Input,Icon,Button as WebButton } from 'antd';
import { Modal,List,Button,Accordion,Steps} from 'antd-mobile';
import {toBig, toHex, clearHexPrefix} from 'LoopringJS/common/formatter'
import config from 'common/config'
import intl from 'react-intl-universal';
import * as datas from 'common/config/data'
import eachLimit from 'async/eachLimit';
import * as orderFormatter from 'modules/orders/formatters'
import Notification from 'LoopringUI/components/Notification'
import {createWallet} from 'LoopringJS/ethereum/account';
import * as uiFormatter from 'modules/formatter/common'
import QRCode from 'qrcode.react';
import Alert from 'LoopringUI/components/Alert'
import {Pages,Page} from 'LoopringUI/components/Pages'
import {connect} from 'dva'
import {getTokensByMarket} from 'modules/formatter/common'
import moment from 'moment'

const OrderMetaItem = (props) => {
  const {label, value} = props
  return (
    <div className="row ml0 mr0 pl0 pr0 zb-b-t no-gutters" style={{padding:'7px 0px'}}>
      <div className="col">
        <div className="fs14 color-black-1 lh25 text-left">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs14 color-black-2 text-wrap lh25 text-left">{value}</div>
      </div>
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
  const {side, pair, priceInput, amountInput} = placeOrder
  const total = toBig(amountInput).times(toBig(priceInput)).toString(10)
  const tokens = getTokensByMarket(pair)
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
  const next = (page) => {
    let order = {};
    // TODO mock datas
    order.owner = window.Wallet.getCurrentAccount()
    // order.owner = '0xEF68e7C694F40c8202821eDF525dE3782458639f'
    order.delegateAddress = config.getDelegateAddress();
    order.protocol = settings.trading.contract.address;
    const tokenB =  side.toLowerCase() === "buy" ? config.getTokenBySymbol(tokens.left) : config.getTokenBySymbol(tokens.right);
    const tokenS = side.toLowerCase() === "sell" ? config.getTokenBySymbol(tokens.left) : config.getTokenBySymbol(tokens.right);
    order.tokenB = tokenB.address;
    order.tokenS = tokenS.address;
    order.amountB = toHex(toBig(side.toLowerCase() === "buy" ? amountInput : total).times('1e' + tokenB.digits));
    order.amountS = toHex(toBig(side.toLowerCase() === "sell" ? amountInput : total).times('1e' + tokenS.digits));
    const lrcFeeValue = orderFormatter.calculateLrcFee(marketcap, total, 2, tokens.right)
    order.lrcFee = toHex(toBig(lrcFeeValue).times(1e18));
    const validSince = moment().unix()
    const validUntil = moment().add(3600, 'seconds').unix()
    order.validSince = toHex(validSince);
    order.validUntil = toHex(validUntil);
    order.marginSplitPercentage = 50;
    order.buyNoMoreThanAmountB = side.toLowerCase() === "buy";
    order.walletAddress = config.getWalletAddress();
    order.orderType = 'market_order'
    const authAccount = createWallet()
    order.authAddr = authAccount.getAddressString();
    order.authPrivateKey = clearHexPrefix(authAccount.getPrivateKeyString());
    dispatch({type:'placeOrder/rawOrderChange', payload:{rawOrder:order}})
    page.gotoPage({id:'wallet'})
  }
  return (
    <div className="">
        <Pages active="order">
          <Page id="order" render={({page})=>
            <div>
              <div className="p15 color-black-1 fs18 zb-b-b text-center">
                <div className="row">
                  <div className="col-auto text-left" onClick={hideLayer.bind(this,{id:'placeOrderSteps'})}>
                    <Icon type="close" />
                  </div>
                  <div className="col">Place Order</div>
                  <div className="col-auto color-white">
                    <Icon type="close" />
                  </div>
                </div>
              </div>
              <div className="p20 bg-white">
                <div className="pb20 row ml0 mr0 no-gutters align-items-center justify-content-center">
                  <div className="col-auto">
                    <div className=" color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                      <i className={`icon-${side === 'buy' ? tokens.right : tokens.left} fs24`}/>
                    </div>
                  </div>
                  <div className="col-auto pl25 pr25 text-center">
                    <Icon type="swap" className={`color-black-1 fs20`} />
                  </div>
                  <div className="col-auto">
                    <div className="color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                      <i className={`icon-${side === 'buy' ? tokens.left : tokens.right} fs24`}/>
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
                <OrderMetaItem label="价格" value={`${priceInput} ${pair.split('-')[1]}`} />
                <OrderMetaItem label="矿工撮合费" value="2.2 LRC" />
                <OrderMetaItem label="订单有效期" value="06-10 10:38 ~ 06-30 10:38" />
                {
                  side === 'buy' &&
                  <Button type="" className="bg-grey-900 color-white mt15" onClick={next.bind(this, page)}>Next</Button>
                }
                {
                  side === 'sell' &&
                  <Button className="bg-grey-900 color-white mt15" onClick={next.bind(this, page)}>Next</Button>
                }
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
