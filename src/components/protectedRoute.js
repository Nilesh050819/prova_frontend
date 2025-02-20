// Packages
import React, { Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  const checkValidToken = () => {
    const token = localStorage.getItem('token');
    
    // Validation logic...
  
  }

  return (
    <Fragment>
      {checkValidToken()
          ? <Route {...rest} render={props => <Component {...rest} {...props} />} />
          : <Navigate to="/login" />
      }
    </Fragment>
  );
}

export default ProtectedRoute