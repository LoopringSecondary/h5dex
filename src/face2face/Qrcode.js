import React from 'react'
import { Icon } from 'antd'
import QRCode from 'qrcode.react'


export default class OrderQrcode extends React.Component{

  render(){
    const {order} = this.props.orderQrcode
    return(
      <div className="div">
        <div className="p15 color-black-1 fs18 zb-b-b text-center no-gutters">
          <div className="row">
            <div className="col-auto text-left pl20 pr20">
            </div>
            <div className="col"> P2P Order</div>
            <div className="col-auto color-white pl20 pr20">
              <Icon type="left"/>
            </div>
          </div>
        </div>
        <div className="bg-white p15">
          <QRCode value={JSON.stringify(order)} size={240} level='H'/>
        </div>
      </div>
    )
  }
}
