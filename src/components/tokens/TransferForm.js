import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import OrderDetail from './Detail';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
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
           <List className="bg-none" renderHeader={()=> <div className="d-none pl15 pt10 fs14 zb-b-b">LRC To Sell</div>}>
            <InputItem
              {...getFieldProps('money3')}
              type={type}
              placeholder="00.0000"
              clear
              moneyKeyboardAlign="right"
              extra={
                <div style={{width:'30px',textAlign:'right'}}>
                  <WebIcon className="color-black-2" type="question-circle-o" style={{padding:'2px 0px 5px'}} onClick={showLayer.bind(this,{id:'placeOrderPriceHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16" >To</div></InputItem>
            <InputItem
              type={type}
              placeholder="00.0000"
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              extra={
                <div style={{width:'30px',textAlign:'right'}}>
                  <WebIcon className="color-black-2" type="question-circle-o" style={{padding:'2px 0px 5px'}} onClick={showLayer.bind(this,{id:'placeOrderAmountHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16">Amount</div></InputItem>
            <InputItem
              type={type}
              placeholder="00.0000"
              extra={
                <div style={{width:'30px',textAlign:'right'}}>
                  <WebIcon className="d-none" type="exclamation-circle-o" onClick={()=>{}} />
                </div>
              }
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              editable={false}
            ><div className="fs16">Price</div></InputItem>
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
          leftContent={null && [
            <span className="color-black-1"><WebIcon key="1" type="bars" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="line-chart" /></span>
          ]}
        >
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>Face to Face</div>
        </NavBar>
        <div className="">
          <PlaceOrderForm side="buy" />
        </div>
        <div className=" p10">
          <Button type="primary">Exchange</Button>
        </div>
      </div>
    );
  }
}
const PlaceOrderForm = createForm()(connect(({layers})=>({layers}))(PlaceOrder))
export default PlaceOrderForm





