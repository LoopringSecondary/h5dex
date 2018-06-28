import React from 'react'
import { connect } from 'dva'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Button, Icon, Modal, NavBar, NoticeBar, SegmentedControl, Switch, Toast } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { toBig, toHex, toNumber } from 'LoopringJS/common/formatter'
import TokenFormatter, { getBalanceBySymbol } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import Contracts from 'LoopringJS/ethereum/contracts/Contracts'
import eachLimit from 'async/eachLimit'
import { isApproving } from '../../modules/transactions/formatters'
import storage from 'modules/storage'
import { signTx } from '../../common/utils/signUtils'

const ERC20 = Contracts.ERC20Token

const gasPrice = '0x2540be400'
const gasLimit = '0x249f0'
const tf = new TokenFormatter({symbol: 'ETH'})
const gasFee = tf.getUnitAmount(toBig(gasPrice).times(gasLimit))

const TodoItem = (props) => {
  const {item = {}, actions, key, index, balance, dispatch, pendingTxs} = props
  const gotoDetail = () => {
    routeActions.gotoPath('/trade/detail')
  }
  const showReceive = (symbol) => {
    dispatch({type: 'layers/showLayer', payload: {id: 'receiveToken', symbol}})
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
        Modal.alert(error.message)
      } else {
        Modal.alert('enable success')
      }
    })

  }

  const gotoTrading = () => {
    const market = config.getTokenSupportedMarket(item.symbol)
    if (market) {
      routeActions.gotoPath(`/dex/placeOrder/${market}`)
      return
    }
    routeActions.gotoPath(`/dex/placeOrder`)
  }

  const loading = () => {
    const allowance = isApproving(pendingTxs, item.symbol)
    const tf = new TokenFormatter({symbol:item.symbol})
    if(allowance){
      return tf.getUnitAmount(allowance).gte(item.selling)
    }
    return false;

  }

  if (item.type === 'allowance') {
    return (
      <div className="row ml0 mr0 pl10 pr10 pt15 pb15 align-items-center zb-b-b no-gutters" onClick={() => {}}>
        <div className="col-auo pr15 color-black text-center">
          <WebIcon className="color-red-500 fs16" type="close-circle"/>
        </div>
        <div className="col text-left">
          <div>
            <div className="fs16 color-black-1">
            {intl.get('todo_list.allowance_not_enough_title',{symbol:item.symbol})}
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div>
            { false && <Switch onChange={enable.bind(this, item)}/> }
            <Button disabled={loading()} inline={true} style={{width: '80px'}} type="primary" size="small" className="" onClick={enable}>
              {loading() ? intl.get('todo_list.status_enabling') : intl.get('todo_list.actions_enable') }
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
            <WebIcon className="color-red-500 fs16" type="exclamation-circle"/>
          </div>
          <div className="col text-left">
            <div>
              <div className="fs16 color-black-1">
                {intl.get('todo_list.balance_not_enough_title',{symbol:item.symbol})}
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
              <Button inline={true} style={{width: '80px'}} type="primary" size="small" className="" onClick={gotoTrading}>
                {intl.get('todo_list.actions_buy')} <WebIcon type="down" /></Button>
              <Button hidden inline={true} type="primary" size="small" className="mr5 mt5"
                      onClick={() => showReceive(item.symbol)}>Receive</Button>
              <Button hidden inline={true} type="primary" size="small" className="mr5 mt5"
                      onClick={gotoTrading}>Buy</Button>
              <Button hidden inline={true} type="ghost" size="small" className="mr5 mt5" href="">View Orders</Button>
            </div>
          </div>
        </div>
      </div>)
    }
}

const mockData = [
  {
    symbol: 'EOS',
    type: 'allowance',
  },
  {
    symbol: 'WETH',
    type: 'allowance',
  },
  {
    symbol: 'LRC',
    type: 'allowance',
  },
  {
    symbol: 'EOS',
    title: 'EOS balance is insufficient for orders',
    type: 'balance',

  },
  {
    symbol: 'WETH',
    title: 'WETH balance is insufficient for orders',
    type: 'balance',
  },
  {
    symbol: 'LRC',
    title: 'LRC balance is insufficient for orders',
    type: 'balance',
  },
]

class ListTodos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }

  componentWillReceiveProps (newProps) {
    const {balance} = newProps
      window.RELAY.account.getAllEstimatedAllocatedAmount({
        owner: storage.wallet.getUnlockedAddress(),
        delegateAddress: config.getDelegateAddress()
      }).then(res => {
        const data = []
        if (!res.error && res.result) {
          const symbols = Object.keys(res.result)
          symbols.forEach((symbol, index) => {
            const value = res.result[symbol]
            const tf = new TokenFormatter({symbol})
            const assets = getBalanceBySymbol({balances: balance.items, symbol: symbol})
            const unitBalance = tf.toPricisionFixed(tf.getUnitAmount(assets.balance))
            const selling = tf.toPricisionFixed(toNumber(tf.getUnitAmount(value)))
            if (toNumber(unitBalance) < toNumber(selling)) {
              data.push({
                symbol: symbol,
                type: 'balance',
                balance: unitBalance,
                selling,
                lack: selling - unitBalance,
                title: `${symbol} balance is insufficient for orders`
              })
            }
            let allowance = assets.allowance
            if (allowance.lt(toBig(value))) {
              data.push({symbol: symbol, type: 'allowance', selling, title: `${symbol} allowance is insufficient for orders`})
            }
          })
        }
        this.setState({
          data: data.sort((a, b) => {return a.type < b.type ? -1 : 1})
        })

      })

  }

  enableAll = async () => {
    const {balance} = this.props
    const {data} = this.state
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
      nonce = nonce + 1
    }, function (error) {
      Modal.alert(error.message)
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
        Modal.alert(error.message)
      } else {
        Modal.alert('enable success')
      }
    })
  }

  render () {
    const {dispatch, balance,txs} = this.props
    const {data} = this.state
    const goBack = () => {
      routeActions.goBack()
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
            rightContent={[
              <WebIcon key="1" type="question-circle-o" className="color-black-1"/>,
            ]}
          >
            { false && <SegmentedControl values={[intl.get('todo_list.todo_list_title'), intl.get('message_list.message_list_title')]} style={{width: '220px', height: '32px'}}/> }
            {
              intl.get('todo_list.todo_list_title')
            }
          </NavBar>
          {data.length > 0 && (storage.wallet.getUnlockedType === 'loopr' || storage.wallet.getUnlockedType === 'mock') &&
          <NoticeBar onClick={this.enableAll} className="text-left t-error s-lg"
                     icon={<WebIcon type="exclamation-circle-o"/>}
                     mode="link" marqueeProps={{loop: true}} action={<span>Enable All<WebIcon type="right"/></span>}>
            One click to enable all tokens ?
          </NoticeBar>}
          <div className="bg-white">
            {
              data.map((item, index) =>
                <TodoItem key={index} item={item} balance={balance} dispatch={dispatch} pendingTxs={txs}/>
              )
            }
          </div>
          {
            !(this.state.loading || balance.loading) && data.length == 0 &&
            <div className="color-black-3 p15 fs12 text-center">
              {intl.get('common.list.no_data')}
            </div>
          }
          {
            (this.state.loading || balance.loading) &&
            <div className="color-black-3 p15 fs12 text-center">
              {intl.get('common.list.loading')}
            </div>
          }

          <div className="pt50"></div>
        </div>
      </LayoutDexHome>
    )
  }
}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
    txs: state.sockets.pendingTx.items
  }
}

export default connect(mapStateToProps)(ListTodos)

