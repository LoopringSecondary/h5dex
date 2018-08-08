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
import { isApproving } from '../../modules/transactions/formatters'
import storage from 'modules/storage'
import { signTx } from '../../common/utils/signUtils'
import { keccakHash } from 'LoopringJS/common/utils'

const ERC20 = Contracts.ERC20Token
const gasLimit = config.getGasLimitByType('approve').gasLimit

const TodoItem = (props) => {
  const {item = {}, balance, dispatch, pendingTxs, gasPrice,approveCb} = props
  const showActions = () => {
    dispatch({type: 'layers/showLayer', payload: {id: 'helperOfTokenActions', symbol: item.symbol, hideBuy: false}})
  }
  const showLayer = (payload = {}) => {
    dispatch({
      type: 'layers/showLayer',
      payload: {
        ...payload
      }
    })
  }

  const enable = async () => {
    const owner = storage.wallet.getUnlockedAddress()

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
        value: '0x0'
      })
    }
    txs.push({
      gasLimit: gasLimit,
      data: ERC20.encodeInputs('approve', {_spender: delegateAddress, _value: amount}),
      to: token.address,
      gasPrice: gasPrice,
      chainId: config.getChainId(),
      value: '0x0',
    })

    if (owner) {
      let nonce = (await window.RELAY.account.getNonce(owner)).result
      txs.forEach((tx, index) => {
        tx.nonce = toHex(nonce + index)
      })
    }
    const hash = keccakHash(txs)
    window.RELAY.order.storeDatasInShortTerm(hash, JSON.stringify(txs)).then(res => {
      approveCb(hash)
      if (!res.error) {
        showLayer({id: 'helperOfSign', type: 'approve', data: {type: 'approve', value: hash}})
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

  if (item.type === 'allowance') {
    return (
      <div className="row ml0 mr0 pl10 pr10 pt15 pb15 align-items-center zb-b-b no-gutters" onClick={() => {}}>
        <div className="col-auo pr15 color-black text-center">
          <WebIcon className="color-error fs16" type="close-circle"/>
        </div>
        <div className="col text-left">
          <div>
            <div className="fs16 color-black-1">
              {intl.get('todo_list.allowance_not_enough_title', {symbol: item.symbol})}
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div>
            <Button disabled={loading()} inline={true} style={{width: '80px'}} type="primary" size="small" className=""
                    onClick={enable}>
              {loading() ? intl.get('todo_list.status_enabling') : intl.get('todo_list.actions_enable')}
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
                {intl.get('todo_list.balance_not_enough_title', {symbol: item.symbol})}
              </div>
            </div>
          </div>
        </div>
        <div className="row ml0 mr0 pl10 pr10 pb15 pt5 align-items-center zb-b-b no-gutters" onClick={() => {}}>
          <div className="col-auo pr30 text-center color-white">
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
              <Button hidden inline={true} type="ghost" size="small" className="mr5 mt5" href="">View Orders</Button>
            </div>
          </div>
        </div>
      </div>)
  }
}

class ListTodos extends React.Component {

  componentWillReceiveProps (newProps) {
    const {auth} = newProps
    const {hash} = this.state
    if (hash === auth.hash && auth.status === 'accept') {
      Toast.success(intl.get('notifications.title.enable_suc'), 3, null, false)
      this.setState({hash: ''})
    }
  }

  approveCb = (hash) => {
    this.setState({hash})
  }

  render () {
    const {dispatch, balance, txs, allocates, gasPrice} = this.props
    const goBack = () => {
      routeActions.goBack()
    }
    let data = []
    const lrcFee = allocates['frozenLrcFee'] || 0
    const symbols = Object.keys(allocates)
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
          data.push({
            symbol: symbol,
            type: 'allowance',
            selling,
            title: `${symbol} allowance is insufficient for orders`
          })
        }
        callback()
      } else {
        callback()
      }
    }, (error) => {
      data = data.sort((a, b) => {return a.type < b.type ? -1 : 1})
    })

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
    const segmentChange = () => {

    }
    return (
      <LayoutDexHome {...this.props}>
        <div className="">
          <NavBar
            className="w-100 zb-b-b bg-white"
            mode="light"
            icon={null && <Icon type="left"/>}
            onLeftClick={() => routeActions.goBack()}
            leftContent={null && [
              <WebIcon key="1" type="left" className="color-black-1" onClick={goBack}/>,
            ]}
            rightContent={null && [
              <WebIcon onClick={() => window.Toast.info('Coming Soon', 1, null, false)} key="1" type="question-circle-o"
                       className=""/>,
            ]}
          >
            {
              false &&
              <SegmentedControl
                values={[intl.get('todo_list.todo_list_title'), intl.get('message_list.message_list_title')]}
                style={{width: '180px', height: '32px'}}/>
            }
            {intl.get('todo_list.todo_list_title')}
          </NavBar>
          {data.length > 0 && (storage.wallet.getUnlockedType === 'loopr' || storage.wallet.getUnlockedType === 'mock') &&
          <NoticeBar onClick={enableAll} className="text-left t-error s-lg"
                     icon={<WebIcon type="exclamation-circle-o"/>}
                     mode="link" marqueeProps={{loop: true}} action={<span>Enable All<WebIcon type="right"/></span>}>
            One click to enable all tokens ?
          </NoticeBar>}
          <div className="">
            <div className="bg-white">
              {
                data.map((item, index) =>
                  <TodoItem key={index} item={item} balance={balance} dispatch={dispatch} pendingTxs={txs} approveCb = {this.approveCb}
                            gasPrice={toHex(toBig(gasPrice).times(1e9))}/>
                )
              }
            </div>
            {!data || data.length === 0 &&
            <div className="pl10 pt10 pb10 color-black-4 fs12 text-center">
              {false && intl.getHTML('todos.instruction')}
              {intl.get('common.list.no_data')}
            </div>
            }
          </div>
          <div className="pt50"></div>
        </div>
      </LayoutDexHome>
    )
  }

}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
    txs: state.sockets.pendingTx.items,
    allocates: state.sockets.orderAllocateChange.items,
    gasPrice: state.gas.gasPrice.estimate,
    auth: state.sockets.circulrNotify.item
  }
}

export default connect(mapStateToProps)(ListTodos)

