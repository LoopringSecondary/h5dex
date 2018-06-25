import React from 'react'
import { connect } from 'dva'
import { TickersFm, TickerFm } from 'modules/tickers/formatters'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Switch, ListView, Button, Tabs, NavBar, Icon, SegmentedControl, NoticeBar, Modal } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import LayoutDexHome from '../../layout/LayoutDexHome'
import { toBig, toHex } from '../../common/loopringjs/src/common/formatter'
import TokenFormatter, { getBalanceBySymbol } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import Contracts from '../../common/loopringjs/src/ethereum/contracts/Contracts'
import eachLimit from 'async/eachLimit'

const ERC20 = Contracts.ERC20Token

const gasPrice = '0x2540be400'
const gasLimit = '0x249f0'
const tf = new TokenFormatter({symbol: 'ETH'})
const gasFee = tf.getUnitAmount(toBig(gasPrice).times(gasLimit))

const TodoItem = (props) => {
  const {item = {}, actions, key, index, balance, dispatch} = props
  const gotoDetail = () => {
    routeActions.gotoPath('/trade/detail')
  }
  const showReceive = (symbol) => {
    dispatch({type: 'layers/showLayer', payload: {id: 'receiveToken', symbol}})
  }

  const enable = async (item, checked) => {
    if (checked) {
      let nonce  = await window.RELAY.account.getNonce(window.Wallet.address)
      const assets = getBalanceBySymbol({balances:balance.items,symbol:item.symbol})
      const delegateAddress = config.getDelegateAddress()
      const token = config.getTokenBySymbol(item.symbol)
      const amount = toHex(toBig('9223372036854775806').times('1e' + token.digits || 18))
      const txs = []
      if (assets.allowance !== 0) {
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
        window.Wallet.signTx(tx).then(res => {
          if (res.result) {
            window.ETH.sendRawTransaction(res.result).then(resp => {
              if (resp.result) {
                window.RELAY.account.notifyTransactionSubmitted({
                  txHash: resp.result,
                  rawTx: tx,
                  from: window.Wallet.address
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
        Modal.alert(error.message)
      })
    }
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
                1000.00 {item.symbol}
              </div>
              <div className="lh25">
                <span className="d-inline-block" style={{width: '100px'}}>Selling</span>
                5000.00 {item.symbol}
              </div>
              <div className="lh25">
                <span className="d-inline-block" style={{width: '100px'}}>Lack</span>
                4000.00 {item.symbol}
              </div>
              <Button inline={true} type="primary" size="small" className="mr5 mt5"
                      onClick={() => showReceive(item.symbol)}>Receive</Button>
              <Button inline={true} type="primary" size="small" className="mr5 mt5" href="">Buy</Button>
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

const data = [
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
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource,
      isLoading: true,
    }
  }

  componentDidMount () {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    setTimeout(() => {
      // this.rData = genData();
      this.rData = data
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      })
    }, 600)
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({isLoading: true})
    setTimeout(() => {
      this.rData = {...this.rData, ...genData(++pageIndex)}
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      })
    }, 1000)
  }

  enableAll = async () => {
    const {balance} = this.props;
    let nonce =  await window.RELAY.account.getNonce(window.Wallet.address)
    const approveJobs = data.filter(item => item.type === 'allowance')
    const txs = []
    eachLimit(approveJobs, 1, async (item, callback) => {
      const delegateAddress = config.getDelegateAddress()
      const token = config.getTokenBySymbol(item.symbol)
      const amount = toHex(toBig('9223372036854775806').times('1e' + token.digits || 18))
      const assets = getBalanceBySymbol({balances:balance.items,symbol:item.symbol})
      if (assets.allowance !== 0) {
        txs.push({
          gasLimit: gasLimit,
          data: ERC20.encodeInputs('approve', {_spender: delegateAddress, _value: '0x0'}),
          to: token.address,
          gasPrice: gasPrice,
          chainId: config.getChainId(),
          value: '0x0',
          nonce: toHex(nonce)
        })
        nonce = nonce +1
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
      nonce = nonce +1
    }, function (error) {
      Modal.alert(error.message)
    })

    eachLimit(txs, 1, async (tx, callback) => {
      window.Wallet.signTx(tx).then(res => {
        if (res.result) {
          window.ETH.sendRawTransaction(res.result).then(resp => {
            if (resp.result) {
              window.RELAY.account.notifyTransactionSubmitted({
                txHash: resp.result,
                rawTx: tx,
                from: window.Wallet.address
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
      Modal.alert(error.message)
    })
  }

  render () {

    const {dispatch,balance} = this.props
    const goBack = () => {
      routeActions.goBack()
    }
    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      return (
        <TodoItem key={rowID} index={rowID} item={obj} balance = {balance} dispatch={dispatch}/>
      )
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
            <SegmentedControl values={['Todos', 'Messages']} style={{width: '220px', height: '32px'}}/>
          </NavBar>
          <NoticeBar onClick={this.enableAll} className="text-left t-error s-lg"
                     icon={<WebIcon type="exclamation-circle-o"/>}
                     mode="link" marqueeProps={{loop: true}} action={<span>Enable All<WebIcon type="right"/></span>}>
            One click to enable all tokens ?
          </NoticeBar>
          <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderHeader={() => null}
            renderFooter={() => (
              <div className="text-center pt10 pb45 mb10">{this.state.isLoading ? 'Loading...' : 'Loaded'}</div>)}
            renderRow={row}
            className="am-list"
            pageSize={5}
            useBodyScroll={true}
            style={{
              height: '100%',
              overflow: 'auto',
            }}
            onScroll={() => { console.log('scroll') }}
            scrollRenderAheadDistance={300}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
          {
            false &&
            <Tabs
              tabs={
                [
                  {title: <div className="fs20">Todos</div>},
                  {title: <div className="fs20">Messages</div>},
                ]
              }
              swipeable={false}
              tabBarBackgroundColor={'#fff'}
              tabBarActiveTextColor={'#000'}
              tabBarInactiveTextColor={'rgba(0,0,0,0.3)'}
              tabBarTextStyle={{}}
              initialPage={0}
              onChange={(tab, index) => {}}
              onTabClick={(tab, index) => { }}
            >
              <div className="p50">
                Messages TODO
              </div>
            </Tabs>
          }
        </div>
      </LayoutDexHome>
    )
  }
}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
  }
}

export default connect(mapStateToProps)(ListTodos)

