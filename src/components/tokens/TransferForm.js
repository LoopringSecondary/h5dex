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

class Transfer extends React.Component {
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
            <Item extra={
              <div>
                <span className="color-black-2">LRC</span>
                <span className="d-inline-block ml5" style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-3" type="right"/>
                </span>
              </div>
            } >
              Token
            </Item>
            <InputItem
              {...getFieldProps('money3')}
              type={type}
              placeholder="0x"
              clear
              moneyKeyboardAlign="right"
              extra={
                <div style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-3" type="scan" style={{padding:'2px 0px 5px'}} onClick={showLayer.bind(this,{id:'placeOrderPriceHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16" >Recipient</div></InputItem>
            <InputItem
              type={type}
              placeholder="00.0000"
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              extra={
                <div style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-3" type="profile" style={{padding:'2px 0px 5px'}} onClick={showLayer.bind(this,{id:'placeOrderAmountHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16">Amount</div></InputItem>
            <Item extra={
              <div>
                <span className="color-black-2">$1.2 ≈ 0.00015ETH</span>
                <span className="d-inline-block ml5" style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-3" type="right"/>
                </span>
              </div>
            } >
              Gas
            </Item>
            {
              false &&
              <Item  multipleLine wrap
              extra={
                <div>
                  <span className="color-black-3">Notes</span>
                  <span className="d-inline-block ml5" style={{width:'25px',textAlign:'right'}}>
                    <WebIcon className="color-black-3" type="right"/>
                  </span>
                </div>
              }
              >Data</Item>
            }
            <Item>
              <div className="row align-items-center ml0 mr0 mb15 mt10">
                <div className="col color-black-3 fs16 pl0">Advanced</div>
                <div className="col-auto color-black-3 fs16 pr0">
                  <WebSwitch onChange={(checked)=>{showLayer({id:'placeOrderAdvance',side})}} />
                </div>
              </div>
              <Button className="mb15" type="primary">Send</Button>
            </Item>
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
          onLeftClick={() => routeActions.goBack()}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="line-chart" /></span>
          ]}
        >
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>Send LRC</div>
        </NavBar>
        <div className="">
          <PlaceOrderForm side="buy" />
        </div>

      </div>
    );
  }
}
const TransferForm = createForm()(connect(({layers})=>({layers}))(Transfer))
export default TransferForm





