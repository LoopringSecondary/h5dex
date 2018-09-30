import React from 'react';
import {getFormatTime} from "modules/formatter/common";
import {connect} from 'dva'
import { toNumber} from 'LoopringJS/common/formatter'
import intl from 'react-intl-universal'

const ListMarketFills = ({trades={},maxRows=5})=>{
  // const maxHeight = (60*maxRows+32) + 'px'
  const market = trades.filters.market || 'LRC-WETH'
  const maxHeight = 'auto'
  return (
    <div style={{height:maxHeight,overflow:'auto'}}>
      <table className="w-100 fs13" style={{overflow:'auto'}}>
        <thead>
          <tr className="">
            <th className="zb-b-b text-left pl10 pr5 pt5 pb5 font-weight-normal color-black-4 ">{intl.get("common.side")}</th>
            <th className="zb-b-b text-left pl5 pr5 pt5 pb5 font-weight-normal color-black-4 ">{intl.get("common.price")}</th>
            <th className="zb-b-b text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-4 ">{intl.get("common.amount")}</th>
            <th hidden className="zb-b-b text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-4 ">Fee</th>
            <th className="zb-b-b text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-4 ">{intl.get("common.time")}</th>
          </tr>
        </thead>
        <tbody>
            {
              trades.items && trades.items.map((item,index)=>{
                // const fillFm = new FillFm({...item,market})
                return (
                  <tr key={index}>
                    <td className="pl10 pr5 pt10 pb10 zb-b-b text-left align-middle ">
                      {
                        index%2 === 0 && <span className="color-error">{intl.get("common.sell")}</span>
                      }
                      {
                        index%2 === 1 && <span className="color-success">{intl.get("common.buy")}</span>
                      }
                    </td>
                    <td className="pl5 pr5 pt10 pb10 zb-b-b text-left align-middle">
                      {
                        index%2 === 0 && <span className="color-error">{item.price}</span>
                      }
                      {
                        index%2 === 1 && <span className="color-success">{item.price}</span>
                      }
                    </td>
                    <td className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-right align-middle text-nowrap">
                      {item.amount}
                    </td>
                    <td hidden className="pl5 pr5 pt10 pb10 zb-b-b text-right color-black-2 align-middle text-nowrap">
                      {item.lrcFee}
                    </td>
                    <td className="pl5 pr5 pt10 pb10 zb-b-b color-black-2 text-right align-middle text-nowrap">
                      {getFormatTime(toNumber(item.createTime) * 1e3,'MM-DD HH:mm')}
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>

  )
}

export default connect(
  ({sockets:{trades}})=>({trades})
)(ListMarketFills)
