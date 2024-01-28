
import Footer from './Footer';
import '../css/Home.css';


const Home = () => {

    
    return (
        <>
      <div className="home">
      <h2>Dobrodosli na NFT WEBSHOP aplikaciju!</h2>
      <div className='homeDiv'>
      <p>
        NASA APLIKACIJA VAM NUDI:
        <ul>
          <li>Pregled dostupnih NFT-jeva za kupovinu</li>
          <li>Kratak opis o nasoj aplikaciji na stranici About</li>
          <li>Pregled najcesce koriscenih kriptovaluta sa kojima mozete 
            kupiti neki od NFT-jeva na nasoj stranici</li>
        </ul>
      </p>
      </div>   
      </div>
      <Footer />
      </>
    );
  };
  
  export default Home;