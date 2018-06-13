import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import OrderDetail from './Detail';
import PlaceOrderPreview from './PlaceOrderPreview';
import PlaceOrderAdvance from './PlaceOrderAdvance';
import PlaceOrderPriceHelper from './PlaceOrderPriceHelper';
import PlaceOrderAmountHelper from './PlaceOrderAmountHelper';
import ListTickers from '../tickers/ListTickers';
import {FillList} from './PlaceOrderAmountHelper';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
const Item = List.Item;
const Brief = Item.Brief;


// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

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
    const gotoOrderDetail= (payload)=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          id:'orderDetail',
          ...payload
        }
      })
    }

    const showPriceHelper= ()=>{
      showLayer({id:'placeOrderPriceHelper'})
    }
    const { getFieldProps } = this.props.form;
    const { type } = this.state;

    const PlaceOrderForm = (props)=>{
      const { side } = props
      return (
        <div>
           <List className="bg-none no-border" renderHeader={()=> <div className="d-none pl15 pt10 fs14 zb-b-b">LRC To Sell</div>}>
            <InputItem
              {...getFieldProps('money3')}
              type={type}
              placeholder="0.00000000"
              clear
              moneyKeyboardAlign="right"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              extra={
                <div style={{width:'30px',textAlign:'right'}}>
                  <span className="fs16 d-none" style={{color:"#bbb"}}>WETH</span>
                  <WebIcon type="question-circle-o" style={{padding:'2px 0px 5px',outline:'5px'}} onClick={showLayer.bind(this,{id:'placeOrderPriceHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16" >LRC To Sell</div></InputItem>
          </List>
          <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="0.00000000"
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              extra={
                <div style={{width:'30px',textAlign:'right'}}>
                  <span className="fs16 d-none" style={{color:"#bbb"}}>WETH</span>
                  <WebIcon type="question-circle-o" style={{padding:'2px 0px 5px',outline:'5px'}} onClick={showLayer.bind(this,{id:'placeOrderAmountHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16">EOS To Buy</div></InputItem>
          </List>
          <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="0.00000000"
              extra={
                <div style={{width:'30px',textAlign:'right'}}>
                  <WebIcon type="exclamation-circle-o" onClick={()=>{}} />
                </div>
              }
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              editable={false}
            ><div className="fs16">Exchange Price</div></InputItem>
          </List>
        </div>

      )
    }
    const {side} = this.state
    const tabChange = (side)=>{
      this.setState({
        side
      })
    }
   const gotoTrade = ()=>{
      routeActions.gotoPath('/trade/detail')
    }
    return (
      <div className="bg-white">
        <NavBar
          className="zb-b-b"
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="bars" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="line-chart" /></span>
          ]}
        >
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>Face to Face</div>
        </NavBar>
        <div className="pt30 pb30 zb-b-b">
          <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
            <div className="col-auto text-center" style={{width:'125px'}}>
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-LRC fs24`}/>
              </div>
            </div>
            <div className="col-auto text-center" style={{width:'25px'}}>
              <WebIcon type="swap" className={`color-black-1 fs20`} />
            </div>
            <div className="col-auto text-center" style={{width:'125px'}}>
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-EOS fs24`}/>
              </div>
            </div>
          </div>
          <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center">
            <div className="col-auto text-center" style={{width:'125px'}}>
              <Button type="ghost" className="fs16 color-black-2" style={{height:'40px',lineHeight:'40px'}}>
                LRC <WebIcon className="" type="down" />
              </Button>
              <div className="fs14 color-black-3 mt5 text-center">0.0000</div>
            </div>
            <div className="col-auto text-center" style={{width:'25px'}}>
            </div>
            <div className="col-auto text-center" style={{width:'125px'}}>
              <Button type="ghost" className="fs16 color-black-2" style={{height:'40px',lineHeight:'40px'}}>
                EOS <WebIcon className="" type="down" />
              </Button>
              <div className="fs14 color-black-3 mt5 text-center">0.0000</div>
            </div>
          </div>
        </div>
        <div className="zb-b-t">
          <PlaceOrderForm side="buy" />
        </div>

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


export const OpenOrderList = ({gotoOrderDetail})=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2" onClick={gotoOrderDetail}>
              <td hidden className="zb-b-b p10 text-center">
                {index%2 == 0 && <span className="color-green-500">Buy</span>}
                {index%2 == 1 && <span className="color-red-500">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 == 0 && <span className="color-green-500">0.00095000</span>}
                {index%2 == 1 && <span className="color-red-500">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index <=2 && <WebIcon className="zb-b-b color-red-500" type="exclamation-circle" /> }
                { index >=3 && index <=5 &&<WebIcon className="zb-b-b color-blue-500" type="clock-circle" /> }
                { index >=6 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
              </td>
            </tr>
          )
        }
        <tr hidden className="color-black-2">
          <td colSpan={10} className="zb-b-b p15 text-center">
              <Button className="color-grey-600">All Orders</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export const HistoryOrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2">
              <td hidden className="zb-b-b p10 text-center">
                {index%2 == 0 && <span className="color-green-500">Buy</span>}
                {index%2 == 1 && <span className="color-red-500">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 == 0 && <span className="color-green-500">0.00095000</span>}
                {index%2 == 1 && <span className="color-red-500">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index%3 === 0 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
                { index%3 === 1 && <WebIcon className="zb-b-b color-black-4" type="close-circle" /> }
                { index%3 === 2 && <WebIcon className="zb-b-b color-black-4" type="clock-circle" /> }
              </td>
            </tr>
          )
        }
        <tr hidden className="color-black-2">
          <td colSpan={10} className="zb-b-b p15 text-center">
              <Button className="color-grey-600">All Orders</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}





