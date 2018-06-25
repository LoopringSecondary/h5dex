import React from 'react';
import { Route, Switch,Redirect} from 'dva/router';
import Face2FacePage from './Face2FacePage'
import Face2FaceModals from './Modals'

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
      </div>
    )
  }else{
    return <Redirect to="/dex" />
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
        {false && <Redirect from="/" to="/dex" />}
      </Switch>
    );
  }
}




