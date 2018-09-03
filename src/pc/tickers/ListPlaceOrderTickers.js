import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Spin } from 'antd'
import { Tabs } from 'antd-mobile'
import { getMarketTickersBySymbol } from './formatters'
import { TickerHeader } from './ListMarketTickers'
import {formatPrice} from 'modules/orders/formatters'
import storage from '../../modules/storage'

const TickerItem = ({item,actions,key,dispatch})=>{
    if(!item){ return null }
    const tickerFm = new TickerFm(item)
    const changeMarket = ()=>{
      routeActions.gotoPath(`/dex/placeOrder/${item.market}`)
      dispatch({
        type:"layers/hideLayer",
        payload:{
          id:"helperOfMarket"
        }
      })
    }
    const tokens = tickerFm.getTokens()
    const direction = tickerFm.getChangeDirection()
    return (
      <div className="row ml0 mr0 p10 align-items-center zb-b-b no-gutters hover-default" onClick={changeMarket}>
        <div className="col-5 text-left">
          <span className="fs14 color-black-2 ">{tokens.left}-{tokens.right}</span>
        </div>
        <div className="col-4 text-left">
          <div className="fs14 color-black-2 ">{formatPrice(tokens.left, tokens.right, tickerFm.getLast())}</div>
        </div>
        <div className="col-3 text-right">
          {
            direction === 'up' &&
            <span className="border-none fs14 color-success">
             +{tickerFm.getChange()}
            </span>
          }
          {
            direction === 'down' &&
            <span className="border-none fs14 color-error">
             {tickerFm.getChange()}
            </span>
          }
          {
            direction === 'none' &&
            <span className="border-none fs14 color-grey-500">
             {tickerFm.getChange()}
            </span>
          }
        </div>
      </div>
    )
}

export const TickerList = ({items,loading,dispatch,market})=>{
  return (
    <div className="bg-white">
      <Spin spinning={loading}>
        <div className="divider 1px zb-b-t"></div>
        <div className="p10 text-left color-black-1">
          Current: {market}
        </div>
        <div className="divider 1px zb-b-t"></div>
        {items.map((item,index)=><TickerItem key={index} item={item} dispatch={dispatch}/>)}
        {items.length === 0 &&
          <div className="p10 text-center color-black-3">
            {intl.get('common.list.no_data')}
          </div>
        }
      </Spin>
    </div>
  )
}

class ListPlaceOrderTickers extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      const {loopringTickers:list,dispatch,market} = this.props
      const tickersFm = new TickersFm(list)
      const {extra:{favored={},keywords}} = list
      let newMarkets = []
      const confs = storage.settings.getConfigs()
      if(confs && confs.newMarkets) {
        newMarkets = confs.newMarkets
      }
      const isInNewMarket = (market) => {
        const m = market.toLowerCase().split('-')
        return newMarkets.find((i)=> {
          return (i.tokenx.toLowerCase() === m[0] && i.tokeny.toLowerCase() === m[1]) || (i.tokeny.toLowerCase() === m[0] && i.tokenx.toLowerCase() === m[1])
        })
      }
      const allTickers = tickersFm.getAllTickers().filter(item=>!isInNewMarket(item.market))
      const newMarktsTickers = tickersFm.getAllTickers().filter(item=>isInNewMarket(item.market))
      const favoredTickers = tickersFm.getFavoredTickers()
      const recentTickers = tickersFm.getRecentTickers()
      const sorter = (a,b)=>{
        if(a.vol === b.vol ){
          if(a.last === b.last){
            return b.market > a.market ? -1 : 1
          }else{
            return Number(b.last) - Number(a.last)
          }
        }else{
          return Number(b.vol) - Number(a.vol)
        }
      }
      allTickers.sort(sorter)
      newMarktsTickers.sort(sorter)
      favoredTickers.sort(sorter)
      const tabs = [
        { title: <div className="fs16">{intl.get('ticker_list.title_favorites')}</div> },
        { title: <div className="fs16">WETH</div> },
        { title: <div className="fs16">LRC</div> },
        { title: <div className="fs16">USDT</div> },
        { title: <div className="fs16">TUSD</div> },
      ]
      if(newMarkets && newMarkets.length > 0){
        tabs.push({ title: <div className="fs16">{intl.get('ticker_list.title_innovation')}</div> })
      }
      return (
          <Tabs
            tabs={tabs}
            tabBarBackgroundColor={"#fff"}
            tabBarActiveTextColor={"#000"}
            tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
            tabBarTextStyle={{}}
            initialPage={1}
            swipeable={false}
            onChange={(tab, index) => {}}
            onTabClick={(tab, index) => { }}
          >
            <TickerList items={favoredTickers} loading={list.loading} dispatch={dispatch} market={market} />
            <TickerList items={getMarketTickersBySymbol("WETH",allTickers)} loading={list.loading} dispatch={dispatch} market={market} />
            <TickerList items={getMarketTickersBySymbol("LRC",allTickers)} loading={list.loading} dispatch={dispatch} market={market} />
            <TickerList items={getMarketTickersBySymbol("USDT",allTickers)} loading={list.loading} dispatch={dispatch} market={market} />
            <TickerList items={getMarketTickersBySymbol("TUSD",allTickers)} loading={list.loading} dispatch={dispatch} market={market} />
            <TickerList items={newMarktsTickers} loading={list.loading} dispatch={dispatch} market={market} />
          </Tabs>
      )
  }
}
export default connect(
  ({sockets:{loopringTickers,tickers}})=>({
    loopringTickers,
    market:tickers.filters && tickers.filters.market
  })
)(ListPlaceOrderTickers)

