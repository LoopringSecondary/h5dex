import React from 'react'
import {FillFm} from 'modules/fills/formatters'
import {Spin} from 'antd'
import intl from 'react-intl-universal'

export default class Fills extends React.Component {
  state = {
    pageSize: 50,
    pageIndex: 1,
    total: 0,
    loading: true,
    fills: []
  };

  componentDidMount() {
    const {pageSize, pageIndex} = this.state;
    const {order} = this.props;
    let hash = order.originalOrder.hash
    // hash = '0xd8c1aa755d35c9570b58c227ab66d72a38d4c291fc7ca5693aff5a8fdc523836'
    window.RELAY.ring.getFills({pageSize, pageIndex, orderHash: hash}).then(res => {
      if (!res.error) {
        this.setState({fills: res.result.data, loading: false, total: res.result.total})
      }else{
        this.setState({loading: false})
      }
    })
  }

   onChange = (page, pageSize) => {
     const {order} = this.props;
    this.setState({
      loading: true,
      pageIndex: page,
      pageSize: pageSize
    }, () =>   window.RELAY.ring.getFills({pageIndex: page, pageSize: pageSize, orderHash: order.originalOrder.hash}).then(res => {
      if (!res.error) {
        this.setState({fills: res.result.data, loading: false, total: res.result.total})
      }else{
        this.setState({fills: [], loading: false, total: 0})
      }
    }));
  };

  render(){
    const {fills,loading,pageSize,pageIndex,total} = this.state;
    return(
      <div className="" style={{minHeight:'50vh'}}>
        <Spin spinning={loading} >
          <table className="w-100 fs13">
            <thead hidden>
              <tr className="">
                <th hidden className="zb-b-b text-left pl10 pr5 pt10 pb10 font-weight-normal color-black-3 ">{intl.get('common.side')}</th>
                <th className="zb-b-b text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">
                  {intl.get('common.fill')}
                </th>
                <th hidden className="zb-b-b text-right pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">{intl.get('common.lrcfee')}</th>
                <th className="zb-b-b text-right pl5 pr5 pt10 pb10 font-weight-normal color-black-3 ">{intl.get('common.time')}</th>
              </tr>
            </thead>
            <tbody>
                {
                  fills.map((item,index)=>{
                    const fillFm = new FillFm(item)
                    return (
                      <tr key={index}>
                        <td hidden className="pl10 pr5 pt10 pb10 zb-b-b text-left align-middle">
                          { item.side === 'buy' && <div className="color-success">{intl.get('common.buy')}</div> }
                          { item.side === 'sell' && <div className="color-error">{intl.get('common.sell')}</div> }
                        </td>
                        <td className="pl10 pr5 pt10 pb10 zb-b-b color-black-1 text-left align-middle ">
                         <div><span className="color-black-2 d-inline-block" style={{width:'60px'}}>{intl.get('common.buy')}</span> {fillFm.getBuy()}</div>
                         <div><span className="color-black-2 d-inline-block" style={{width:'60px'}}>{intl.get('common.sell')}</span> {fillFm.getSell()}</div>
                         <div><span className="color-black-2 d-inline-block" style={{width:'60px'}}>{intl.get('common.price')}</span> {fillFm.getPrice()} </div>
                         <div><span className="color-black-2 d-inline-block" style={{width:'60px'}}>{intl.get('order.LRCFee')}</span> {fillFm.getLRCFee()}</div>
                        </td>
                        <td hidden className="pl5 pr5 pt10 pb10 zb-b-b text-right color-black-2 align-middle text-nowrap">
                          {fillFm.getLRCFee()}
                        </td>
                        <td className="pl5 pr10 pt10 pb10 zb-b-b text-right color-black-2 align-middle text-nowrap">
                          {fillFm.getCreateTime()}
                        </td>
                      </tr>
                    )
                  })
                }
                {
                  !loading && fills.length == 0 &&
                  <tr>
                    <td className="zb-b-b pt10 pb10 pl5 pr5 text-center color-black-4 fs13" colSpan='100'>
                      {intl.get("common.list.no_data")}
                    </td>
                  </tr>
                }
            </tbody>
          </table>
        </Spin>
      </div>
    )
  }
}
