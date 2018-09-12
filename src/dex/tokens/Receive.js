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
import { toNumber } from 'LoopringJS/common/formatter'

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
      const {balance} = this.props;
      const asset = getBalanceBySymbol({balances: balance.items, symbol, toUnit: true});
      if(!asset){ return toFixed(toBig(0),8) }
      const unitBalance = asset.balance
      return  toFixed(toBig(amount).minus(unitBalance).isPositive() ? toBig(amount).minus(unitBalance) : toBig(0),8,true);
    }
    return toFixed(toBig(0),8);
  };


  render(){
    const {symbol,amount} =  this.state
    const address = storage.wallet.getUnlockedAddress()
    const copyAddress = ()=>{ copy(address) ?  Toast.info(intl.get('notifications.title.copy_suc')) : Toast.fail(intl.get('notifications.title.copy_suc'), 3, null, false) }
    return (
      <Card>
        <div className="text-center">
          <span className="card-header-icon"><i className="icon-arrow-down"></i></span>
        </div>
        <div className="text-center">
         <div className="recommended-tip fs12">{symbol  && toBig(amount).gt(0) && toBig(this.getNeeded()).gt(0) && <div className='color-black-1 text-center'>
            {intl.get('receive.receive_value_tip')} {this.getNeeded()}  {symbol.toUpperCase()}
          </div>}</div>
          <QRCode value={address} size={200} level='H'/>

          <div className="pt10 fs12 text-center" style={{width:'240px',margin:'0 auto',whiteSpace:'wrap',wordBreak:'break-all'}}>
            {address}
            <Button type="primary" size="" className="d-block w-100 mt10 mb20" onClick={copyAddress}>{intl.get('common.copy')}</Button>

          </div>
         </div>
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
