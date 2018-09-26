import React from 'react'
import {Modal} from 'antd-mobile'
import './Popups.less'

const PopupsWrapper = (props)=>{
  const {
    children,id,
    width,mask,closable=true,maskClosable=true,apisOnly=false,wrapClassName="",className="",
    ...rest
  } = props
  const {[id]:module={}} = props
  const modalProps = {
    className,
    wrapClassName,
    popup:true,
    visible:module.visible,
    onClose:module.hideLayer && module.hideLayer.bind(this),
    animationType:"slide-up",
    zIndex:'1002',
  }
  const childProps = {...rest}
  return (
    <Modal {...modalProps}>
      {
        React.Children.map(children, child => {
            return React.cloneElement(child, {...childProps})
        })
      }
    </Modal>
  )
}
export default PopupsWrapper
