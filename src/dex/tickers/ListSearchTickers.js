import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Spin,Icon as WebIcon} from 'antd'
import { Tabs,SearchBar,NavBar,Icon} from 'antd-mobile'
import { getMarketTickersBySymbol } from './formatters'
import { TickerHeader } from './ListMarketTickers'
import {formatPrice} from 'modules/orders/formatters'

const TickerItem = ({item,actions,key,from,dispatch})=>{
    if(!item){ return null }
    const tickerFm = new TickerFm(item)
    const changeMarket = ()=>{
      if(from) {
        if (from === 'fromMarkets') {
          routeActions.gotoPath(`/dex/markets/${item.market}`)
        } else if (from === 'fromMarket') {
          routeActions.gotoPath(`/dex/placeOrder/${item.market}`)
        }
      }
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

export const TickerList = ({items,loading,dispatch,market,from})=>{
  return (
    <div className="bg-white">
      <Spin spinning={loading}>
        <div className="divider 1px zb-b-t"></div>
        <div className="p10 text-left color-black-1">
          Current: {market}
        </div>
        <div className="divider 1px zb-b-t"></div>
        {items.map((item,index)=><TickerItem key={index} item={item} dispatch={dispatch} from={from}/>)}
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
  state={
    keyword:''
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  render(){
      const _this = this
      const {tickersOfSource:list,dispatch,market} = this.props
      const from = this.props.location.pathname.replace(`/dex/markets/search/`, '')
      const tickersFm = new TickersFm(list)

      const recentTickers = tickersFm.getRecentTickers()
      const filtedTickers = this.state.keyword ? tickersFm.getSearchTickers(this.state.keyword) : []

      const search = (value) => {
        this.setState({keyword:value})
      }

      return (
        <div className="selectable">
            <NavBar
              mode="light"
              className="bg-white"
              leftContent={[
                <WebIcon style={{width:'32px',height:'32px',lineHeight:'32px',textAlign:'left'}} onClick={()=>routeActions.goBack()} key="1" type="left" />,
              ]}
            >
              <div className="color-black">搜索</div>
            </NavBar>
            <div className="bt-white">
              <div className="divider 1px zb-b-t"></div>
            </div>
            <SearchBar
              placeholder="Search"
              onChange={search}
              className="bg-white"
            />
            <div className="bt-white">
              <div className="divider 1px zb-b-t"></div>
            </div>
            {filtedTickers && filtedTickers.length > 0 && <TickerList items={filtedTickers} loading={list.loading} dispatch={dispatch} market={market} from={from}/>}
        </div>
      )
  }
}
export default connect(
  ({sockets:{tickersOfSource,tickers}})=>({
    tickersOfSource,
    market:tickers.filters && tickers.filters.market
  })
)(ListPlaceOrderTickers)

