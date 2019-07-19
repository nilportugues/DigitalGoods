import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import avatar from '../static/logo.png'
import Link from "next/link";
function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src={avatar} alt="" width="112" height="28"/>
        </a>
        <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" className="navbar-menu">
        <div className="navbar-center">
          <Link  href="/signup">
            <div className="navbar-item" href="/">
              Sell Your Product
            </div>
          </Link>
          <Link  href="/signup">
            <div className="navbar-item">
              Company
            </div>
          </Link>

          <Link  href="/signup">
            <div className="navbar-item" href="/">
              Pricing
            </div>
          </Link>

          <Link  href="/signup">
            <div className="navbar-item" href="/">
              Support
            </div>
          </Link>
          
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                
                <Link href="/signin">
                <button className="button is-outline sign-in">SIGN IN</button>
                </Link>
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
