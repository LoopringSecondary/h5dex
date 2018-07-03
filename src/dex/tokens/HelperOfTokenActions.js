import React from 'react';
import {connect} from 'dva';
import { Modal,List,Button } from 'antd-mobile';
import intl from 'react-intl-universal';
import config from '../../common/config'
import routeActions from 'common/utils/routeActions'

function HelperOfTokenActions(props) {
  const {helperOfTokenActions,dispatch} = props
  const {symbol,hiddenBuy=false} = helperOfTokenActions
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
    hideLayer({id:'helperOfTokenActions'})
    showLayer({id:'receiveToken',symbol})
  }

  const gotoTrading = () => {
    hideLayer({id:'helperOfTokenActions'})
    const market = config.getTokenSupportedMarket(symbol)
    if (market) {
      routeActions.gotoPath(`/dex/placeOrder/${market}`)
      return
    }
    routeActions.gotoPath(`/dex/placeOrder`)

  }

  return (
    <div className="">
        <List renderHeader={() => <div className="pt5 pb5 fs18 color-black-1">{symbol} {intl.get('common.actions')}</div>} className="popup-list">
          {false &&
            symbol === 'WETH' &&
            <List.Item arrow="horizontal" extra={``}>
              {intl.get('convert.convert_eth_title')}
            </List.Item>
          }
          {false &&
            symbol === 'ETH' &&
            <List.Item arrow="horizontal" extra={``}>
              {intl.get('convert.convert_weth_title')}
            </List.Item>
          }
          <List.Item onClick={showReceive} arrow="horizontal" extra={`0.000 ${symbol}`}>
            {intl.get('common.receive')} {symbol}
          </List.Item>
          {!hiddenBuy && <List.Item onClick={gotoTrading} arrow="horizontal" extra={`0.000 ${symbol}`}>
            {intl.get('common.buy')} {symbol}
          </List.Item>
          }
          {
            false && symbol !== 'ETH' &&
            <List.Item arrow="horizontal" extra="5" disabled>
              View {symbol} Orders
            </List.Item>
          }
          {false &&  <List.Item arrow="horizontal" extra={<div className="fs14">{`wallet's ${symbol} is sufficient`}</div>} disabled>
            Switch Wallet
          </List.Item>
          }
          {false &&
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
