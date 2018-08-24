import React from 'react'
import { Button, NavBar, Modal,List,InputItem,Toast } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import { connect } from 'dva'
import storage from 'modules/storage'
import uuidv4 from 'uuid/v4'
import intl from 'react-intl-universal'



class Auth extends React.Component {


  state={
    address:''
  }

  componentWillReceiveProps(newProps){
    const {uuid,item} = newProps
    if(uuid === item.uuid){
      Modal.alert(intl.get('notifications.title.log_in_suc'))
      storage.wallet.storeUnlockedAddress('address', item.owner)
      window.RELAY.account.register(item.address)
       routeActions.gotoPath('/dex')
      this.props.dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid:""}}
      })
      this.props.dispatch({type: 'sockets/unlocked'});
    }
  }

  authByThirdPartyWallet = (wallet) => {
    const {dispatch} = this.props
    const uuid = uuidv4().substring(0, 8)
    dispatch({
      type: 'sockets/extraChange',
      payload: {id: 'addressUnlock', extra: {uuid}}
    })
    dispatch({type:'sockets/fetch',payload:{id:'addressUnlock'}});
    const data = {type: 'UUID', value: uuid}
    window.location = `${wallet}://${JSON.stringify(data)}`
  }

  authByAddress = () => {
    const {address} = this.state;
    const re = new RegExp("^0x[0-9a-fA-F]{40}$")
    if(address && re.test(address)){
      storage.wallet.storeUnlockedAddress('address', address)
      window.RELAY.account.register(address)
      routeActions.gotoPath('/dex')
      this.props.dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid:""}}
      })
      this.props.dispatch({type: 'sockets/unlocked'});
    }else{
      Toast.fail(intl.get("notifications.title.invalid_address_tip"))
    }
  }

  amountChange = (value) => {
    this.setState({address:value})
  }

  render () {
    const {uuid,item} = this.props
    const {address} = this.state;
    return (
      <div>
        <NavBar
          className=""
          mode="light"
        >
          <div className="color-black-1">
            {intl.get('signIn.title')}
          </div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
        <div className="p15">
          <List className="selectable">
            <InputItem
              onChange={this.amountChange}
              moneyKeyboardAlign="left"
              value={address}
              className=" h-default"
            >
              {intl.get('signIn.pre')}
            </InputItem>
          </List>
          <Button onClick={this.authByAddress} className="m10" type="primary"> {intl.get('signIn.title')}</Button>
        </div>
        <div className="bg-white" style={{position: 'absolute', left: '0', bottom: '0', width: '100%'}}>
          <div className="divider 1px zb-b-t"></div>
          <div className="p10">
            <div className="fs16 color-black-2 text-center">{intl.get('signIn.tp_title')}</div>
          </div>
          <div className="divider 1px zb-b-t"></div>
          <div className="row pt15 pb15 align-items-center justify-content-center ml0 mr0">
            <div className="col-3">
              <div className="text-center" onClick={() => this.authByThirdPartyWallet('loopr-ios')}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/loopr.png')} alt=""/>
                </div>
                <div className="pt5 fs14  color-black-3">Loopr</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={() => {}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/imtoken.png')}
                       alt=""/>
                </div>
                <div className="pt5 fs14 color-black-3">Imtoken</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={() => {}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/imtoken.png')}
                       alt=""/>
                </div>
                <div className="pt5 fs14 color-black-3">火币钱包</div>
              </div>
            </div>
            <div className="col-3">
              <div className="text-center" onClick={() => {}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '40px',
                  height: '40px',
                }}>
                  <img style={{borderRadius: '50em'}} width="100%" src={require('../assets/images/imtoken.png')}
                       alt=""/>
                </div>
                <div className="pt5 fs14 color-black-3">Kcash</div>
              </div>
            </div>

          </div>
          <div className="divider 1px zb-b-t"></div>
        </div>
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    item: state.sockets.addressUnlock.item,
    uuid:state.sockets.addressUnlock.extra.uuid
  }
}

export default connect(mapStateToProps)(Auth)
