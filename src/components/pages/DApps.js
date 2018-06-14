import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'

const Item = List.Item;
const Brief = Item.Brief;

class DApps extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }
  render() {
    const dispatch = this.props.dispatch
    const showLayer = (payload={})=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          ...payload
        }
      })
    }
    const hideLayer = (payload={})=>{
      dispatch({
        type:'layers/hideLayer',
        payload:{
          ...payload
        }
      })
    }
    const gotoConfirm= ()=>{

    }
    const showPriceHelper= ()=>{
      showLayer({id:'placeOrderPriceHelper'})
    }
    const { type } = this.state;

    const {side} = this.state
    const tabChange = (side)=>{
      this.setState({
        side
      })
    }
    const gotoTrade = ()=>{

    }
    const data = [
      {
        icon: <i className="fs24 color-black-1 loopring-icon loopring-icon-transfer"></i>,
        text: `Send`,
      },
      {
        icon: <i className="fs24 color-black-1 loopring-icon loopring-icon-receive"></i>,
        text: `Receive`,
      },
      {
        icon: <i className="fs24 color-black-1 loopring-icon loopring-icon-trade"></i>,
        text: `Trade`,
      },
    ]
    const OrderStatus = [
      {
        icon: <Badge text="3"><WebIcon type="exclamation-circle" className="fs22 color-black-1 mb5" /></Badge>,
        text: <div className="fs16 color-black-2">Error</div>,
      },
      {
        icon: <WebIcon type="clock-circle" className="fs22 color-black-1 mb5" />,
        text: <div className="fs16 color-black-2">Open</div>,
      },
      {
        icon: <WebIcon type="pay-circle" className="fs22 color-black-1 mb5" />,
        text: <div className="fs16 color-black-2">Matched</div>,
      },
      {
        icon: <WebIcon type="check-circle" className="fs22 color-black-1 mb5" />,
        text: <div className="fs16 color-black-2">Completed</div>,
      },
      {
        icon: <WebIcon type="close-circle" className="fs22 color-black-1 mb5" />,
        text: <div className="fs16 color-black-2">Closed</div>,
      },
    ]
    const txStatus = [
      {
        icon: <WebIcon type="clock-circle-o" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Pending</div>,
      },
      {
        icon: <WebIcon type="check-circle-o" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Success</div>,
      },
      {
        icon: <WebIcon type="close-circle-o" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Failed</div>,
      },
    ]
    return (
      <div className="bg-grey-100">
        {
          false &&
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} className="color-back-1" >
                Notice: Loopr is in Beta phase, traing fee is free for every order when total is over 1.0 WETH
          </NoticeBar>
        }
        <NavBar
          className=""
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="bars" /></span>,
          ]}
          rightContent={[
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="setting" /></span>
          ]}
        >
        DApps
        </NavBar>
        <div className="pt40 pb40 text-left bg-grey-900">
          <div className="row align-items-center ml0 mr0 no-gutters">
            <div className="col">
              <div className="text-left color-white-1 fs18 pl15" style={{width:'240px',wordBreak:'break-all'}}>
                0xeba7136a36da0f5e16c6bdbc739c716bb5b65a00
                <div className="fs16 color-white-3 mt5">
                  Switch Wallet <WebIcon type="right" />
                </div>
              </div>
            </div>
            <div className="col-auto">

            </div>
            {false &&
              <div className="d-flex justify-content-center">
                <Button className="d-flex m5 " size="small">
                  <i className="fs24 color-black-1 mr5 loopring-icon loopring-icon-transfer"></i>Send
                </Button>
                <Button className="d-flex m5" size="small">
                  <i className="fs24 color-black-1 mr5 loopring-icon loopring-icon-receive"></i>Receive
                </Button>
                <Button className="d-flex m5" size="small">
                  <i className="fs24 color-black-1 mr5 loopring-icon loopring-icon-trade"></i>Trade
                </Button>
              </div>
            }

          </div>
        </div>
        <div onClick={routeActions.gotoPath.bind(this,'/orders')} className="row ml0 mr0 p10 mt0 bg-white align-items-center no-gutters">
          <div className="col fs20 color-black-1">
            My Orders
            <span hidden className="color-black-3 ml10 fs16">Order & Fills</span>
          </div>
          <div className="col-auto fs18 color-black-3 pl20">
            Order & Fills <WebIcon type="right" />
          </div>
        </div>
        <Grid onClick={routeActions.gotoPath.bind(this,'/orders')} className="my-dex-grid" data={OrderStatus} square={false} activeStyle={false} carouselMaxRow={1} isCarousel={true} />

        <div className="bg-white mt15">
          <div className="row ml0 mr0 p10 align-items-center no-gutters zb-b-t">
            <div className="col fs20 color-black-1">My Assets</div>
            <div className="col-auto fs18 color-black-3 pl20">
              All <WebIcon type="right" />
            </div>
          </div>
          <div className="zb-b-t">
            <TokenList />
          </div>
        </div>
        <div hidden className="bg-white mt15">
          <div className="row ml0 mr0 p10 align-items-center no-gutters zb-b-t">
            <div className="col fs20 color-black-1">
              My Transactions
              <span hidden className="color-black-3 ml10 fs16">ETH</span>
            </div>
            <div className="col-auto fs18 color-black-3 pl20">
              All <WebIcon type="right" />
            </div>
          </div>
          <Grid className="my-dex-grid" data={txStatus} square={false} activeStyle={false} columnNum={4}/>
        </div>
        <div className="pb50"></div>
      </div>
    );
  }
}
export default DApps

const TokenListComp = (props)=>{
  const {dispatch} = props
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const tokens = [
    {
      symbol:"LRC",
      name:"Loopring",
      balance:12680.0001,
      required:15000.0001,
    },
    {
      symbol:"WETH",
      name:"Wrap ETH",
      balance:21.3652,
      required:20.1278,
    },
    {
      symbol:"ETH",
      name:"Ethereum",
      balance:85.0001,
      required:0.0001,
    },
  ]
  return (
    <div className="fs20">
      <table className="w-100 fs16">
        <thead>
          <tr className="">
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Token</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Estimate</th>
            <th hidden className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Selling</th>
            <th hidden className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Lack</th>
          </tr>
        </thead>
        <tbody>
            {
              tokens.map((token,index)=>
                <tr key={index} onClick={showLayer.bind(this,{id:'tokenNotEnough'})}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-1 text-left">
                    {token.symbol}
                    <span className="color-black-3 ml5">{token.name}</span>
                  </td>
                  <td className="pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right">{token.balance}</td>
                  <td className="pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right">$ 23647.57</td>
                  <td hidden className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{token.required}</td>
                  <td hidden className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{
                      Number(token.balance - token.required).toFixed(4)>0 ? '0.0000' :
                      <span className="color-red-500">
                        <WebIcon type="exclamation-circle mr5" />
                        {Number(token.required - token.balance).toFixed(4)}
                      </span>
                    }
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
    </div>
  )
}
export const TokenList = connect()(TokenListComp)





