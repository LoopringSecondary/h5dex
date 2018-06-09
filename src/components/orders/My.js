import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import PlaceOrderPreview from './PlaceOrderPreview';
import PlaceOrderAdvance from './PlaceOrderAdvance';
import PlaceOrderPriceHelper from './PlaceOrderPriceHelper';
import PlaceOrderAmountHelper from './PlaceOrderAmountHelper';
import {FillList} from './PlaceOrderAmountHelper';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
const Item = List.Item;
const Brief = Item.Brief;

class PlaceOrder extends React.Component {
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
    const { getFieldProps } = this.props.form;
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
        icon: <WebIcon type="exclamation-circle-o" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Disabled</div>,
      },
      {
        icon: <WebIcon type="compass" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Open</div>,
      },
      {
        icon: <WebIcon type="pay-circle-o" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Matched</div>,
      },
      {
        icon: <WebIcon type="check-circle-o" className="fs22 color-black-2 mb5" />,
        text: <div className="fs16 color-black-2">Completed</div>,
      },
      {
        icon: <WebIcon type="close-circle-o" className="fs22 color-black-2 mb5" />,
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
        My Dex
        </NavBar>
        <div className="d-flex align-items-center justify-content-center bg-grey-900" style={{height:'150px'}}>
          <div className="w-100">
            <div className="text-center color-white-1 fs18">
              0xeba7136a36da0f5e16c6bdbc739c716bb5b65a00
            </div>
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
          </div>
        </div>
        <div className="row ml0 mr0 p10 mt0 bg-white align-items-center no-gutters">
          <div className="col fs20 color-black-1">My Orders & Fills</div>
          <div className="col-auto fs18 color-black-3 pl20">
            All <WebIcon type="right" />
          </div>
        </div>
        <Grid className="my-dex-grid" data={OrderStatus} square={false} activeStyle={false} carouselMaxRow={1} isCarousel={true} />

        <div className="row ml0 mr0 p10 mt15 bg-white align-items-center no-gutters">
          <div className="col fs20 color-black-1">My ETH Transactions</div>
          <div className="col-auto fs18 color-black-3 pl20">
            All <WebIcon type="right" />
          </div>
        </div>
        <Grid className="my-dex-grid" data={txStatus} square={false} activeStyle={false} columnNum={4}/>

        <div className="row ml0 mr0 p10 mt15 bg-white align-items-center no-gutters">
          <div className="col fs20 color-black-1">My Tokens</div>
          <div className="col-auto fs18 color-black-3 pl20">
            All <WebIcon type="right" />
          </div>
        </div>
        <TokenList />
        <Containers.Layers id="placeOrderPreview">
          <UiContainers.Popups id="placeOrderPreview">
            <PlaceOrderPreview />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderAdvance">
          <UiContainers.Popups id="placeOrderAdvance">
            <PlaceOrderAdvance />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderPriceHelper">
          <UiContainers.Popups id="placeOrderPriceHelper">
            <PlaceOrderPriceHelper />
          </UiContainers.Popups>
        </Containers.Layers>
        <Containers.Layers id="placeOrderAmountHelper">
          <UiContainers.Popups id="placeOrderAmountHelper">
            <PlaceOrderAmountHelper />
          </UiContainers.Popups>
        </Containers.Layers>
      </div>
    );
  }
}

const PlaceOrderForm = createForm()(connect(({layers})=>({layers}))(PlaceOrder))
export default PlaceOrderForm


export const TokenNotEnough = ()=>{
  return (
    <div className="">
      哈哈哈哈哈
    </div>
  )
}
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
      balance:12680.0001,
      required:15000.0001,
    },
    {
      symbol:"WETH",
      balance:21.3652,
      required:20.1278,
    },
    {
      symbol:"ETH",
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
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Selling</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Lack</th>
            <th hidden className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Enough</th>
          </tr>
        </thead>
        <tbody>
            {
              tokens.map((token,index)=>
                <tr key={index} onClick={showLayer.bind(this,{id:'tokenNotEnough'})}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{token.symbol}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{token.balance}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{token.required}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{
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
      <Containers.Layers id="tokenNotEnough">
        <UiContainers.Popups id="tokenNotEnough">
          <TokenNotEnough />
        </UiContainers.Popups>
      </Containers.Layers>
    </div>
  )
}
export const TokenList = connect()(TokenListComp)

export const OrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5].map((item,index)=>
            <tr key={index} className="color-black-2">
              { index%2 == 0 && <td className="zb-b-b p10 text-center color-green-500">Buy</td> }
              { index%2 == 1 && <td className="zb-b-b p10 text-center color-red-500">Sell</td> }
              <td className="zb-b-b p10 text-right">0.00095</td>
              <td className="zb-b-b p10 text-right">1000.00</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-center">
              { index === 0 && <WebIcon className="zb-b-b color-red-500" type="exclamation-circle" /> }
              { index === 1 && <WebIcon className="zb-b-b color-blue-500" type="clock-circle" /> }
              { index === 2 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
              { index === 3 && <WebIcon className="zb-b-b color-grey-300" type="close-circle" /> }
              { index === 4 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}




