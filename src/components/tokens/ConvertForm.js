import React from 'react';
import {Form, Input, Button as WebButton,Icon} from 'antd';
import {Button,List,InputItem} from 'antd-mobile';
import {getBalanceBySymbol, getWorthBySymbol,isValidNumber} from "../../modules/tokens/TokenFm";
import TokenFormatter from '../../modules/tokens/TokenFm';
import Contracts from 'LoopringJS/ethereum/contracts/Contracts'
import {toBig, toHex} from "../../common/loopringjs/src/common/formatter";
import config from '../../common/config'
import Currency from 'modules/settings/CurrencyContainer'
import {connect} from "dva";
import {Containers} from 'modules'
import GasFee from '../setting/GasFee1'
import Notification from '../../common/loopringui/components/Notification'
import intl from 'react-intl-universal';

function ConvertForm(props) {
  const {form} = props
  const sourceToken = 'ETH'
  const targetToken = sourceToken.toLowerCase() === 'eth' ? 'WETH' : 'ETH'
  const convertAmountValidator = ()=>{}
  const amount = 0
  const handleAmountChange = ()=>{}
  const setMax = ()=>{}
  const setGas = ()=>{}
  const toConvert = ()=>{}
  const gas = '0.00015 ETH'
  const gasWorth = '5.56'

  return (
    <div className="" style={{background:'#fff',color:'#000'}}>
      <div className="zb-b-b p20 mb25">
        <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
          <div className="col-auto text-center" style={{width:'80px'}}>
            <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
              <i className={`icon-ETH fs24`}/>
            </div>
          </div>
          <div className="col-auto text-center" style={{width:'80px'}}>
            <Icon type="arrow-right" className={`color-black-1 fs20`} />
          </div>
          <div className="col-auto text-center" style={{width:'80px'}}>
            <div className="d-inline-block color-black-1 text-center" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid #000"}}>
              <i className={`icon-WETH fs24`}/>
            </div>
          </div>
        </div>
        <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center">
          <div className="col-auto text-center" style={{width:'80px'}}>
            <div className="color-black-2 fs16">WETH</div>
          </div>
          <div className="col-auto text-center" style={{width:'80px'}}>
            <div className="color-black-2 fs16">1 : 1</div>
          </div>
          <div className="col-auto text-center" style={{width:'80px'}}>
            <div className="color-black-2 fs16">ETH</div>
          </div>
        </div>
      </div>
       <List className="bg-none">
        <InputItem
          type="number"
          placeholder="0.00000000"
          clear
          moneyKeyboardAlign="left"
          extra={<Icon type="profile" style={{padding:'2px 0px 5px 20px',outline:'5px'}} onClick={()=>{}} />}
        ><div className="fs20">Price</div></InputItem>
      </List>
      <div className="position-fixed w-100 bg-white" style={{bottom:'0',left:0,right:0,zIndex:10}}>
        <Button onClick={()=>{}} type="primary" className="m10 fs16" style={{height:'44px',lineHeight:'44px'}}>
          <i className="fs24 loopring-icon loopring-icon-convert mr10"></i>
          <span className="d-inline-block position-relative" style={{top:'-3px'}}>Convert ETH To WETH </span>
        </Button>
      </div>
    </div>
  )
}

function mapToProps(state) {
  return {
    balances:state.sockets.balance.items,
    prices:state.sockets.marketcap.items,
    gasPrice:state.gas.gasPrice.last
  }
}

export default connect(mapToProps)(Form.create()(ConvertForm))
