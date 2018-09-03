import React from 'react';
import {connect} from 'dva';
import {Spin,Icon as WebIcon} from 'antd';
import {NavBar,Icon} from 'antd-mobile';
import intl from 'react-intl-universal';
import {getTokensByMarket} from 'modules/formatter/common'
import HelperOfDepth from './HelperOfDepth'
import Worth from 'modules/settings/Worth'
import {formatPrice} from 'modules/orders/formatters'

function HelperOfPrice(props) {
  const {dispatch,pair,lastPrice} = props
  const tokens = getTokensByMarket(pair)
  const priceDisplay = lastPrice && formatPrice(tokens.left, tokens.right, lastPrice)
  const changePrice = (value)=>{
    dispatch({
      type:'placeOrder/priceChangeEffects',
      payload:{
        price:value
      }
    })
  }
  const hideLayer = (payload = {}) => {
    dispatch({
      type: 'layers/hideLayer',
      payload: {
        ...payload
      }
    })
  }
  return (
    <div className="tabs-no-border">
      <NavBar
        className=""
        mode="light"
        onLeftClick={() => hideLayer({id:'helperOfPrice'})}
        leftContent={[
          <span key='1' className=""><Icon type="cross"/></span>,
        ]}
        rightContent={[
          <span key='1' onClick={()=>window.Toast.info('请点击价格或数量', 1, null, false)} className=""><WebIcon type="question-circle-o"/></span>,
        ]}
      >
        {intl.get('common.price')}{intl.get('common.helper')}
      </NavBar>
      <div className="zb-b-t">
        <div className="row ml0 mr0 zb-b-b align-items-center no-gutters">
          <div className="col-auto p10 color-black-1 text-left ">
            {intl.get('ticker.last')}
          </div>
          <div className="col-auto pt10 pb10 color-black-1 hover-default" onClick={changePrice.bind(this,priceDisplay)}>
            {priceDisplay} {tokens.right}
            <span className="color-black-4 ml5 fs12">
              <Worth amount={priceDisplay} symbol={tokens.right}/>
            </span>
          </div>
          <div className="col"></div>
        </div>
        <div className="bg-grey-100" style={{maxHeight:'50vh',overflow:'auto'}}>
          <HelperOfDepth />
        </div>
      </div>
    </div>
  )
}
export default connect(({
  sockets:{tickers},
  placeOrder:{pair},
})=>({
  pair,lastPrice:tickers.item.loopr ? tickers.item.loopr.last : null
}))(HelperOfPrice)
