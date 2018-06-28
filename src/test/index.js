import React from 'react';
import {Card,Form,Input,Button} from 'antd'
import { List, TextareaItem } from 'antd-mobile';
import {Modal} from 'antd-mobile'

const Item = Form.Item;

export default class Test extends React.Component {

  state = {
    address: '',
    language: '',
    currency: '',
    message:'',
    lrcfee:''
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

    window.Wallet.getLrcFee().then(res => {
      this.setState({lrcfee:res.result})
    })
  };

  signMessage = () => {

    window.Wallet.signMessage('0x7acbff6790c56d332cc002ea6e0c3f73fce8f927947709986ab993b234c78416').then(res => {
      this.setState({message:JSON.stringify(res.result)})
    })
  }

  signTransaction(){
    window.Wallet.signTx({to:'0xb94065482ad64d4c2b9252358d746b39e820a582',value: '0x0',chainId:1,nonce:0,gasPrice:'0x2540be400',gasLimit:'0x5208'}).then(res=>{
      Modal.alert(res.result)
    })
  }
  render() {
    const {address,language,currency,message,lrcfee}  = this.state;
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
        <Item label='lrcfee:'>
          <Input disabled value={lrcfee} />
        </Item>
        <Item label='Message:'>
          <TextareaItem  value={message} rows={5}/>
        </Item>
        <div><Button type='primary' onClick={this.getSettings}>获取的设置信息</Button></div>
        <div><Button type='primary' onClick={this.signMessage} >签名Message</Button></div>
        <div><Button type='primary' onClick={this.signTransaction} >签名交易</Button></div>
      </Card>
    )
  }
}
