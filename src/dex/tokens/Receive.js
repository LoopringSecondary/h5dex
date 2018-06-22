import React from 'react';
import { Input,Card} from 'antd';
import { Button } from 'antd-mobile';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import Notification from '../../common/loopringui/components/Notification'
import intl from 'react-intl-universal';
import {toBig,toFixed} from "LoopringJS/common/formatter";
import {getBalanceBySymbol} from "../../modules/tokens/TokenFm";
import TokenFormatter from '../../modules/tokens/TokenFm';
import config from '../../common/config'
import {connect} from 'dva'
import routeActions from 'common/utils/routeActions'

export default class Receive extends React.Component {
  state = {
    symbol: null,
    amount: toBig(0)
  };

  render(){
    const address = '0xeba7136a36da0f5e16c6bdbc739c716bb5b65a00'
    const copyAddress = ()=>{}
    return (
      <Card title={<div className="fs18">{intl.get('receive.receive_title')}</div>}>
        <div className="text-center">
          <QRCode value={address} size={240} level='H'/>
          <div className="pt10 fs14 text-left" style={{width:'240px',margin:'0 auto',whiteSpace:'wrap',wordBreak:'break-all'}}>
            {address}
            <Button type="primary" size="" className="d-block w-100 mt10" onClick={copyAddress}>{intl.get('common.copy')}</Button>
          </div>

        </div>
      </Card>
    )
  }
}

