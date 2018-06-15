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

    const TransferForm = (props)=>{
      const { side } = props
      return (
        <div>
           <List className="bg-none no-border">
            <Item extra={
              <div>
                <span className="" style={{color:'#bbb'}}>LRC</span>
                <span className="d-inline-block ml5" style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-2 fs14" type="right"/>
                </span>
              </div>
            } >
              <div className="fs16">Token</div>
            </Item>
            </List>
            <List className="bg-none no-border">
            <InputItem
              {...getFieldProps('money3')}
              type={type}
              placeholder="recipient address"
              clear
              moneyKeyboardAlign="right"
              extra={
                <div style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-2" type="scan" style={{padding:'2px 0px 5px'}} onClick={showLayer.bind(this,{id:'placeOrderPriceHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16" >To</div></InputItem>
            </List>
            <List className="bg-none no-border">
            <InputItem
              type={type}
              placeholder="00.0000"
              clear
              moneyKeyboardAlign="right"
              onChange={(v) => { console.log('onChange', v); }}
              onBlur={(v) => { console.log('onBlur', v); }}
              extra={
                <div style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-2" type="profile" style={{padding:'2px 0px 5px'}} onClick={showLayer.bind(this,{id:'placeOrderAmountHelper',side:'sell'})} />
                </div>
              }
            ><div className="fs16">Amount</div></InputItem>
            </List>
            <List className="bg-none no-border">
            <Item extra={
              <div>
                <span className="" style={{color:'#bbb'}}>$1.2 ≈ 0.00015ETH</span>
                <span className="d-inline-block ml5" style={{width:'25px',textAlign:'right'}}>
                  <WebIcon className="color-black-2 fs14" type="right"/>
                </span>
              </div>
            } >
              Gas
            </Item>
            </List>
            {
              false &&
              <List className="bg-none no-border">
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
              </List>
            }
            <List className="bg-none no-border">
            <Item>
              <div className="row align-items-center ml0 mr0 mb15 mt10">
                <div className="col fs16 pl0">Advanced</div>
                <div className="col-auto color-black-3 fs16 pr0">
                  <WebSwitch onChange={(checked)=>{showLayer({id:'placeOrderAdvance',side})}} />
                </div>
              </div>
              <Button className="mb15" type="primary">Send LRC</Button>
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
          className=""
          mode="light"
          onLeftClick={() => routeActions.goBack()}
          leftContent={[
            <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1 " onClick={gotoTrade}><WebIcon key="1" type="line-chart" /></span>
          ]}
        >
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>Send</div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <TransferForm side="buy" />

      </div>
    );
  }
}
const TransferForm = createForm()(connect(({layers})=>({layers}))(Transfer))
export default TransferForm





