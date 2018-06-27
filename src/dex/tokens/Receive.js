import React from 'react'
import { Button, Card, Toast } from 'antd-mobile'
import QRCode from 'qrcode.react'
import copy from 'copy-to-clipboard'
import intl from 'react-intl-universal'
import { toBig, toFixed } from 'LoopringJS/common/formatter'
import TokenFormatter, { getBalanceBySymbol } from '../../modules/tokens/TokenFm'
import config from '../../common/config'
import { connect } from 'dva'
import storage from 'modules/storage'

 class Receive extends React.Component {
  state = {
    symbol: null,
    amount: toBig(0),
  };

  componentDidMount(){
    const {receiveToken} = this.props;
    const {symbol} = receiveToken;
    const _this = this;
        if (symbol) {
          const tf = new TokenFormatter({symbol});
          const owner = storage.wallet.getUnlockedAddress();
          window.RELAY.account.getEstimatedAllocatedAllowance({owner,token:symbol.toUpperCase(),delegateAddress:config.getDelegateAddress()}).then(res => {
            if (!res.error) {
              const orderAmount = res.result;
              if (symbol.toUpperCase() === "LRC") {
                window.RELAY.account.getFrozenLrcFee(owner).then(response => {
                  let amount;
                  if (!response.error) {
                    const lrcFee = response.result;
                    amount = tf.getUnitAmount(toBig(orderAmount).plus(toBig(lrcFee)));
                  } else {
                    amount = tf.getUnitAmount(toBig(orderAmount));
                  }
                  _this.setState({symbol, amount});
                })
              } else {
                const amount = tf.getUnitAmount(toBig(orderAmount));
                _this.setState({symbol, amount});
              }
            }
          });
        }

  }

  getNeeded = () => {
    const {symbol,amount} = this.state;
    if(symbol){
      const tf = new TokenFormatter({symbol});
      const {balance} = this.props;
      const asset = getBalanceBySymbol({balances: balance.items, symbol, toUnit: true});
      if(!asset){ return toFixed(toBig(0),8) }
      const unitBalance = tf.getUnitAmount(asset.balance)
      return  toFixed(toBig(amount).minus(unitBalance).isPositive() ? toBig(amount).minus(unitBalance) : toBig(0),8,true);
    }
    return toFixed(toBig(0),8);
  };


  render(){
    const {symbol,amount} =  this.state
    const address = storage.wallet.getUnlockedAddress()
    const copyAddress = ()=>{ copy(address) ?  Toast.info(intl.get('notifications.title.copy_suc')) : Toast.fail(intl.get('notifications.title.copy_suc')) }
    return (
      <Card >
        <Card.Header  title = {<div className="fs18">{intl.get('receive.receive_title',{token:symbol})}</div>}/>
        <Card.Body className="text-center">
          <QRCode value={address} size={240} level='H'/>
          {symbol  && toBig(amount).gt(0) && toBig(this.getNeeded()).gt(0) && <div className='fs3 color-black-1 text-center mt10 mb10'>
            {intl.get('receive.receive_value_tip')} {this.getNeeded()}  {symbol.toUpperCase()}
          </div>}
          <div className="pt10 fs14 text-left" style={{width:'240px',margin:'0 auto',whiteSpace:'wrap',wordBreak:'break-all'}}>
            {address}
            <Button type="primary" size="" className="d-block w-100 mt10" onClick={copyAddress}>{intl.get('common.copy')}</Button>
          </div>
        </Card.Body>
      </Card>
    )
  }
}
function mapStateToProps(state) {

  return {
    balance:state.sockets.balance,
  }
}

export default connect(mapStateToProps)(Receive)
