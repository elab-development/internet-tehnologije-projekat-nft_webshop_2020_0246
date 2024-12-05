import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { useNavigate } from 'react-router-dom';
import { LiaImages } from "react-icons/lia";
import { IoHome } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";

function NavBar({ loggedInUser, handleLogout, search }) {

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

    return (
      <div>
        <nav className="nav">
          <div className="nav__title">
            <h1>NFT WEBSHOP</h1>
          </div>
          <ul className="nav__list">
            {loggedInUser ? (
              <>
                <li className="nav__item">
                  <Link to='/home'>Home <IoHome/></Link>
                </li>
                <li className="nav__item">
                  <Link to='/nfts'> NFTs <LiaImages/></Link>
                </li>
                <li className="nav__item">
                  <Link to='/kriptovalute'>Kriptovalute <FaRegMoneyBillAlt />  </Link>
                </li>
                <li className="nav__item">
                  {loggedInUser}{' '}
                  <button className="logout-button" onClick={handleLogoutClick}>
                    Logout
                </button>
                </li>
                <li className="nav__item">
                <input type="text" id="criteria" placeholder="search" 
                        name="search" onChange={()=>search(document.getElementById('criteria').value)}/>
                </li>
              </>
            ) : (
              <li className="nav__item">
                <Link to="/">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;