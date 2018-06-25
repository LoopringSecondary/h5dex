import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Button as WebButton,Input } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'

const Item = List.Item;
const Brief = Item.Brief;

class Face2FaceForm extends React.Component {
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
    const submitOrder = ()=>{
      showLayer({
        id:'face2FaceConfirm'
      })
    }
    return (
      <div className="">
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
              <Button onClick={showLayer.bind(this,{id:'helperOfTokens'})} type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>Sell EOS</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Button onClick={showLayer.bind(this,{id:'helperOfTokens'})} type="ghost" className="fs16 color-black-2 d-flex justify-content-between align-items-center pl15 pr15" style={{height:'40px',lineHeight:'40px'}}>
                <span>Buy LRC</span> <WebIcon className="color-black-3" type="down"/>
              </Button>
            </div>
          </div>
          <div className="row ml0 mr0 mt20 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Input type="text"/>
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
              <Input type="text"/>
              {
                false &&
                <div className="d-none fs14 color-black-3 mt5 text-left d-flex justify-content-between">
                  <span>Balance</span>
                  <span>0.0000</span>
                </div>
              }
            </div>
          </div>
          <div className="row ml0 mr0 pt15 pb15 no-gutters">
            <div className="col">
              <div className="color-black-2 fs14">Exchage Price</div>
            </div>
            <div className="col-auto fs14 color-black-3">
              20.0000 EOS/LRC
            </div>
          </div>
          <Button className="" onClick={submitOrder} type="primary">Exchange EOS To LRC</Button>
        </div>
      </div>
    );
  }
}
export default connect()(Face2FaceForm)






