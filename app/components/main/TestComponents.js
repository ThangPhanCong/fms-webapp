import React from 'react';
import { Link} from 'react-router-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FmsButtonTest from '../FmsButton/FmsButtonTest'
import FmsLoadingTest from '../FmsLoading/FmsLoading'
import FmsToolTipTest from '../FmsToolTip/FmsToolTip'

const TestComponent = ({match}) => (
  <div>
    <ul>
      <li>
         <Link to={`${match.url}/fmsbutton`}  >
           FmsButton
         </Link>
      </li>
      <li>
         <Link to={`${match.url}/fmsloading`} >
           FmsLoading
         </Link>
      </li>
    </ul>

    <Route path={`${match.url}/fmsbutton`} component={FmsButtonTest} />
    <Route path={`${match.url}/fmsloading`} component={FmsLoadingTest} />
  </div>
)

export default TestComponent
