import { Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <Link to='/login-page' className='text-sm font-medium transition-colors'>
            Log in
        </Link>
    );
}

export default LoginButton;