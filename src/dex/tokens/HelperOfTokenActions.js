import React from 'react';
import {connect} from 'dva';
import { Modal,List,Button } from 'antd-mobile';
import intl from 'react-intl-universal';

function HelperOfTokenActions(props) {
  const {helperOfTokenActions,dispatch} = props
  const {symbol} = helperOfTokenActions
  const showLayer = (payload = {}) => {
    dispatch({
      type: 'layers/showLayer',
      payload: {
        ...payload
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
  const showReceive = (payload = {})=>{
    showLayer({id:'receiveToken',symbol})
  }
  return (
    <div className="">
        <List renderHeader={() => <div className="pt5 pb5 fs18 color-black-1">{symbol} {intl.get('common.actions')}</div>} className="popup-list">
          {
            symbol === 'WETH' &&
            <List.Item arrow="horizontal" extra={``}>
              ETH 转换 WETH
            </List.Item>
          }
          {
            symbol === 'ETH' &&
            <List.Item arrow="horizontal" extra={``}>
              WETH 转换 ETH
            </List.Item>
          }
          <List.Item onClick={showReceive} arrow="horizontal" extra={`0.000 ${symbol}`}>
            {intl.get('common.receive')} {symbol}
          </List.Item>
          <List.Item arrow="horizontal" extra={`0.000 ${symbol}`}>
            {intl.get('common.buy')} {symbol}
          </List.Item>
          {
            symbol !== 'ETH' &&
            <List.Item arrow="horizontal" extra="5" disabled>
              View {symbol} Orders
            </List.Item>
          }
          <List.Item arrow="horizontal" extra={<div className="fs14">{`wallet's ${symbol} is sufficient`}</div>} disabled>
            Switch Wallet
          </List.Item>
          {
            symbol !== 'ETH' &&
            <List.Item arrow="horizontal" disabled>
              Enable {symbol} to trade
            </List.Item>
          }
        </List>
    </div>
  )
}
export default connect()(HelperOfTokenActions)
