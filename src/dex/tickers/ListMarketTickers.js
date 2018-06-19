import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs } from 'antd-mobile'
import { Spin } from 'antd'
import { getMarketTickersBySymbol } from './formatters'

const TickerHeader = ({list,actions})=>{
    return (
        <div className="row ml0 mr0 pt5 pb5 pl10 pr10 align-items-center no-gutters">
          <div className="col-5 fs14 color-black-3 text-left">Market</div>
          <div className="col-4 text-left pr10">
            <div className="fs14 color-black-3 ">Price</div>
          </div>
          <div className="col-3 text-right">
            <div className="fs14 color-black-3">Change</div>
          </div>
        </div>
    )
}

const TickerItem = ({item,actions,key})=>{
    if(!item){ return null }
    const tickerFm = new TickerFm(item)
    const gotoDetail = ()=>{
      routeActions.gotoPath('/dex/markets/LRC-WETH')
    }
    const tokens = tickerFm.getTokens()
    return (
      <div className="row ml0 mr0 p10 align-items-center zb-b-b no-gutters" onClick={gotoDetail}>
        <div className="col-5 text-left">
          <span className="fs16 color-black-1 font-weight-bold">{tokens.left}</span>
          <span className="fs14 color-black-3">/{tokens.right}</span>
          <div className="fs14 color-black-3">Vol {tickerFm.getVol()}</div>
        </div>
        <div className="col-4 text-left">
          <div className="fs16 color-black-1 font-weight-bold">{tickerFm.getLast()}</div>
          <div className="fs14 color-black-3">$0.62</div>
        </div>
        <div className="col-3 text-right">
          {
            tickerFm.getChangeDirection() === 'up' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-green-500 color-white">
             +{tickerFm.getChange()}
            </Button>
          }
          {
            tickerFm.getChangeDirection() === 'down' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-red-500 color-white">
             {tickerFm.getChange()}
            </Button>
          }
          {
            tickerFm.getChangeDirection() === 'none' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-grey-500 color-white">
             {tickerFm.getChange()}
            </Button>
          }
          {
            false &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-green-300 color-white">+28.2%</Button>
          }
          {
            false &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-green-500 color-white">+50.2%</Button>
          }
          {
            false &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-green-700 color-white">+158.2%</Button>
          }
        </div>
      </div>
    )
}
const TickerList = ({items,loading})=>{
  const actions = {
    // selectTicker,
  }
  return (
    <div className="bg-white">
      <Spin spinning={loading}>
        <div className="divider 1px zb-b-t"></div>
        <TickerHeader />
        <div className="divider 1px zb-b-t"></div>
        {items.map((item,index)=><TickerItem key={index} item={item} actions={actions} />)}
        {items.length === 0 &&
          <div className="p10 text-center">
            {intl.get('common.list.no_data')}
          </div>
        }
      </Spin>
    </div>
  )
}

class ListMarketTickers extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      const {loopringTickers:list,dispatch} = this.props
      const tickersFm = new TickersFm(list)
      const {extra:{favored={},keywords}} = list
      const allTickers = tickersFm.getAllTickers()
      const favoredTickers = tickersFm.getFavoredTickers()
      const recentTickers = tickersFm.getRecentTickers()
      const actions = {
        // selectTicker,
      }
      const markets = ['WETH',"LRC"]
      return (
          <Tabs
            tabs={
              [
                { title: <div className="fs16">Favorites</div> },
                { title: <div className="fs16">WETH</div> },
                { title: <div className="fs16">LRC</div> },
              ]
            }
            tabBarBackgroundColor={"#fff"}
            tabBarActiveTextColor={"#000"}
            tabBarInactiveTextColor={"rgba(0,0,0,0.3)"}
            tabBarTextStyle={{}}
            initialPage={1}
            swipeable={false}
            onChange={(tab, index) => {}}
            onTabClick={(tab, index) => { }}
          >
            <TickerList items={favoredTickers} loading={list.loading} />
            {
              markets.map((symbol,index)=>{
                const items = getMarketTickersBySymbol(symbol,allTickers)
                return (
                  <TickerList key={index} items={items} loading={list.loading} />
                )
              })
            }
          </Tabs>
      )
  }
}
export default connect(
  ({sockets:{loopringTickers}})=>({loopringTickers})
)(ListMarketTickers)

