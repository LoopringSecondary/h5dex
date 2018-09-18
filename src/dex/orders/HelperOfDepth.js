import React from 'react';
import { Spin,Icon as WebIcon } from 'antd';
import { NoticeBar,Icon } from 'antd-mobile';
import { connect } from 'dva';
import intl from 'react-intl-universal'
import { Toast } from 'antd-mobile';
import Worth from 'modules/settings/Worth'
import { getTokensByMarket } from 'modules/formatter/common'

const HelperOfDepth = ({depth={},pair,maxRows=15,dispatch})=>{
  const tokens = getTokensByMarket(pair)
  const sell = depth.item && depth.item.sell ? [...depth.item.sell].reverse() : []
  const changePrice = (value)=>{
    // Toast.info('Price has changed', 3, null, false);
    dispatch({
      type:'placeOrder/priceChangeEffects',
      payload:{
        price:value
      }
    })
  }
  const changeAmount = (value)=>{
    // Toast.info('Amount has changed', 3, null, false);
    dispatch({
      type:'placeOrder/amountChange',
      payload:{
        amountInput:value
      }
    })
  }
  // const maxHeight = 'auto'
  const maxHeight = (32*maxRows+28) + 'px'
  return (
    <div style={{}}>
      <Spin spinning={depth.loading}>
        <div className="row no-gutters ml0 mr0">
          <div className="col-6">
              <table className="w-100 fs12">
                <thead>
                  <tr className="zb-b-b">
                    <th className="text-left pl10 pr5 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.amount")}</th>
                    <th className="text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.buy")}</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      depth.item && depth.item.buy && depth.item.buy.slice(0,15).map((item,index)=>
                        <tr key={index} className="zb-b-b">
                          <td className="hover-default pt5 pb5 pl10 pr5 color-black-2 text-left align-top" onClick={changeAmount.bind(this, Number(item[1]).toFixed(4))}>
                            {Number(item[1]).toFixed(4)}
                          </td>
                          <td className="hover-default pt5 pb5 pl5 pr5 text-right color-success align-top" onClick={changePrice.bind(this, Number(item[0]).toFixed(8))}>
                            <div  className="lh15">{Number(item[0]).toFixed(8)}</div>
                            <div className="color-black-4 mt0 lh15"><Worth amount={Number(item[0]).toFixed(8)} symbol={tokens.right}/></div>
                          </td>
                        </tr>
                      )
                    }
                </tbody>
              </table>
              {
                depth.item && depth.item.buy && depth.item.buy.length === 0 &&
                  <div className="p10 zb-b-b text-center align-top color-black-4 fs12">
                    <div className="lh20">{intl.get('common.list.no_data_custom',{title:intl.get('common.depth')})}</div>
                  </div>
              }
          </div>
          <div className="col-6 zb-b-l">
              <table className="w-100 fs12">
                <thead>
                  <tr className="zb-b-b">
                    <th className="text-left pl5 pr5 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.sell")}</th>
                    <th className="text-right pl5 pr10 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.amount")}</th>
                  </tr>
                </thead>
                  <tbody>
                      {
                        sell && sell.slice(0,15).map((item,index)=>
                          <tr key={index} className="zb-b-b">
                            <td className="hover-default pt5 pb5 pl5 pr5 text-left color-error align-top" onClick={changePrice.bind(this, Number(item[0]).toFixed(8))}>
                              <div className="lh15">{Number(item[0]).toFixed(8)}</div>
                              <div className="color-black-4 mt0 lh15"><Worth amount={Number(item[0]).toFixed(8)} symbol={tokens.right}/></div>
                            </td>
                            <td className="hover-default pt5 pb5 pl5 pr10 color-black-2 text-right align-top" onClick={changeAmount.bind(this, Number(item[1]).toFixed(4))}>
                              {Number(item[1]).toFixed(4)}
                            </td>
                          </tr>
                        )
                      }
                  </tbody>
              </table>
              {
                depth.item && depth.item.sell && depth.item.sell.length === 0 &&
                <div colSpan="10" className="p10 zb-b-b text-center align-top color-black-4 fs12">
                  <div className="lh20">{intl.get('common.list.no_data_custom',{title:intl.get('common.depth')})}</div>
                </div>
              }
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default connect(
  ({sockets:{depth}, placeOrder:{pair}})=>({depth, pair})
)(HelperOfDepth)
