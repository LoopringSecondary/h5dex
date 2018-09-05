import React from 'react'
import { Switch, Redirect,Route } from 'dva/router'
import { Toast, Button } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'


const Clear = ()=>{
  const clear = () => {
    localStorage.clear() 
  }
  return (
    <div>
      <Button className="m15" type="primary" onClick={clear}>
        Clear LocalStorage
      </Button>
      <div className="p15 color-black-3">
        
      </div>
    </div>
  )
}
export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path={`/test/clear`} exact component={Clear} />
        </Switch>
      </div>
    )
  }
}
