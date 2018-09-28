import React from 'react'
import {Modal} from 'antd-mobile'
import './Popups.less'

const PopupsWrapper = (props)=>{
  const {
    children,id,
    width,mask,closable=true,maskClosable=true,apisOnly=false,wrapClassName="",className="",
    style,
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
      <div style={{...style}}>
        {
          React.Children.map(children, child => {
              return React.cloneElement(child, {...childProps})
          })
        }
      </div>
    </Modal>
  )
}
export default PopupsWrapper
