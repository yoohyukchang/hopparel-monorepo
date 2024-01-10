import { Link } from 'react-router-dom';

const MyDesignButton = () => {
    return (
        <Link to="/my-designs" className='text-sm font-medium transition-colors'>
            My Designs
        </Link>
    );
}

export default MyDesignButton;