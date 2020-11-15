import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Calendar from './cmpts/calendar.jsx'
import LoginPage from './cmpts/loginpage.jsx'
import ShotPicker from './cmpts/shot.jsx'
import FormSucess, {FormFail} from './cmpts/formsucess.jsx'


const PrivateRoute = ({component: Component, ...rest}) => {
    var connected = useSelector(state => state.auth.connected)
    var loading = useSelector(state => state.auth.loading)

    if (loading){
      return (<div> loading ....</div>)
    }

    else{
        return (
            <Route {...rest} render={props => (
                connected ?
                    <Component {...props} />
                : <Redirect to="/LoginPage" />
            )} />
        );
    }
};

export default function Routing() {
  return (
    <Router>
        <div>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/LoginPage" component={LoginPage} />
              <PrivateRoute exact path="/Calendar" component={Calendar} />
              <PrivateRoute exact path="/Shot/:id" component={ShotPicker} />
              <PrivateRoute exact path="/formsucess" component={FormSucess} />
              <PrivateRoute exact path="/formfail" component={FormFail} />
          </Switch>
        </div>
    </Router>
  );
}

function Home() {
    const history = useHistory();
    useEffect(() => {
        history.push("/LoginPage");
    }, []);

    return <p>loading ...</p>;
}
