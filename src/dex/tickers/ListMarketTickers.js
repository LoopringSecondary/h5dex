import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs } from 'antd-mobile'
import { Spin } from 'antd'
import { getMarketTickersBySymbol } from './formatters'
import Worth from 'modules/settings/Worth'

export const TickerHeader = ({list,actions})=>{
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

export const TickerItem = ({item,actions,key})=>{
    if(!item){ return null }
    const tickerFm = new TickerFm(item)
    const gotoDetail = ()=>{
      routeActions.gotoPath(`/dex/markets/${item.market}`)
    }
    const tokens = tickerFm.getTokens()
    const direction = tickerFm.getChangeDirection()
    return (
      <div className="row ml0 mr0 p10 align-items-center zb-b-b no-gutters" onClick={gotoDetail}>
        <div className="col-5 text-left">
          <span className="fs16 color-black-1 font-weight-bold">{tokens.left}</span>
          <span className="fs14 color-black-3">/{tokens.right}</span>
          <div className="fs14 color-black-3">Vol {tickerFm.getVol()}</div>
        </div>
        <div className="col-4 text-left">
          <div className="fs16 color-black-1 font-weight-bold">{tickerFm.getLast()}</div>
          <div className="fs14 color-black-3"><Worth amount={tickerFm.getLast()} symbol={tokens.right}/></div>
        </div>
        <div className="col-3 text-right">
          {
            direction === 'up' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-green-500 color-white">
             +{tickerFm.getChange()}
            </Button>
          }
          {
            direction === 'down' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none pl10 pr10 fs16 bg-red-500 color-white">
             {tickerFm.getChange()}
            </Button>
          }
          {
            direction === 'none' &&
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
export const TickerList = ({items,loading,dispatch})=>{
  return (
    <div className="bg-white">
      <Spin spinning={loading}>
        <div className="divider 1px zb-b-t"></div>
        <TickerHeader />
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
      const markets = ['WETH',"LRC"]
      return (
          <Tabs
            tabs={
              [
                { title: <div className="fs16">Favorites</div> },
                { title: <div className="fs16">WETH</div> },
                { title: <div className="fs16">LRC</div> },
                { title: <div className="fs16">Innovation</div> },
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
            <TickerList items={favoredTickers} loading={list.loading} dispatch={dispatch} />
            <TickerList items={getMarketTickersBySymbol("WETH",allTickers)} loading={list.loading} dispatch={dispatch} />
            <TickerList items={getMarketTickersBySymbol("LRC",allTickers)} loading={list.loading} dispatch={dispatch} />
            <TickerList items={[]} loading={list.loading} dispatch={dispatch} />
          </Tabs>
      )
  }
}
export default connect(
  ({sockets:{loopringTickers}})=>({loopringTickers})
)(ListMarketTickers)

