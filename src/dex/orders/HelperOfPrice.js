import React from 'react';
import {connect} from 'dva';
import {Spin} from 'antd';
import intl from 'react-intl-universal';
import {getTokensByMarket} from 'modules/formatter/common'
import HelperOfDepth from './HelperOfDepth'

function HelperOfPrice(props) {
  const {dispatch,pair,lastPrice} = props
  const tokens = getTokensByMarket(pair)
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
        <div className="row pt15 pb15 ml0 mr0 zb-b-b align-items-center">
          <div className="col color-black-1 text-left pl10">
            Last Price
          </div>
          { lastPrice &&
            <div className="col-auto color-black-2" onClick={changePrice.bind(this,lastPrice)}>
              <span className="color-black-4 mr5">￥8.52</span>{lastPrice} {tokens.right}
            </div>
          }
          { !lastPrice &&
            <Spin spinning={true} />
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
