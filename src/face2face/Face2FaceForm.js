import React from 'react'
import { Button, Toast } from 'antd-mobile'
import { Icon as WebIcon, Input } from 'antd'
import { connect } from 'dva'
import { getBalanceBySymbol, isValidNumber } from 'modules/tokens/TokenFm'
import { getDisplaySymbol, toBig, toFixed, toHex } from 'LoopringJS/common/formatter'
import intl from 'react-intl-universal'



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
      if(p2pOrder.tokenS) {
        const tokenBalance = getBalanceBySymbol({balances:balance, symbol:p2pOrder.tokenS, toUnit:true})
        return tokenBalance.balance.gt(value)
      } else {
        return false
      }
    }
    function amountChange(side, e) {
      const  value = Number(e.target.value).toString()
      if(side === 'buy') {
        if(!isValidNumber(value)) {
          Toast.info(intl.get('notifications.title.invalid_number'), 3, null, false);
          return;
        }
        dispatch({type:'p2pOrder/amountChange', payload:{'amountB':toBig(e.target.value)}})
      } else {
        if(!isValidNumber(value)) {
          Toast.info(intl.get('notifications.title.invalid_number'), 3, null, false);
          return
        }
        if(!validateAmountS(value)){
          Toast.info(intl.get('todo_list.title_balance_not_enough',{symbol:p2pOrder.tokenS}), 3, null, false);
          return
        }
        dispatch({type:'p2pOrder/amountChange', payload:{'amountS':toBig(e.target.value)}})
      }
    }
    const submitOrder = ()=>{
      if(!isValidNumber(p2pOrder.amountB) || !Number(p2pOrder.amountB) || !Number(p2pOrder.amountS)) {
        Toast.info(intl.get('notifications.title.invalid_number'), 3, null, false);
        return
      }
      if(!validateAmountS(p2pOrder.amountS)){
        Toast.info(intl.get('todo_list.title_balance_not_enough',{symbol:p2pOrder.tokenS}), 3, null, false);
        return
      }
      dispatch({type:'p2pOrder/isMakerChange', payload:{ismaker:true}})
      showLayer({id:'face2FaceConfirm'})
    }
    const price = p2pOrder.amountB && p2pOrder.amountB.gt(0) && p2pOrder.amountS && p2pOrder.amountS.gt(0) ? toFixed(p2pOrder.amountS.div(p2pOrder.amountB), 8) : toFixed(toBig(0),8)
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
                <span>{intl.get('common.sell')} {p2pOrder.tokenS}</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Button onClick={showLayer.bind(this,{id:'helperOfTokens', side:'buy'})} type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>{intl.get('common.buy')} {p2pOrder.tokenB}</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
          </div>
          <div className="row ml0 mr0 mt20 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Input type="text" onChange={amountChange.bind(this, 'sell')}/>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Input type="text" onChange={amountChange.bind(this, 'buy')}/>
            </div>
          </div>
          <div className="row ml0 mr0 pt15 pb15 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">{intl.get('p2p_order.price')}</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              {`${price} ${p2pOrder.tokenS}/${p2pOrder.tokenB}`}
            </div>
          </div>
          <Button className="" onClick={submitOrder} type="primary">{intl.get('common.next_step')}</Button>
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






