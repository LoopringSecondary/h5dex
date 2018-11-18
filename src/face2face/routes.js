import React from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import Face2FacePage from './Face2FacePage'
import Face2FaceModals from './Modals'
import CommonModals from '../components/Modals'
import Tokens from '../dex/tokens'

const Logged = ()=>{
  // const isLogged =  !!window.WALLET && !!window.WALLET.address
  const isLogged = true
  if(isLogged){
    return (
      <div>
        <Switch>
          <Route path={`/face2face`} exact component={Face2FacePage} />
        </Switch>
        <Face2FaceModals />
        <CommonModals/>
        <Tokens.Modals />
      </div>
    )
  }else{
    return <Redirect to="/auth" />
  }
}

export default class Routes extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {match,location} = this.props;
    // const {url} = match;
    const url = ""
    return (
      <Switch>
        <Route path={`/face2face`}  component={Logged} />
      </Switch>
    );
  }
}




