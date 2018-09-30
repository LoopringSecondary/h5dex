import React from 'react';
import {connect} from 'dva';
import { Modal,List,Button,NavBar,Icon} from 'antd-mobile';
import intl from 'react-intl-universal';
import config from '../../common/config'
import routeActions from 'common/utils/routeActions'

function HelperOfTokenActions(props) {
  const {helperOfTokenActions,dispatch} = props
  const {symbol,hideBuy} = helperOfTokenActions
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

  const showConvert = (token) => {
    hideLayer({id:'helperOfTokenActions'})
    routeActions.gotoPath(`/dex/convert/${token}`)
  }

  const isSupportedTrading = () => {
    const market = config.getTokenSupportedMarket(symbol)
    return !!market
  }
  const gotoTrading = () => {
    hideLayer({id:'helperOfTokenActions'})
    const market = symbol.toLowerCase() === 'lrc'? 'LRC-WETH' : config.getTokenSupportedMarket(symbol)
    if (market) {
      routeActions.gotoPath(`/dex/placeOrder/${market}`)
      return
    }
    routeActions.gotoPath(`/dex/placeOrder`)
  }

  return (
    <div className="bg-white h100">
        <NavBar
          className="zb-b-b"
          mode="light"
          onLeftClick={() => hideLayer({id:'helperOfTokenActions'})}
          leftContent={[
            <span key='1' className=""><Icon type="cross"/></span>,
          ]}
        >
          <div className="color-black">{symbol} {intl.get('common.actions')}</div>
        </NavBar>
        <div className="p10">
          <Button onClick={showReceive} className="" type="primary">{intl.get('common.receive')} {symbol}</Button>
          {
            isSupportedTrading() && !hideBuy &&
            <Button onClick={gotoTrading} className="mt10" type="primary">{intl.get('common.buy')} {symbol}</Button>
          }

          {
            (false && symbol.toUpperCase() !== 'WETH' && symbol.toUpperCase() !== 'ETH') &&
            <Button onClick={()=>window.toast('ComingSoon')} disabled className="mt10" type="">Enable {symbol}</Button>
          }
          {symbol === 'WETH' &&
                <Button className="mt10" type="primary" onClick={() => {showConvert("ETH")}}>{intl.get('convert.convert_eth_title')}</Button>
          }
          {
            symbol === 'ETH' &&
            <Button onClick={gotoTrading} className="mt10" type="primary"> {intl.get('convert.convert_weth_title')}</Button>
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
        </div>
    </div>
  )
}
export default connect()(HelperOfTokenActions)
