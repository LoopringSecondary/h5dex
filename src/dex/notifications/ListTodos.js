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

  const enable = async (item, checked) => {
    if (checked) {
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
  }

  const gotoTrading = () => {
    const market = config.getTokenSupportedMarket(item.symbol);
    if(market){
     routeActions.gotoPath(`/dex/placeOrder/${market}`)
      return;
    }
    routeActions.gotoPath(`/dex/placeOrder`)
  }

  return (
    <div className="row ml0 mr0 p15 align-items-center zb-b-b no-gutters" onClick={() => {}}>
      <div className="col-auo pr15 color-black text-center">
        {false && <i className={`icon-${item.symbol} fs24 d-block`} style={{
          width: '32px',
          height: '32px',
          lineHeight: '32px',
          border: '1px solid #000',
          borderRadius: '50em'
        }}></i>}
        {
          item.type === 'allowance' && <WebIcon className="color-red-500 fs16" type="close-circle"/>
        }
        {
          item.type === 'balance' && <WebIcon className="color-red-500 fs16" type="exclamation-circle"/>
        }
      </div>
      <div className="col text-left">
        <div>
          <div className="fs16 color-black-2">
            {
              item.type === 'allowance' && `${item.symbol} is disabled for orders`
            }
            {
              item.type === 'balance' && `${item.symbol} balance is insufficient`
            }
          </div>
          {
            item.type === 'balance' &&
            <div className="fs14 color-black-3">
              <div className="lh25">
                <span className="d-inline-block" style={{width: '100px'}}>Balance</span>
                {item.balance} {item.symbol}
              </div>
              <div className="lh25">
                <span className="d-inline-block" style={{width: '100px'}}>Selling</span>
                {item.selling} {item.symbol}
              </div>
              <div className="lh25">
                <span className="d-inline-block" style={{width: '100px'}}>Lack</span>
                {item.lack} {item.symbol}
              </div>
              <Button inline={true} type="primary" size="small" className="mr5 mt5"
                      onClick={() => showReceive(item.symbol)}>Receive</Button>
              <Button inline={true} type="primary" size="small" className="mr5 mt5" onClick={gotoTrading}>Buy</Button>
              <Button inline={true} type="ghost" size="small" className="mr5 mt5" href="">View Orders</Button>
            </div>
          }
        </div>
      </div>
      <div className="col-auto">
        {
          item.type === 'allowance' &&
          <div>
            <Switch onChange={enable.bind(this, item)}/>
          </div>
        }
        {
          false && item.type === 'balance' &&
          <div>
            <a className="">Detail</a>
          </div>
        }

      </div>
    </div>
  )
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
const NUM_ROWS = 15
let pageIndex = 0

function genData (pIndex = 0) {
  const dataBlob = {}
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i
    dataBlob[`${ii}`] = `row - ${ii}`
  }
  return dataBlob
}

class ListTodos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }

  componentDidMount () {
    const {balance, txs} = this.props
    Toast.loading('Loading...', 0, () => {
      Toast.success('Load complete !!!')
    })
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
          const unitBalance =  toNumber(tf.getUnitAmount(assets.balance));
           const selling= toNumber(tf.getUnitAmount(value));
          if (assets.balance.lt(toBig(value))) {
            data.push({
              symbol: symbol,
              type: 'balance',
              balance:unitBalance,
              selling,
              lack:selling - unitBalance,
              title: `${symbol} balance is insufficient for orders`
            })
          }
          let allowance = assets.allowance
          if (isApproving(txs, symbol)) {
            allowance = isApproving(txs, symbol)
          }
          if (allowance.lt(toBig(value))) {
            data.push({symbol: symbol, type: 'allowance', title: `${symbol} allowance is insufficient for orders`})
          }
        })
      }
      this.setState({
        data
      })
      Toast.hide()
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

    const {dispatch, balance} = this.props
    const {data} = this.state
    const goBack = () => {
      routeActions.goBack()
    }
    return (
      <LayoutDexHome {...this.props}>
        <div className="tabs-no-border no-underline" style={{height: '100%'}}>
          <NavBar
            className="w-100 zb-b-b"
            mode="light"
            icon={null && <Icon type="left"/>}
            onLeftClick={() => routeActions.goBack()}
            leftContent={null && [
              <WebIcon key="1" type="left" className="color-black-1" onClick={goBack}/>,
            ]}
            rightContent={null && [
              <WebIcon key="1" type="search" className="color-black-1"/>,
            ]}
          >
            {
              false &&
              <SegmentedControl values={['Todos', 'Messages']} style={{width: '220px', height: '32px'}}/>
            }
            Todos
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
                <TodoItem key={index} item={item} balance={balance} dispatch={dispatch}/>
              )
            }
          </div>

          {
            data.length == 0 &&
            <div className="color-black-3 p15 fs12 text-center">
              {intl.get('common.list.no_data')}
            </div>
          }
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

