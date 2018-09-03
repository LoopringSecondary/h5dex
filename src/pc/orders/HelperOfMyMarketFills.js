import React from 'react';
import { Button, Toast,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Spin } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import {FillFm} from 'modules/fills/formatters'
import {getTokensByMarket} from 'modules/formatter/common'
import config from "common/config";
import {toNumber,toBig,toFixed} from "LoopringJS/common/formatter";
import TokenFm from "modules/tokens/TokenFm";

const HelperOfMyMarketFills = ({fills={},dispatch})=>{
  const market = fills.filters.market
  const tokens = getTokensByMarket(market)
  const changePrice = (item)=>{
    const tokenB = new TokenFm({symbol:item.tokenB});
    const tokenS = new TokenFm({symbol:item.tokenS});
    const market = config.getMarketByPair(item.market);
    const price = item.side.toLowerCase() === 'buy' ? tokenS.getUnitAmount(item.amountS).div(tokenB.getUnitAmount(item.amountB)) :
      tokenB.getUnitAmount(item.amountB).div(tokenS.getUnitAmount(item.amountS));
    Toast.info('Price has changed', 1, null, false);
    dispatch({
      type:'placeOrder/priceChangeEffects',
      payload:{
        price
      }
    })
  }
  const changeAmount = (item)=>{
    const fmS = item.side.toLowerCase() === 'buy' ? new TokenFm({symbol: item.tokenB}) : new TokenFm({symbol: item.tokenS});
    const amount = item.side.toLowerCase() === 'buy' ? fmS.getUnitAmount(item.amountB) : fmS.getUnitAmount(item.amountS);
    Toast.info('Amount has changed', 1, null, false);
    dispatch({
      type:'placeOrder/amountChange',
      payload:{
        amountInput:amount
      }
    })
  }
  const gotoDetail= (item)=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          id:'fillDetail',
          order:item,
        }
      })
  }
  const gotoAll = ()=>{
  }
  return (
    <div className="">
      <Spin spinning={fills.loading}>
        <table className="w-100 fs13" style={{overflow:'auto'}}>
          <thead>
            <tr className="">
              <th className="zb-b-b text-left pl10 pr5 pt10 pb10 font-weight-normal color-black-3 ">{intl.get('common.side')}</th>
              <th className="zb-b-b text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">
                {intl.get('common.price')}<span className="fs10">/{tokens.right}</span>
              </th>
              <th className="zb-b-b text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">
                {intl.get('common.amount')}<span className="fs10">/{tokens.left}</span>
              </th>
              <th hidden className="zb-b-b text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">
                {intl.get('common.total')}<span hidden className="fs10">/{tokens.right}</span>
              </th>
              <th hidden className="zb-b-b text-right pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">Fee</th>
              <th className="zb-b-b text-center pl5 pr5 pt5 pb5 font-weight-normal color-black-3 ">{intl.get('common.time')}</th>
            </tr>
          </thead>
          <tbody>
              {
                fills.items && fills.items.map((item,index)=>{
                  const fillFm = new FillFm(item)
                  return (
                    <tr key={index}>
                      <td className="pl10 pr5 pt10 pb10 zb-b-b text-left align-middle" onClick={changePrice.bind(this, item)}>
                        { item.side === 'buy' && <div className="color-success">{intl.get('common.buy')}</div> }
                        { item.side === 'sell' && <div className="color-error">{intl.get('common.sell')}</div> }
                      </td>
                      <td className="pl5 pr5 pt10 pb10 zb-b-b text-left align-middle " onClick={changePrice.bind(this, item)}>
                       {fillFm.getPrice()}
                      </td>
                      <td className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-left align-middle text-nowrap" onClick={changeAmount.bind(this, item)}>
                        {fillFm.getAmount()}
                      </td>
                      <td hidden className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-left align-middle text-nowrap" onClick={changeAmount.bind(this, item)}>
                        {fillFm.getTotal()}
                      </td>
                      <td hidden className="pl5 pr5 pt10 pb10 zb-b-b text-right color-black-2 align-middle text-nowrap">
                        {fillFm.getLRCFee()}
                      </td>
                      <td className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-center align-middle text-nowrap">
                        {fillFm.getCreateTime()}
                      </td>
                    </tr>
                  )
                })
              }
              {
                !fills.loading && fills.items && fills.items.length == 0 &&
                <tr>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-center color-black-3 fs13" colSpan='100'>
                    {intl.get("common.list.no_data")}
                  </td>
                </tr>
              }
          </tbody>
        </table>
      </Spin>
      <div className="">
        <div className="" onClick={routeActions.gotoPath.bind(this,'/dex/usercenter/fills')}>
          <div className="row color-black-3 fs13 ml0 mr0 no-gutters pl10 pr10 pt10 pb10 align-items-center">
            <div className="col text-center">
              <WebIcon className="mr5" type="exclamation-circle-o"/>
              <span>当前仅显示您的{market}成交</span>
              <span className="text-primary ml5">{intl.get('common.all')}</span>
            </div>
          </div>
        </div>
        <div className="divider 1px zb-b-t"></div>
      </div>
    </div>

  )
}

export default connect(({
  fills,
})=>({
 fills:fills.MyFills
}))(HelperOfMyMarketFills)

