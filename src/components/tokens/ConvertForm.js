import React from 'react';
import {Form, Input, Button,Icon} from 'antd';
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
    <div className="p15" style={{background:'#0e45c5',color:'#fff'}}>
      <div className="divider solid"/>
      <div className="row align-items-center justify-content-center mt25 mb25 ml0 mr0">
        <div className="col-auto text-center pr30">
          <div className="fs18">{amount}</div>
          <div className="fs16">{sourceToken}</div>
        </div>
        <div className="col-auto">
          <i className="loopring-icon loopring-icon-convert fs32"/>
        </div>
        <div className="col-auto text-center pl30">
          <div className="fs18">{amount}</div>
          <div className="fs16">{targetToken}</div>
        </div>
      </div>
      <Form>
        <Form.Item className="prefix">
          {form.getFieldDecorator('amount', {
            initialValue: amount,
            rules: [{
              required: true,
              message: 'invalid number',
              validator: convertAmountValidator,
            }]
          })(
            <Input  suffix={<div>
              <Icon type="question-circle-o" />
            </div>} onChange={handleAmountChange}/>
          )}
        </Form.Item>
      </Form>
      <div  className="text-color-dark-1">
        <div className="form-control-static d-flex justify-content-between mr-0 mt15 mb15 align-items-center">
          <span className="fs14 color-white-2">{intl.get('common.gas')}</span>
          <span className="font-bold cursor-pointer fs12" onClick={setGas}>
              <Currency/> {gasWorth} ≈ {gas}
              <Icon type="right" className="ml5" />
          </span>
        </div>
      </div>
      <Button className="btn-block btn-xlg btn-o-dark" onClick={toConvert}>{intl.get('convert.actions_confirm_convert')}</Button>
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
