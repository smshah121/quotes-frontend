import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenValue } from '../features/auth/auth.selector';

const Navbar = () => {
 const token = useSelector(selectTokenValue);
 const dispatch = useDispatch();

 const handleLogout = () => {
   dispatch(logout());
 };

 if (!token) return null;

 return (
   <nav>|
     <Link to="/quotes"> Quotes</Link> |
     <button onClick={handleLogout}>Logout</button>
   </nav>
 );
};
export default Navbar;