import React from 'react'
import { Button, List, NavBar,Toast } from 'antd-mobile'
import { Button as WebButton, Icon as WebIcon, Input,Form } from 'antd'
import { connect } from 'dva'
import routeActions from 'common/utils/routeActions'
import {toHex,toBig,toNumber} from '../../common/loopringjs/src/common/formatter'
import Contracts from '../../common/loopringjs/src/ethereum/contracts/Contracts'
import TokenFormatter, { getBalanceBySymbol, getPriceBySymbol, isValidNumber } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import intl from 'react-intl-universal'

const WETH = Contracts.WETH;
const Item = List.Item;
const Brief = Item.Brief;

class Convert extends React.Component {
  state = {
    token: 'ETH',
    amount:0,
    address:''
  }

  componentDidMount() {
    const {convertToken} = this.props;
    if(convertToken && convertToken.token){
      this.setState({token:convertToken.token})
    }
    window.Wallet.getCurrentAccount().then(res => {
      if (res.result) {
        this.setState({address: res.result})
      }
    })

  }

  render() {
    const {dispatch,balance,form,prices} = this.props
    const {token,amount,address} = this.state;
    const assets = getBalanceBySymbol({balances:balance.items, symbol: token, toUnit: true});
    const gasPrice = '0x2540be400'
    const gasLimit = '0x249f0'
    const tf = new TokenFormatter({symbol:token});
    const gasFee = tf.getUnitAmount(toBig(gasPrice).times(gasLimit));
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

    const setMax = () => {
      let max = assets.balance;
      if (token === 'ETH') {
        max = toBig(assets.balance).minus(gasFee).minus(0.1).isPositive() ? toBig(assets.balance).minus(gasFee).minus(0.1) : toBig(0)
      }
      dispatch({type:'convert/setMax',payload:{amount: max,amount1:max}});
      form.setFieldsValue({amount:max})
    };
    const gotoConfirm= async ()=> {
      if(!isValidNumber(amount)){
        Toast.info('请输入合法的数字')
        return;
      }

      if(toBig(amount).plus(gasFee).gt(assets.balance)){
        Toast.info('余额不足')
        return;
      }

      let data = '';
      let value = '';
      if (token.toLowerCase() === 'Eth') {
        data = WETH.encodeInputs('deposit');
        value = toHex(tf.getDecimalsAmount(amount));
      } else {
        data = WETH.encodeInputs('withdraw', {wad: toHex(tf.getDecimalsAmount(amount))});
        value = '0x0'
      }
      const to = config.getTokenBySymbol('WETH').address;
      const tx = {
        gasLimit: toHex(gasLimit),
        data,
        to,
        gasPrice: toHex(gasPrice),
        chainId: config.getChainId(),
        value,
        nonce: toHex(await window.RELAY.account.getNonce(address))
      }
      window.Wallet.signTx(tx).then(res => {
        if(res.result){
          window.ETH.sendRawTransaction(res.result).then(resp => {
            if(resp.result){
              window.RELAY.account.notifyTransactionSubmitted({
                txHash: resp.result,
                rawTx: tx,
                from: address
              });
            }
          })
        }
      })
    }
    const amountChange = (e) => {
      this.setState({amount:e.target.value})
    }
    const swap = () => {
      const {token} = this.state;
      if(token.toLowerCase() === 'eth'){
        this.setState({token:'WETH'})
      }else{
        this.setState({token:'ETH'})
      }
    }
    return (
      <div className="bg-white">
        <NavBar
          className="zb-b-b"
          mode="light"
          onLeftClick={() => routeActions.goBack()}
          leftContent={[
            <span key = '1' className="color-black-1"><WebIcon key="1" type="left" /></span>,
          ]}
          rightContent={[
            <Button key="1" size="small" type="ghost" className="color-black-2 fs18 mr10" style={{padding:'0 7px'}} onClick={()=>{}}><WebIcon  type="question" /></Button>,
            <Button key="2" size="small" type="ghost" className="color-black-2 fs18" style={{padding:'0 7px'}} onClick={swap}><WebIcon  type="swap" /></Button>,
          ]}
        >
          Convert {token}
        </NavBar>
        <div className="zb-b-b pt25 pb25 pl15 pr15">
          <div className="row ml0 mr0 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center border-grey-300" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid"}}>
                <i className={`icon-${token.toUpperCase()} fs24`}/>
              </div>
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
              <WebIcon type="arrow-right" className={`color-black-1 fs20`} />
            </div>
            <div className="col text-center">
              <div className="d-inline-block color-black-1 text-center border-grey-300" style={{width:"40px",height:'40px',lineHeight:'38px',borderRadius:'50em',border:"1px solid"}}>
                <i className={`icon-${token.toLowerCase() === 'eth' ? 'WETH':'ETH'} fs24`}/>
              </div>
            </div>
          </div>
          <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center lh1">
            <div className="col text-center">
              <div className="color-black-2 fs16">{token}</div>
            </div>
            <div className="col-auto text-center position-relative" style={{width:'30px'}}>
              <div className="color-black-3 fs16" ></div>
            </div>
            <div className="col text-center">
              <div className="color-black-2 fs16">{token.toLowerCase() === 'eth' ? 'WETH' : 'ETH'}</div>
            </div>
          </div>

          <div className="row ml0 mr0 mt15 no-gutters align-items-center justify-content-center">
            <div className="col text-center">
              <Input type="text" onChange={amountChange} value={amount} />
            </div>
            <div className="col-auto text-center" style={{width:'30px'}}>
            </div>
            <div className="col text-center">
              <Input type="text" onChange={amountChange} value={amount} />
            </div>
          </div>
          <WebButton className="mt20 b-block w-100" size="large" onClick={gotoConfirm} type="primary">{token.toLowerCase() === 'eth' ? 'Convert ETH To WETH' : 'Convert WETH To ETH'}</WebButton>
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
              ${tf.toPricisionFixed(gasFee.times(getPriceBySymbol({prices, symbol:'ETH', ifFormat:true}).price))} ≈ {toNumber(gasFee)} ETH
              <WebIcon type="right" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {

  return {
    balance:state.sockets.balance,
    prices:state.sockets.marketcap.items,
  }
}

export default connect(mapStateToProps)(Convert)






