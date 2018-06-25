import React from 'react';
import { Input,Icon,Button as WebButton } from 'antd';
import { Modal,List,Button,Accordion,Steps} from 'antd-mobile';
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
import * as tokenFormatter from 'modules/tokens/TokenFm'
import {toBig,toHex,toFixed,getDisplaySymbol,clearHexPrefix} from 'LoopringJS/common/formatter'

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
function PlaceOrderSteps(props) {
  const {p2pOrder, balance, settings, marketcap, pendingTx, dispatch} = props
  const gasPrice = 10
  const {tokenS, tokenB, amountS, amountB} = p2pOrder
  const balanceS = tokenS ? tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokenS, toUnit:true}).balance : toBig(0)
  const balanceB = tokenB ? tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokenB, toUnit:true}).balance : toBig(0)
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
  const next = async (page) => {
    const tradeInfo = {}
    tradeInfo.amountB = amountB
    tradeInfo.amountS = amountS
    tradeInfo.tokenB = tokenB
    tradeInfo.tokenS = tokenS
    tradeInfo.validSince = moment().unix()
    tradeInfo.validUntil = moment().add(1, 'months').unix()
    tradeInfo.marginSplit = 0
    tradeInfo.milliLrcFee = 0
    tradeInfo.lrcFee = 0
    tradeInfo.delegateAddress = config.getDelegateAddress();
    tradeInfo.protocol = settings.trading.contract.address;
    tradeInfo.gasLimit = config.getGasLimitByType('approve').gasLimit;
    tradeInfo.gasPrice = toHex(Number(gasPrice) * 1e9);
    tradeInfo.orderType = 'p2p_order'
    try {
      await orderFormatter.p2pVerification(balance, tradeInfo, pendingTx ? pendingTx.items : [], gasPrice)
    } catch(e) {
      console.log(e)
      Notification.open({
        message: intl.get('notifications.title.place_order_failed'),
        description: e.message,
        type:'error'
      })
      dispatch({type:'p2pOrder/loadingChange', payload:{loading:false}})
      return
    }
    if(tradeInfo.error) {
      tradeInfo.error.map(item=>{
        if(item.value.symbol === 'ETH') {
          Notification.open({
            message: intl.get('notifications.title.place_order_failed'),
            description: intl.get('notifications.message.eth_is_required_when_place_order', {required:item.value.required}),
            type:'error',
            actions:(
              <div>
                <Button className="alert-btn mr5" onClick={() => dispatch({type:'layers/showLayer', payload: {id: 'receiveToken', symbol:'ETH'}})}>
                  {`${intl.get('actions.receive')} ETH`}
                </Button>
              </div>
            )
          })
        } else if (item.value.symbol === 'LRC') {
          Notification.open({
            message: intl.get('notifications.title.place_order_failed'),
            description: intl.get('notifications.message.lrcfee_is_required_when_place_order', {required:item.value.required}),
            type:'error',
            actions:(
              <div>
                <Button className="alert-btn mr5" onClick={() => dispatch({type:'layers/showLayer', payload: {id: 'receiveToken', symbol:'LRC'}})}>
                  {`${intl.get('actions.receive')} LRC`}
                </Button>
              </div>
            )
          })
        }
      })
      dispatch({type:'p2pOrder/loadingChange', payload:{loading:false}})
      return
    }
    try {
      const {order, unsigned} = await orderFormatter.signP2POrder(tradeInfo, window.Wallet.adress)
      const signResult = await window.Wallet.signOrder(order)
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
          message:intl.get('notifications.title.place_order_failed'),
          description:'successfully submit order',
          type:'info'
        })
      }
    } catch (e) {
      console.log(e)
      Notification.open({
        message: intl.get('notifications.title.place_order_failed'),
        description:e.message,
        type:'error'
      })
    }
  }
  return (
    <div className="">
        <Pages active="order">
          <Page id="order" render={({page})=>
            <div>
              <div className="p15 color-black-1 fs18 zb-b-b text-center">
                <div className="row">
                  <div className="col-auto text-left" onClick={hideLayer.bind(this,{id:'face2FaceConfirm'})}>
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
                      <i className={`icon-${tokenS} fs24`}/>
                    </div>
                  </div>
                  <div className="col-auto pl25 pr25 text-center">
                    <Icon type="swap" className={`color-black-1 fs20`} />
                  </div>
                  <div className="col-auto">
                    <div className="color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                      <i className={`icon-${tokenB} fs24`}/>
                    </div>
                  </div>
                </div>
                <OrderMetaItem label="矿工撮合费" value="2.2 LRC" />
                <OrderMetaItem label="订单有效期" value="06-10 10:38 ~ 06-30 10:38" />
                <Button type="" className="bg-grey-900 color-white mt15" onClick={next.bind(this, page)}>签名</Button>
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
                  <div className="col">Qrcode</div>
                  <div className="col-auto color-white pl20 pr20">
                    <Icon type="left"/>
                  </div>
                </div>
              </div>
              <div className="bg-white p15">
                <img style={{width:'240px',height:'240px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAIAAAAI7H7bAAAFNElEQVR4nO3dQW4jORAAQWux//+y97onYlCTpqrliKthqdVSgocCm6/v7+8v4O/88+4LgE8gJAgICQJCgoCQICAkCAgJAkKCwL+Hv71er2vXkfvUQfPhSzl85Py/DvIXXOL8i7IiQUBIEBASBIQEASFBQEgQEBIEhASB00D2YMm4czbgWzLTXHIPZ/KLX3I3xiNjKxIEhAQBIUFASBAQEgSEBAEhQUBIEBgOZA/yXZCPnv0tmTPOLLn4/b+oLysSJIQEASFBQEgQEBIEhAQBIUFASBDoB7KPtmQb7CNGkPyfFQkCQoKAkCAgJAgICQJCgoCQICAkCBjI/qmbDx+eDX+Ncd/IigQBIUFASBAQEgSEBAEhQUBIEBASBPqB7P4p3s3Rar7l9uBTD8Dd/4v6siJBQkgQEBIEhAQBIUFASBAQEgSEBIHhQDbfjLnf/unkzanr/qc0X2ZFgoCQICAkCAgJAkKCgJAgICQICAkCr0dsP2zt3yG7xKMv/jIrEgSEBAEhQUBIEBASBIQEASFBQEgQ2HKG7M0Nkje3i36qJY9invmJQbMVCQJCgoCQICAkCAgJAkKCgJAgICQInHbILjnJdCYfki65wv2X8anj6fOdtyJBQEgQEBIEhAQBIUFASBAQEgSEBIEtjyxeMsXLzz/dPz+dvdf+n83lj2xFgoCQICAkCAgJAkKCgJAgICQICAkC/SOLb07x8qHbkl2rS97rYM8ktH2vMSsSBIQEASFBQEgQEBIEhAQBIUFASBAYPrJ4yTmh+RUad77rBZewQxbeSUgQEBIEhAQBIUFASBAQEgSEBIHhDtkl+xlvzv5uDn9vvuDM/gH65YdgW5EgICQICAkCQoKAkCAgJAgICQJCgsDHniG7ZGI4s2TOuP8e5lc4fi8rEgSEBAEhQUBIEBASBIQEASFBQEgQGD6yOLfknNCbE8MlL/ipLj+z2ooEASFBQEgQEBIEhAQBIUFASBAQEgSGO2SXPLI4t+Tk2V945Ov+KzyzIkFASBAQEgSEBAEhQUBIEBASBIQEgdMZsrNJ6JKHD8/kF79/zrj/+1py8qxHFsOPExIEhAQBIUFASBAQEgSEBAEhQeA0kL15QGf+grOLX/KRb27UXfKRD5ZsWz6zIkFASBAQEgSEBAEhQUBIEBASBIQEgeEji4dvtmMzZr538qZHTCdbNyfyY1YkCAgJAkKCgJAgICQICAkCQoKAkCBwGsjuH4TtH0Hm93DJXHg/A1l4HiFBQEgQEBIEhAQBIUFASBAQEgSu7pBdYslM8+b23tkLzuw/Q/ZgfPFWJAgICQJCgoCQICAkCAgJAkKCgJAgcDpDdsngcmbJgar79wvf3I1780Zd/iqtSBAQEgSEBAEhQUBIEBASBIQEASFB4DSQPViyr3bJyPjRW1Mfsf90cBk3J/JfViRICAkCQoKAkCAgJAgICQJCgoCQIDAcyB4smTPO3JxOHszea8l5tTen5DdH4XbIwo8TEgSEBAEhQUBIEBASBIQEASFBoB/I7nfz6bj5THPJ3uSZ2Y3K/+vADll4JyFBQEgQEBIEhAQBIUFASBAQEgR+40A2d3N+un8P76M5QxbeSUgQEBIEhAQBIUFASBAQEgSEBIF+IPsLR3Wz/9o/q/3Ur/InWJEgICQICAkCQoKAkCAgJAgICQJCgsBwIHvznND98iNfDy9483jZ3JLtvQceWQzvJCQICAkCQoKAkCAgJAgICQJCgsDLLkj4e1YkCAgJAkKCgJAgICQICAkCQoKAkCAgJAj8B6HZGCr9Rw1/AAAAAElFTkSuQmCC" />
              </div>
            </div>
          }/>
        </Pages>
    </div>
  )
}
function mapToProps(state) {
  return {
    p2pOrder:state.p2pOrder,
    balance:state.sockets.balance.items,
    marketcap:state.sockets.marketcap.items,
    tokens:state.tokens.items,
    settings:state.settings,
    pendingTx:state.pendingTx
  }
}
export default connect(mapToProps)(PlaceOrderSteps)
