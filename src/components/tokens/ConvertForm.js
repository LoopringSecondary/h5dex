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
          <div className="" onClick={showLayer.bind(this,{id:'placeOrderMarketHelper'})}>Convert</div>
        </NavBar>
        <div className="zb-b-b pt25 pb25 pl15 pr15">
          <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-ETH fs24`}/>
              </div>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
              <WebIcon type="arrow-right" className={`color-black-1 fs20`} />
            </div>
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
                <i className={`icon-WETH fs24`}/>
              </div>
            </div>
          </div>
          <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center lh1">
            <div className="col text-center">
              <div className="color-black-2 fs16">ETH</div>
            </div>
            <div className="col-auto text-center position-relative" style={{width:'30px'}}>
              <div className="color-black-3 fs16" ></div>
            </div>
            <div className="col text-center">
              <div className="color-black-2 fs16">WETH</div>
            </div>
          </div>
          <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Button type="ghost" className="fs16 color-black-2 text-center" style={{height:'40px',lineHeight:'40px'}}>
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
              <Button type="ghost" className="fs16 color-black-2 text-center" style={{height:'40px',lineHeight:'40px'}}>
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
          <div hidden className="row ml0 mr0 mt15 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Ratio</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              1 ETH = 1 WETH
            </div>
          </div>
          <Button className="mt20" onClick={()=>{}} type="primary">Convert ETH To WETH</Button>
          <div className="row ml0 mr0 mt20 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Gas Fee</div>
            </div>
            <div className="col-auto fs14 color-black-2">
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






