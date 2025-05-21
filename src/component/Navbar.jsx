import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenValue, selectUserId } from '../features/auth/auth.selector'; // Import selectUserId

const Navbar = () => {
  const token = useSelector(selectTokenValue);
  const userId = useSelector(selectUserId); // Get userId from Redux
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!token) return null;

  return (
    <nav>
      <Link to={`/quotes/${userId}`}> Quotes</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
export default Navbar;