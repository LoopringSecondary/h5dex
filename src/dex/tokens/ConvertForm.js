import React from 'react'
import { Button, Icon, InputItem, List, NavBar, Toast, Popover } from 'antd-mobile'
import { Icon as WebIcon, Input, InputNumber } from 'antd'
import { connect } from 'dva'
import routeActions from 'common/utils/routeActions'
import { toBig, toHex, toNumber } from '../../common/loopringjs/src/common/formatter'
import Contracts from '../../common/loopringjs/src/ethereum/contracts/Contracts'
import TokenFormatter, { getBalanceBySymbol, isValidNumber } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import intl from 'react-intl-universal'
import storage from 'modules/storage'
import Worth from 'modules/settings/Worth'
import { signTx } from '../../common/utils/signUtils'
import ConvertHelperOfBalance from './ConvertHelperOfBalance'

const WETH = Contracts.WETH

class Convert extends React.Component {
  state = {
    token: 'ETH'
  }

  componentDidMount () {
    const {match} = this.props
    if (match && match.params && match.params.token) {
      this.setState({token: match.params.token})
    }
  }

  render () {
    const {dispatch, balance, amount, gas} = this.props
    const {token} = this.state
    const address = storage.wallet.getUnlockedAddress()
    const assets = getBalanceBySymbol({balances: balance.items, symbol: token, toUnit: true})
    const gasPrice = gas.tabSelected === 'estimate' ? gas.gasPrice.estimate : gas.gasPrice.current
    const gasLimit = token.toLowerCase() === 'eth' ? config.getGasLimitByType('deposit').gasLimit : config.getGasLimitByType('withdraw').gasLimit
    const tf = new TokenFormatter({symbol: token})
    const gasFee = toBig(gasPrice).times(gasLimit).div(1e9)
    const showLayer = (payload = {}) => {
      dispatch({
        type: 'layers/showLayer',
        payload: {
          ...payload
        }
      })
    }
    const hideLayer = (payload = {}) => {
      dispatch({
        type: 'layers/hideLayer',
        payload: {
          ...payload
        }
      })
    }
    const setGas = () => {
      showLayer({
        id: 'helperOfGas',
        gasLimit
      })
    }

    const setMax = () => {
      let max = assets.balance
      if (token === 'ETH') {
        max = toBig(assets.balance).minus(gasFee).minus(0.1).isPositive() ? toBig(assets.balance).minus(gasFee).minus(0.1) : toBig(0)
      }
      dispatch({type: 'convert/setMax', payload: {amount: max, amount1: max}})
    }
    const gotoConfirm = async () => {
      if (!isValidNumber(amount)) {
        Toast.info(intl.get('notifications.title.invalid_number'), 1, null, false)
        return
      }

      if (toBig(amount).plus(gasFee).gt(assets.balance)) {
        Toast.info(intl.get('convert.not_enough_tip', {token}), 1, null, false)
        return
      }
      let data = ''
      let value = ''
      if (token.toLowerCase() === 'eth') {
        data = WETH.encodeInputs('deposit')
        value = toHex(tf.getDecimalsAmount(amount))
      } else {
        data = WETH.encodeInputs('withdraw', {wad: toHex(tf.getDecimalsAmount(amount))})
        value = '0x0'
      }
      const to = config.getTokenBySymbol('WETH').address
      const tx = {
        gasLimit,
        data,
        to,
        gasPrice: toHex(toBig(gasPrice).times(1e9)),
        chainId: config.getChainId(),
        value,
        nonce: toHex((await window.RELAY.account.getNonce(address)).result)
      }

      signTx(tx).then(res => {
        if (res.result) {
          window.ETH.sendRawTransaction(res.result).then(resp => {
            if (resp.result) {
              window.RELAY.account.notifyTransactionSubmitted({
                txHash: resp.result,
                rawTx: tx,
                from: address
              })
              Toast.success(intl.get('notifications.title.convert_suc'), 3, null, false)
              hideLayer({id: 'convertToken'})
            } else {
              Toast.fail(intl.get('notifications.title.convert_fail') + ':' + resp.error.message, 3, null, false)
            }
          })
        } else {
          Toast.fail(intl.get('notifications.title.convert_fail') + ':' + res.error.message, 3, null, false)
        }
      })
    }
    const amountChange = (value) => {
      dispatch({type: 'convert/amountChange', payload: {amount:value }})
    }
    const swap = () => {
      const {token} = this.state
      if (token.toLowerCase() === 'eth') {
        this.setState({token: 'WETH'})
      } else {
        this.setState({token: 'ETH'})
      }
    }
    const _this = this
    const fromToken = token
    const toToken = token.toLowerCase() === 'eth' ? 'WETH' : 'ETH'
    return (
      <div className="bg-white">
        <NavBar
          className="zb-b-b"
          mode="light"
          onLeftClick={() => routeActions.goBack()}
          leftContent={[
            <span key='1' className=""><Icon type="left"/></span>,
          ]}
          rightContent={[
            <Button size="small" onClick={swap} key='1' className="text-primary"><WebIcon type="swap"/></Button>,
          ]}
        >
          {fromToken === 'ETH' ? intl.get('convert.convert_eth_title') : intl.get('convert.convert_weth_title')}
        </NavBar>
        <div className="zb-b-b">
          <div hidden={true} className="">
            <List>
              <InputItem
                type="text"
                onFocus={() => {alert('focused')}}
                ref={el => _this.inputRef = el}
              >
              </InputItem>
            </List>
            <div className="mt15">
              <Input className="d-block w-100"/>
            </div>
          </div>
          <div className="p15">
            <div className="row ml0 mr0 no-gutters align-items-stretch justify-content-center" style={{}}>
              <div className="col text-right no-border am-list-bg-none">
                <List  className="selectable">
                  <InputItem
                    type="money"
                    onChange={amountChange}
                    moneyKeyboardAlign="left"
                    value={amount}
                    extra={<div className="fs14 color-black-3">{fromToken}</div>}
                    className="circle h-default"
                  >
                  </InputItem>
                  <InputItem
                    type="money"
                    disabled
                    extra={<div onClick={gotoConfirm} className="fs14 color-black-3">
                      <Worth amount={gasFee} symbol='ETh'/> ≈ {toNumber(gasFee)} ETH
                      <WebIcon hidden className="ml5 text-primary" type="right"/>
                    </div>}
                    className="circle h-default mt15"
                  >
                    <div className="fs13 color-black-3">{intl.get('common.gas')}</div>
                  </InputItem>
                </List>
              </div>
            </div>
            <Button className="b-block w-100 mt15" size="large" onClick={gotoConfirm} type="primary">
              <div className="row ml0 mr0 no-gutters fs18 align-items-center">
                <div className="col">{amount.toString()} <span className="fs14">{fromToken}</span></div>
                <div className="col-auto" style={{background:'rgba(0,0,0,0.05)',padding:'0 1.2rem'}}>→</div>
                <div className="col">{amount.toString()} <span className="fs14">{toToken}</span></div>
              </div>
            </Button>
          </div>
          <div className="bg-grey-100">
            <div className="divider zb-b-b 1px"></div>
            <ConvertHelperOfBalance dispatch={dispatch} token={{symbol:token,balance:assets.balance}} gasFee={gasFee}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
    prices: state.sockets.marketcap.items,
    amount: state.convert.amount,
    gas: state.gas
  }
}

export default connect(mapStateToProps)(Convert)






