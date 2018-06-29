import React from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';
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
  return (
    <div className="tabs-no-border">
      <div hidden className="pt15 pb15 fs18 color-black-1 zb-b-b">Price Helper</div>
      <div className="zb-b-t">
        <div className="row ml0 mr0 zb-b-b align-items-center ">
          <div className="col pt15 pb15 color-black-1 text-left pl10">
            {intl.get('ticker.last')}
          </div>
          { priceDisplay &&
            <div className="col-auto pt15 pb15 color-black-2 hover-default" onClick={changePrice.bind(this,priceDisplay)}>
              <span className="color-black-4 mr5"><Worth amount={priceDisplay} symbol={tokens.right}/></span>{priceDisplay} {tokens.right}
            </div>
          }
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
