import React from 'react';
import { Button } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import {FillFm} from 'modules/fills/formatters'
import {getTokensByMarket} from 'modules/formatter/common'

const HelperOfMyMarketFills = ({fills={},dispatch})=>{
  const market = fills.filters.market
  const tokens = getTokensByMarket(market)
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
    <div>
      <table className="w-100 fs13" style={{overflow:'auto'}}>
        <thead>
          <tr className="">
            <th className="zb-b-b bg-grey-100 text-left pl5 pr5 pt5 pb5 font-weight-normal color-black-3 ">Price</th>
            <th className="zb-b-b bg-grey-100 text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-3 ">Amount</th>
            <th className="zb-b-b bg-grey-100 text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-3 ">Fee</th>
            <th className="zb-b-b bg-grey-100 text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-3 ">Time</th>
          </tr>
        </thead>
        <tbody>
            {
              fills.items && fills.items.map((item,index)=>{
                const fillFm = new FillFm(item)
                return (
                  <tr key={index}>
                    {
                      item.side === 'buy' &&
                      <td className="pl5 pr5 pt10 pb10 zb-b-b text-left align-middle color-green-500">
                        {fillFm.getPrice()}
                      </td>
                    }
                    {
                      item.side === 'sell' &&
                      <td className="pl5 pr5 pt10 pb10 zb-b-b text-left align-middle color-red-500">
                        {fillFm.getPrice()}
                      </td>
                    }
                    <td className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-right align-middle text-nowrap">
                      {fillFm.getAmount()}
                    </td>
                    <td className="pl5 pr5 pt10 pb10 zb-b-b text-right color-black-2 align-middle text-nowrap">
                      {fillFm.getLRCFee()}
                    </td>
                    <td className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-right align-middle text-nowrap">
                      {fillFm.getCreateTime()}
                    </td>
                  </tr>
                )
              })
            }
            {
              fills.items && fills.items.length == 0 &&
              <tr>
                <td colSpan='100'>
                <div className="text-center pt10 pb10 color-black-3 fs12">
                  no {market} fills
                </div>
              </td>
              </tr>
            }
        </tbody>
      </table>
      <div className="p10 zb-b-t mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height:"36px",lineHeight:'36px'}}className="d-block w-100 fs14 bg-none">
          View all fills
        </Button>
      </div>
    </div>

  )
}

export default connect(({
  fills,
})=>({
 fills:fills.MyFills
}))(HelperOfMyMarketFills)

