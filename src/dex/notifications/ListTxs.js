import React from 'react'
import { connect } from 'dva'
import intl from 'react-intl-universal'
import routeActions from 'common/utils/routeActions'
import { Button, Icon, NavBar, NoticeBar, SegmentedControl, Modal, Toast } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'

const TxItem = (props) => {
  return <div>Tx</div>
}

function ListTxs (props) {
  const {dispatch,txs} = props
  const goBack = () => {
    routeActions.goBack()
  }
  let data = []
  
  return (
      <div className="">
        <div className="bg-white">
          {
            data.map((item, index) =>
              <TxItem key={index} item={item} balance={balance} dispatch={dispatch} pendingTxs={txs}
                        gasPrice={toHex(toBig(gasPrice).times(1e9))}/>
            )
          }
        </div>
        {!data || data.length === 0 &&
          <div className="pl10 pt10 pb10 color-black-4 fs12 text-center">
            {intl.get('common.list.no_data')}
          </div>
        }
        <div className="pt50"></div>
      </div>
  )
}

function mapStateToProps (state) {
  return {
    txs: state.sockets.pendingTx.items,
  }
}

export default connect(mapStateToProps)(ListTxs)

