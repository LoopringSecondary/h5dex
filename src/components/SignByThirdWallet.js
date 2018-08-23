import React from 'react'
import { connect } from 'dva/'

class SignByThirdWallet extends React.Component {

  sign = (wallet) => {
    const {helperOfSign,dispatch} = this.props
    const {data} = helperOfSign
    window.location = `${wallet}://${JSON.stringify(data)}`
    dispatch({
      type: 'layers/hideLayer',
      payload: {
        id: 'helperOfSign'
      }
    })
  }

  render () {
    return (
      <div className="bg-white">
        <div className="divider 1px zb-b-t"></div>
        <div className="p10">
          <div className="fs16 color-black-2 text-center">第三方钱包签名授权</div>
        </div>
        <div className="divider 1px zb-b-t"></div>
        <div className="row pt15 pb15 align-items-center justify-content-center ml0 mr0">
          <div className="col-3">
            <div className="text-center" onClick={() => this.sign('loopr-ios')}>
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
    )
  }

}


function mapStateToProps (state) {

}

export default connect(mapStateToProps)(SignByThirdWallet)
