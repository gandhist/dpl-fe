import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';

const Authenticated = (props) => {
    const auth = useSelector(state => state.AuthReducer);
    const history = useHistory();
    
    useEffect(() => {
        if(!auth.check){
            history.push("/login")
        }
    }, [auth.check])

    return props.children;
}

export default Authenticated
