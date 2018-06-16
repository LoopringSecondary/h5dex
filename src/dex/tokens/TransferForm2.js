import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
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
      showLayer({id:'PlaceOrderPriceHelper'})
    }
    const { getFieldProps } = this.props.form;
    const { type } = this.state;

    const PlaceOrderForm = (props)=>{
      const { side } = props
      return (
        <div>

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
    const onValueChange = (val)=>{
      console.log('onValueChange',onValueChange)
      if(val === 'Send'){
        routeActions.gotoPath('/wallet/send')
      }
      if(val === 'Send2'){
        routeActions.gotoPath('/wallet/send2')
      }
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
          rightContent={[
            <span className="color-black-1 " onClick={()=>{}}><WebIcon key="1" type="question-circle-o" /></span>
          ]}
        >
          <SegmentedControl onValueChange={onValueChange} selectedIndex={0} values={['Send', 'Send2']} style={{width:'210px',height:'32px'}} />
        </NavBar>

        <div className="zb-b-b p15">
          <Button type="ghost" className="fs16 color-black-2 text-left pl15 pr15 d-flex justify-content-between" style={{height:'40px',lineHeight:'40px'}}>
            <span className="color-black-3">Token</span>
            <span className="color-black-1">
              <span hidden className="color-black-3 mr5">Balance 20.0000 </span>EOS
              <span className="ml15 color-black-2">
                <WebIcon type="profile" />
              </span>
            </span>
          </Button>
          <Button type="ghost" className="mt20 fs16 color-black-2 text-left pl15 pr15 d-flex justify-content-between" style={{height:'40px',lineHeight:'40px'}}>
            <span className="color-black-3">To</span>
            <span className="color-black-3">
              recipient address
              <span className="ml15 color-black-2">
                <WebIcon type="scan" />
              </span>
            </span>
          </Button>

          <Button type="ghost" className="mt20 fs16 color-black-2 text-left pl15 pr15 d-flex justify-content-between" style={{height:'40px',lineHeight:'40px'}}>
            <span className="color-black-3">Amount</span>
            <span className="color-black-3">
              00.00000
              <span className="ml15 color-black-2">
                <WebIcon type="profile" />
              </span>
            </span>
          </Button>
          <div className="row ml0 mr0 mt20 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Gas Fee</div>
            </div>
            <div className="col-auto fs14 color-black-2">
              $1.2 ≈ 0.00015ETH
              <WebIcon className="ml5" type="right" />
            </div>
          </div>
          <div className="row align-items-center ml0 mr0 mt20 mb20">
            <div className="col fs14 pl0 color-black-2">Advanced</div>
            <div className="col-auto color-black-2 fs16 pr0">
              <WebSwitch size="" onChange={(checked)=>{showLayer({id:'placeOrderAdvance',side})}} />
            </div>
          </div>
          <Button className="" onClick={()=>{}} type="primary">Send EOS</Button>
        </div>
      </div>
    );
  }
}
const TransferForm = createForm()(connect(({layers})=>({layers}))(Transfer))
export default TransferForm






