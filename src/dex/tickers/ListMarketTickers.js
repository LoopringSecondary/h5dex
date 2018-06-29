import React from 'react'
import {connect} from 'dva'
import {TickersFm,TickerFm} from 'modules/tickers/formatters'
import storage from '../../modules/storage'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { ListView,Button,Tabs } from 'antd-mobile'
import { Spin,Icon } from 'antd'
import { getMarketTickersBySymbol } from './formatters'
import Worth from 'modules/settings/Worth'
import {formatPrice} from 'modules/orders/formatters'

export const TickerHeader = ({list,actions})=>{
    return (
        <div className="row ml0 mr0 pt5 pb5 pl10 pr10 align-items-center no-gutters">
          <div className="col-5 fs13 color-black-4 text-left">{intl.get('common.market')}</div>
          <div className="col text-left pr10">
            <div className="fs13 color-black-4 ">{intl.get('common.price')}</div>
          </div>
          <div className="col-3 text-right">
            <div className="fs13 color-black-4">{intl.get('ticker.change')}</div>
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
          <span className="fs16 color-black-1 font-weight-bold-bak lh15">{tokens.left}</span>
          <span className="fs14 color-black-4"> / {tokens.right}</span>
          <span className="fs14 color-black-4"> <Icon type="star-o" className="" /> </span>
          <div className="fs14 color-black-4">Vol {tickerFm.getVol()}</div>
        </div>
        <div className="col text-left pr10">
          <div className="fs16 color-black-1 font-weight-bold-bak lh15">{formatPrice(tokens.left, tokens.right, tickerFm.getLast())}</div>
          <div className="fs14 color-black-4"><Worth amount={formatPrice(tokens.left, tokens.right, tickerFm.getLast())} symbol={tokens.right}/></div>
        </div>
        <div className="col-3 text-right">
          {
            direction === 'up' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-green-500 color-white">
             +{tickerFm.getChange()}
            </Button>
          }
          {
            direction === 'down' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-red-500 color-white">
             {tickerFm.getChange()}
            </Button>
          }
          {
            direction === 'none' &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-grey-500 color-white">
             {tickerFm.getChange()}
            </Button>
          }
          {
            false &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-green-300 color-white">+28.2%</Button>
          }
          {
            false &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-green-500 color-white">+50.2%</Button>
          }
          {
            false &&
            <Button style={{height:'36px',lineHeight:'36px'}} className="border-none radius-4 pl10 pr10 fs16 bg-green-700 color-white">+158.2%</Button>
          }
        </div>
      </div>
    )
}
export const TickerList = ({items,loading,dispatch})=>{
  return (
    <div className="">
      <Spin spinning={loading}>
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
                { title: <div className="fs16">{intl.get('ticker_list.title_favorites')}</div> },
                { title: <div className="fs16">WETH</div> },
                { title: <div className="fs16">LRC</div> },
                // { title: <div className="fs16">{intl.get('ticker_list.title_innovation')}</div> },
              ]
            }
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

