import React from 'react';
import {Card,Form,Input,Button,message} from 'antd'

const Item = Form.Item;

export default class Test extends React.Component {

  state = {
    address: '',
    language: '',
    currency: ''
  };

  getSettings = () => {

    window.Wallet.getLanguage().then(res => {
      this.setState({language:res.result})
    });
    window.Wallet.getCurrentAccount().then(res => {
      this.setState({address:res.result})
    });
    window.Wallet.getCurrency().then(res => {
      this.setState({currency:res.result})
    })
  };

  signMessage(){
    window.Wallet.signMessage('0x00000').then(res => {
      window.imToken.callAPI('native.alert', JSON.stringify(res))
    })
  }

  signTransaction(){
    window.Wallet.signTx({to:'0xb94065482ad64d4c2b9252358d746b39e820a582',value: '0x0'})
  }
  render() {
    const {address,language,currency}  = this.state;
    return (
      <Card title='imtoken 测试'>

        <Item label='Address:'>
          <Input disabled value={address} />
        </Item>
        <Item label='Language:'>
          <Input disabled value={language} />
        </Item>
        <Item label='Currency:'>
          <Input disabled value={currency} />
        </Item>
        <div><Button type='primary' onClick={this.getSettings}>获取的设置信息</Button></div>
        <div><Button type='primary' onClick={this.signMessage} >签名Message</Button></div>
        <div><Button type='primary' onClick={this.signTransaction} >签名交易</Button></div>
      </Card>
    )
  }
}
