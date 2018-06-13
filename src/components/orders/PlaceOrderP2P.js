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
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>Face To Face</div>
        </NavBar>
        <div className="zb-b-b pt25 pb25 pl15 pr15">
          <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-EOS fs24`}/>
              </div>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
              <WebIcon type="arrow-right" className={`color-black-1 fs20`} />
            </div>
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-LRC fs24`}/>
              </div>
            </div>
          </div>
          <div className="row ml0 mr0 mt20 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Button type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>Sell EOS</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Button type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>Buy LRC</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
          </div>
          <div className="row ml0 mr0 mt20 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Button type="ghost" className="fs16 color-black-2 text-left pl15" style={{height:'40px',lineHeight:'40px'}}>
                <span className="color-black-3">0.0000</span>
              </Button>
              {
                false &&
                <div className="d-none fs14 color-black-3 mt5 text-left d-flex justify-content-between">
                  <span>Balance</span>
                  <span>0.0000</span>
                </div>
              }
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Button type="ghost" className="fs16 color-black-2 text-left pl15" style={{height:'40px',lineHeight:'40px'}}>
                <span className="color-black-3">0.0000</span>
              </Button>
              {
                false &&
                <div className="d-none fs14 color-black-3 mt5 text-left d-flex justify-content-between">
                  <span>Balance</span>
                  <span>0.0000</span>
                </div>
              }
            </div>
          </div>
          <Button className="mt20" onClick={()=>{}} type="primary">Exchange EOS To LRC</Button>
          <div className="row ml0 mr0 mt10 pt10 pb10 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Exchage Price</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              20.0000 EOS/ETH
            </div>
          </div>
          <div className="row ml0 mr0 pt10 pb10 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">ETH Gas</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              $1.2 ≈ 0.00015 ETH
              <WebIcon type="right" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
const PlaceOrderForm = createForm()(connect(({layers})=>({layers}))(PlaceOrder))
export default PlaceOrderForm






