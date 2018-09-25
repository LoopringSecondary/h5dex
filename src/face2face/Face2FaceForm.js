import React from 'react';
import { List,Button,Toast } from 'antd-mobile';
import { Icon as WebIcon,Button as WebButton,Input } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'
import Notification from 'LoopringUI/components/Notification'
import {isValidNumber, getBalanceBySymbol} from 'modules/tokens/TokenFm'
import {toBig,toHex,toFixed,getDisplaySymbol} from 'LoopringJS/common/formatter'

const Item = List.Item;
const Brief = Item.Brief;

class Face2FaceForm extends React.Component {
  render() {
    const {balance, p2pOrder, dispatch} = this.props
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
    function validateAmountS(value) {
      if(p2pOrder.tokenS && isValidNumber(value)) {
        const tokenBalance = getBalanceBySymbol({balances:balance, symbol:p2pOrder.tokenS, toUnit:true})
        return tokenBalance.balance.gt(value)
      } else {
        return false
      }
    }
    function amountChange(side, e) {
      if(side === 'buy') {
        dispatch({type:'p2pOrder/amountChange', payload:{'amountB':toBig(e.target.value)}})
        if(!isValidNumber(e.target.value)) {
          Toast.info('Please enter valid amount', 3, null, false);
        }
      } else {
        dispatch({type:'p2pOrder/amountChange', payload:{'amountS':toBig(e.target.value)}})
        if(!validateAmountS(e.target.value)){
          Toast.info('You have insufficient balance of '+p2pOrder.tokenS, 3, null, false);
        }
      }
    }
    const submitOrder = ()=>{
      if(!isValidNumber(p2pOrder.amountB)) {
        Toast.info('Please enter valid amount', 3, null, false);
        return
      }
      if(!validateAmountS(p2pOrder.amountS)){
        Toast.info('You have insufficient balance of '+p2pOrder.tokenS, 3, null, false);
        return
      }
      showLayer({id:'face2FaceConfirm'})
    }
    const price = p2pOrder.amountB && p2pOrder.amountB.gt(0) && p2pOrder.amountS && p2pOrder.amountS.gt(0) ? toFixed(p2pOrder.amountB.div(p2pOrder.amountS), 8) : toFixed(toBig(0),8)
    return (
      <div className="">
        <div className="zb-b-b pt25 pb25 pl15 pr15">
          <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-EOS fs24`}/>
              </div>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
              <WebIcon type="arrow-right" className={`color-black-1 fs20`} />
            </div>
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-LRC fs24`}/>
              </div>
            </div>
          </div>
          <div className="row ml0 mr0 mt20 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Button onClick={showLayer.bind(this,{id:'helperOfTokens', side:'sell'})} type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>Sell {p2pOrder.tokenS}</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Button onClick={showLayer.bind(this,{id:'helperOfTokens', side:'buy'})} type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>Buy {p2pOrder.tokenB}</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
          </div>
          <div className="row ml0 mr0 mt20 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Input type="text" onChange={amountChange.bind(this, 'sell')}/>
              {
                false &&
                <div className="d-none fs14 color-black-3 mt5 text-left d-flex justify-content-between">
                  <span>Balance</span>
                  <span>0.0000</span>
                </div>
              }
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Input type="text" onChange={amountChange.bind(this, 'buy')}/>
              {
                false &&
                <div className="d-none fs14 color-black-3 mt5 text-left d-flex justify-content-between">
                  <span>Balance</span>
                  <span>0.0000</span>
                </div>
              }
            </div>
          </div>
          <div className="row ml0 mr0 pt15 pb15 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Exchage Price</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              {`${price} ${p2pOrder.tokenS}/${p2pOrder.tokenB}`}
            </div>
          </div>
          <Button className="" onClick={submitOrder} type="primary">{`Exchange ${p2pOrder.tokenS} To ${p2pOrder.tokenB}`}</Button>
        </div>
      </div>
    );
  }
}
export default connect(({
  sockets,
  p2pOrder
}) => ({
  p2pOrder:p2pOrder,
  balance:sockets.balance.items,
}))(Face2FaceForm)






