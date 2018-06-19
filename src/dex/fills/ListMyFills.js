import React from 'react';
import {FillFm} from 'modules/fills/formatters'
const ListMyFills = ({fills={},maxRows=5})=>{
  // const maxHeight = (60*maxRows+32) + 'px'
  const maxHeight = 'auto'
  return (
    <div style={{height:maxHeight,overflow:'auto'}}>
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
        </tbody>
      </table>
    </div>

  )
}

export default ListMyFills
