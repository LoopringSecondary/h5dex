import React from 'react'
import { connect } from 'dva'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Button, Icon, NavBar, NoticeBar, SegmentedControl, Modal, Toast } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { toBig, toHex, toNumber } from 'LoopringJS/common/formatter'
import TokenFormatter, { getBalanceBySymbol } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import Contracts from 'LoopringJS/ethereum/contracts/Contracts'
import eachLimit from 'async/eachLimit'
import each from 'async/each'
import { isApproving,lastApprovingTx } from '../../modules/transactions/formatters'
import storage from 'modules/storage'
import { signTx } from '../../common/utils/signUtils'
import { getShortAddress } from '../../modules/formatter/common'

const ERC20 = Contracts.ERC20Token
const gasLimit = config.getGasLimitByType('approve').gasLimit

const TodoItem = (props) => {
  const {item = {}, balance, dispatch, pendingTxs, gasPrice} = props
  const showActions = () => {
    dispatch({type: 'layers/showLayer', payload: {id: 'helperOfTokenActions', symbol: item.symbol, hideBuy: false}})
  }
  const enable = async () => {
    let nonce = (await window.RELAY.account.getNonce(storage.wallet.getUnlockedAddress())).result
    const assets = getBalanceBySymbol({balances: balance.items, symbol: item.symbol})
    const delegateAddress = config.getDelegateAddress()
    const token = config.getTokenBySymbol(item.symbol)
    const amount = toHex(toBig('9223372036854775806').times('1e' + token.digits || 18))
    const txs = []
    let allowance = assets.allowance
    if (isApproving(pendingTxs, item.symbol)) {
      allowance = isApproving(pendingTxs, item.symbol)
    }
    if (allowance.gt(0)) {
      txs.push({
        gasLimit: gasLimit,
        data: ERC20.encodeInputs('approve', {_spender: delegateAddress, _value: '0x0'}),
        to: token.address,
        gasPrice: gasPrice,
        chainId: config.getChainId(),
        value: '0x0',
        nonce: toHex(nonce)
      })
      nonce = nonce + 1
    }
    txs.push({
      gasLimit: gasLimit,
      data: ERC20.encodeInputs('approve', {_spender: delegateAddress, _value: amount}),
      to: token.address,
      gasPrice: gasPrice,
      chainId: config.getChainId(),
      value: '0x0',
      nonce: toHex(nonce)
    })
    eachLimit(txs, 1, async (tx, callback) => {
      signTx(tx, true).then(res => {
        if (res.result) {
          window.ETH.sendRawTransaction(res.result).then(resp => {
            if (resp.result) {
              window.RELAY.account.notifyTransactionSubmitted({
                txHash: resp.result,
                rawTx: tx,
                from: storage.wallet.getUnlockedAddress()
              }).then(response => {
                callback()
              })
            } else {
              callback(resp.error)
            }
          })
        } else {
          callback(res.error)
        }
      })
    }, function (error) {
      if (error) {
        Toast.fail(intl.get('notifications.title.enable_failed') + ':' + error.message, 3, null, false)
      } else {
        Toast.success(intl.get('notifications.title.enable_suc'), 3, null, false)
      }
    })

  }

  const loading = () => {
    const allowance = isApproving(pendingTxs, item.symbol)
    const tf = new TokenFormatter({symbol: item.symbol})
    if (allowance) {
      return tf.getUnitAmount(allowance).gte(item.selling)
    }
    return false
  }

  const gotoDetail = () => {
    const approvingtx = lastApprovingTx(pendingTxs, item.symbol)
    if(approvingtx){
      routeActions.gotoHref(`https://etherscan.io/tx/${approvingtx.txHash}`)
    }else{
      Toast.info(intl.get('todo_list.no_detail'))
    }
  }

  if (item.type === 'allowance') {
    return (
      <div className="row ml0 mr0 pl10 pr10 pt15 pb15 align-items-center zb-b-b no-gutters" onClick={() => {}}>
        <div className="col-auo pr15 color-black text-center">
          <WebIcon className="color-error fs16" type="close-circle"/>
        </div>
        <div className="col text-left">
          <div>
            <div className="fs16 color-black-1">
              {intl.get('todo_list.title_allowance_not_enough', {symbol: item.symbol})}
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div>
            {!loading() && <Button inline={true} style={{width: '80px'}} type="primary" size="small" className=""
                                 onClick={enable}>
              {intl.get('todo_list.actions_enable')}
            </Button>}
            {loading() && <Button inline={true}  style={{width: '80px'}} type="primary" size="small" className=""
                                onClick={gotoDetail}>
              {intl.get('todo_list.status_enabling')}
            </Button>}
          </div>
        </div>
      </div>
    )
  }
  if (item.type === 'convert') {
    return (
      <div className="row ml0 mr0 pl10 pr10 pt15 pb15 align-items-center zb-b-b no-gutters" >
        <div className="col-auo pr10 color-black text-center">
          <WebIcon className="text-primary fs16" type="clock-circle"/>
        </div>
        <div className="col text-left">
          <div>
            <div className="fs16 color-black-1">
              {item.symbol.toUpperCase() === 'ETH' ? intl.get('todo_list.title_converting_eth_to_weth') : intl.get('todo_list.title_converting_weth_to_eth')}
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div>
            <Button disabled={false} inline={true} type="primary" size="small" className=""
                    onClick={routeActions.gotoHref.bind(this, `https://etherscan.io/tx/${item.txHash}`)}>
              {intl.get('todo_list.status_converting')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (item.type === 'balance') {
    return (
      <div className="">
        <div className="row ml0 mr0 pl10 pr10 pt15 align-items-center no-gutters" onClick={() => {}}>
          <div className="col-auo pr15 color-black text-center">
            <WebIcon className="color-error fs16" type="exclamation-circle"/>
          </div>
          <div className="col text-left">
            <div>
              <div className="fs16 color-black-1">
                {intl.get('todo_list.title_balance_not_enough', {symbol: item.symbol})}
              </div>
            </div>
          </div>
        </div>
        <div className="row ml0 mr0 pl10 pr10 pb15 pt5 align-items-center zb-b-b no-gutters" onClick={() => {}}>
          <div className="col-auo pr15 text-center color-white">
            <WebIcon className="color-white fs16" type="exclamation-circle"/>
          </div>
          <div className="col fs14 color-black-3 pr30">
            <div className="row no-gutters ml0 mr0 ">
              <div className="col-auto">
                {intl.get('todo_list.balance')}
              </div>
              <div className="col text-right">
                {item.balance}
              </div>
              <div className="col-auto pl5">
                {item.symbol}
              </div>
            </div>
            <div className="row no-gutters ml0 mr0">
              <div className="col-auto">
                {intl.get('todo_list.selling')}
              </div>
              <div className="col text-right">
                {item.selling}
              </div>
              <div className="col-auto pl5">
                {item.symbol}
              </div>
            </div>
            <div className="row no-gutters ml0 mr0">
              <div className="col-auto">
                {intl.get('todo_list.lack')}
              </div>
              <div className="col text-right">
                {item.lack}
              </div>
              <div className="col-auto pl5">
                {item.symbol}
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div>
              <Button inline={true} style={{width: '80px'}} type="primary" size="small" className=""
                      onClick={showActions}>
                {intl.get('common.actions')} <WebIcon type="down"/></Button>
            </div>
          </div>
        </div>
      </div>)
  }
}

function ListTodos (props) {
  const {dispatch, balance, txs, allocates, gasPrice} = props
  const goBack = () => {
    routeActions.goBack()
  }
  let data = []
  const lrcFee = allocates['frozenLrcFee'] || 0
  const symbols = Object.keys(allocates)
  if(balance.items.length !== 0){
    each(symbols, (symbol, callback) => {
      if (symbol.toLowerCase() !== 'frozenlrcfee') {
        const value = allocates[symbol]
        const tf = new TokenFormatter({symbol})
        const assets = getBalanceBySymbol({balances: balance.items, symbol: symbol, toUnit: true})
        const unitBalance = assets.balance
        let selling = tf.getUnitAmount(value)
        if (symbol.toUpperCase() === 'LRC') {
          selling = toNumber(selling) + toNumber(tf.getUnitAmount(lrcFee))
        }
        if (toNumber(unitBalance) < toNumber(selling)) {
          data.push({
            symbol: symbol,
            type: 'balance',
            balance: tf.toPricisionFixed(unitBalance),
            selling: tf.toPricisionFixed(selling),
            lack: tf.toPricisionFixed(toNumber(selling) - toNumber(unitBalance)),
            title: `${symbol} balance is insufficient for orders`
          })
        }
        let allowance = assets.allowance
        if (allowance.lt(toBig(selling))) {
          data.push({symbol: symbol, type: 'allowance', selling, title: `${symbol} allowance is insufficient for orders`})
        }
        callback()
      } else {
        callback()
      }
    }, (error) => {
      data = data.sort((a, b) => {return a.type < b.type ? -1 : 1})
    })
  }
  const enableAll = async () => {
    let nonce = (await window.RELAY.account.getNonce(storage.wallet.getUnlockedAddress())).result
    const approveJobs = data.filter(item => item.type === 'allowance')
    const txs = []
    eachLimit(approveJobs, 1, async (item, callback) => {
      const delegateAddress = config.getDelegateAddress()
      const token = config.getTokenBySymbol(item.symbol)
      const amount = toHex(toBig('9223372036854775806').times('1e' + token.digits || 18))
      const assets = getBalanceBySymbol({balances: balance.items, symbol: item.symbol})
      let allowance = assets.allowance
      if (isApproving(txs, item.symbol)) {
        allowance = isApproving(txs, item.symbol)
      }
      if (allowance.gt(0)) {
        txs.push({
          gasLimit: gasLimit,
          data: ERC20.encodeInputs('approve', {_spender: delegateAddress, _value: '0x0'}),
          to: token.address,
          gasPrice: toHex(toBig(gasPrice).times(1e9)),
          chainId: config.getChainId(),
          value: '0x0',
          nonce: toHex(nonce)
        })
        nonce = nonce + 1
      }
      txs.push({
        gasLimit: gasLimit,
        data: ERC20.encodeInputs('approve', {_spender: delegateAddress, _value: amount}),
        to: token.address,
        gasPrice: toHex(toBig(gasPrice).times(1e9)),
        chainId: config.getChainId(),
        value: '0x0',
        nonce: toHex(nonce)
      })
      nonce = nonce + 1
    }, function (error) {
      Toast.fail(error.message, 3, null, false)
    })

    eachLimit(txs, 1, async (tx, callback) => {
      signTx(tx, true).then(res => {
        if (res.result) {
          window.ETH.sendRawTransaction(res.result).then(resp => {
            if (resp.result) {
              window.RELAY.account.notifyTransactionSubmitted({
                txHash: resp.result,
                rawTx: tx,
                from: storage.wallet.getUnlockedAddress()
              })
              callback()
            } else {
              callback(res.error)
            }
          })
        } else {
          callback(res.error)
        }
      })
    }, function (error) {
      if (error) {
        Toast.fail(error.message, 3, null, false)
      } else {
        Toast.success(intl.get('notifications.title.enable_suc'), 3, null, false)
      }
    })
  }
  const segmentChange = (e) => {
    const side = e.nativeEvent.selectedSegmentIndex === 0 ? 'buy' : 'sell'
    dispatch({
      type: 'placeOrder/sideChangeEffects',
      payload: {
        side
      }
    })
  }
  return (
    <div className="">
      {data.length > 0 && (storage.wallet.getUnlockedType === 'loopr' || storage.wallet.getUnlockedType === 'mock') &&
      <NoticeBar onClick={enableAll} className="text-left t-error s-lg"
                 icon={<WebIcon type="exclamation-circle-o"/>}
                 mode="link" marqueeProps={{loop: true}} action={<span>Enable All<WebIcon type="right"/></span>}>
        One click to enable all tokens ?
      </NoticeBar>}
      <div className="">
        <div className="bg-white">
          {
            txs.filter(tx => tx.type === 'convert_income').map((tx, index) =>
              <TodoItem key={index} item={{...tx, type: 'convert',}} balance={balance} dispatch={dispatch}
                        pendingTxs={txs}
                        gasPrice={toHex(toBig(gasPrice).times(1e9))}/>
            )
          }
          {
            data.map((item, index) =>
              <TodoItem key={index} item={item} balance={balance} dispatch={dispatch} pendingTxs={txs}
                        gasPrice={toHex(toBig(gasPrice).times(1e9))}/>
            )
          }

        </div>
        {!data || data.length === 0 &&
        <div className="pl10 pt10 pb10 color-black-4 fs12 text-center">
          {intl.get('common.list.no_data')}
        </div>}
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
    txs: state.sockets.pendingTx.items,
    allocates: state.sockets.orderAllocateChange.items,
    gasPrice: state.gas.gasPrice.estimate
  }
}

export default connect(mapStateToProps)(ListTodos)

