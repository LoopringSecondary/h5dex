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
              <table className="w-100 fs13">
                <thead>
                  <tr className="">
                    <th className="zb-b-b text-left pl10 pr5 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.amount")}</th>
                    <th className="zb-b-b text-right pl5 pr5 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.buy")}</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      depth.item && depth.item.buy && depth.item.buy.slice(0,15).map((item,index)=>
                        <tr key={index}>
                          <td className="hover-default pl10 pr5 pt5 pb5 zb-b-b color-black-2 text-left align-top" onClick={changeAmount.bind(this, Number(item[1]).toFixed(4))}>
                            {Number(item[1]).toFixed(4)}
                          </td>
                          <td className="hover-default pl5 pr5 pt5 pb5 zb-b-b text-right color-success align-top" onClick={changePrice.bind(this, Number(item[0]).toFixed(8))}>
                            {Number(item[0]).toFixed(8)}
                            <div className="fs12 color-black-4"><Worth amount={Number(item[0]).toFixed(8)} symbol={tokens.right}/></div>
                          </td>
                        </tr>
                      )
                    }
                </tbody>
              </table>
              {
                depth.item && depth.item.buy && depth.item.buy.length === 0 &&
                  <div className="p10 zb-b-b text-center align-top color-black-4 fs12">
                    {intl.get('common.list.no_data_custom',{title:intl.get('common.depth')})}
                  </div>
              }
          </div>
          <div className="col-6">
              <table className="w-100 fs13 zb-b-r">
                <thead>
                  <tr className="">
                    <th className="zb-b-b text-left pl5 pr5 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.sell")}</th>
                    <th className="zb-b-b text-right pl5 pr10 pt5 pb5 font-weight-normal color-black-4">{intl.get("common.amount")}</th>
                  </tr>
                </thead>
                  <tbody>
                      {
                        sell && sell.slice(0,15).map((item,index)=>
                          <tr key={index} className="">
                            <td className="hover-default pl5 pr5 pt5 pb5 zb-b-b text-left color-error align-top" onClick={changePrice.bind(this, Number(item[0]).toFixed(8))}>
                              {Number(item[0]).toFixed(8)}
                              <div className="fs12 color-black-4"><Worth amount={Number(item[0]).toFixed(8)} symbol={tokens.right}/></div>
                            </td>
                            <td className="hover-default pl5 pr10 pt5 pb5 zb-b-b color-black-2 text-right align-top" onClick={changeAmount.bind(this, Number(item[1]).toFixed(4))}>
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
                  {intl.get('common.list.no_data_custom',{title:intl.get('common.depth')})}
                </div>
              }
          </div>
        </div>
      </Spin>
      {
        ( depth.item.sell.length > 0 || depth.item.buy.length > 0 ) &&
        <div className="row color-black-3 fs13 ml0 mr0 no-gutters pl10 pr10 pt10 pb10 ">
          <div className="col text-left">
            <WebIcon className="mr5" type="exclamation-circle-o"/>
            <span>快速下单技巧：点击深度的价格或数量</span>
          </div>
        </div>
      }
      
    </div>
  )
}

export default connect(
  ({sockets:{depth}, placeOrder:{pair}})=>({depth, pair})
)(HelperOfDepth)
