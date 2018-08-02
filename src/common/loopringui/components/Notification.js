import React, { PropTypes } from 'react';
import {Button,notification} from 'antd';
import { Toast } from 'antd-mobile';
import Alert from './Alert';
import './Notification.less';

export default {
  open:(config)=>{
    let className = 'loopring-notify'
    let {message:title,description,type,theme,actions,size,...rest} = config
    let alertProps = {
      title,description,type,theme,actions,size,
    }
    if(type==='error'){
      rest.duration = 9
    }
    switch(type) {
      case 'error':
        Toast.fail(description, 3, null, false)
        break;
      case 'success':
        Toast.success(description, 3, null, false)
        break;
      default:
        Toast.info(description, 3, null, false)
        break;
    }
    // notification.success({
    //   ...rest,
    //   className,
    //   description:null,
    //   icon:null,
    //   message:<Alert {...alertProps} />
    // })
  }
}
