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
    <div className="">
      <Spin spinning={loading}>
        <div className="divider 1px zb-b-t"></div>
        <div className="p10 text-left color-black-3">
          Current: {market}
        </div>
        <div className="divider 1px zb-b-t"></div>
        {items.map((item,index)=><TickerItem key={index} item={item} dispatch={dispatch}/>)}
        {items.length === 0 &&
          <div className="p10 text-center color-black-4">
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
      const {tickersOfSource:list,dispatch,market} = this.props
      const tickersFm = new TickersFm(list)
      const allTickers = tickersFm.getAllTickers().filter(item=>item.label === 'whitelist')
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
      const marketGroups = {}
      allTickers.forEach(item=>{
        const market = item.market.split('-')
        let group = marketGroups[market[1]]
        if(group){
          group.push(item)
        } else {
          group = [item]
        }
        marketGroups[market[1]] = group
      })
      favoredTickers.sort(sorter)
      const tabs = []
      const tickerItems = []
      if(marketGroups && Object.keys(marketGroups)) {
        tabs.push({ title: <div className="fs16">{intl.get('ticker_list.title_favorites')}</div> })
        tickerItems.push(<TickerList key={'fav'} items={favoredTickers} loading={list.loading} dispatch={dispatch} tickersList={list}/>)
        for (let key of Object.keys(marketGroups)) {
          tabs.push({title: <div className="fs16">{key}</div>})
          tickerItems.push(<TickerList key={key} items={getMarketTickersBySymbol(key,allTickers)} loading={list.loading} dispatch={dispatch} tickersList={list}/>)
        }
      }
      favoredTickers.sort(sorter)
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
            {tickerItems}
          </Tabs>
      )
  }
}
export default connect(
  ({sockets:{tickersOfSource,tickers}})=>({
    tickersOfSource,
    market:tickers.filters && tickers.filters.market
  })
)(ListPlaceOrderTickers)

