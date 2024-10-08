import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { loginState, setLoginState } = useContext(AuthContext)

    if (!loginState) {
        return (<Navigate to='/signin' />)
    }else{

        return children
    }
}

export default PrivateRoute
