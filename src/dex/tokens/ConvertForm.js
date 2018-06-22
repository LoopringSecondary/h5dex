import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Button as WebButton,Input } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'
const Item = List.Item;
const Brief = Item.Brief;

class Convert extends React.Component {
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
            <Button key="1" size="small" type="ghost" className="color-black-2 fs18 mr10" style={{padding:'0 7px'}} onClick={()=>{}}><WebIcon  type="question" /></Button>,
            <Button key="2" size="small" type="ghost" className="color-black-2 fs18" style={{padding:'0 7px'}} onClick={()=>{}}><WebIcon  type="swap" /></Button>,
          ]}
        >
          {false && <SegmentedControl selectedIndex={0} values={['To WETH', ' To ETH']} style={{width:'210px',height:'32px'}}/>}
          {
            false &&
            <WebButton.Group>
              <WebButton>To WETH</WebButton>
              <WebButton>To ETH</WebButton>
            </WebButton.Group>
          }
          Convert
        </NavBar>
        <div className="zb-b-b pt25 pb25 pl15 pr15">
          <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center border-grey-300" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid"}}>
                <i className={`icon-ETH fs24`}/>
              </div>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
              <WebIcon type="arrow-right" className={`color-black-1 fs20`} />
            </div>
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center border-grey-300" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid"}}>
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
              <Input type="text" />
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
              <Input type="text" />
              {
                false &&
                <div className="d-none fs14 color-black-3 mt5 text-left d-flex justify-content-between">
                  <span>Balance</span>
                  <span>0.0000</span>
                </div>
              }
            </div>
          </div>
          <WebButton className="mt20 b-block w-100" size="large" onClick={()=>{}} type="primary">Convert ETH To WETH</WebButton>
          <div className="row ml0 mr0 mt15 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Ratio</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              1 ETH = 1 WETH
            </div>
          </div>
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
const ConvertForm = connect(({layers})=>({layers}))(Convert)
export default ConvertForm






