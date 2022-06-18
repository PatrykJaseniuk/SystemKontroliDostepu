import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'


export default function Naglowek() {
  return (
    <div >
      {/* <!-- bootstrap nav --> */}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">System kontroli dostępu</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="http://localhost:3000">Home</a>
              <a className="nav-link" href="#">nic</a>
              <a className="nav-link" href="#">nic</a>
              <a> < button type="button"  className="btn btn-primary btn-block mb-1"  onClick={Logout}>Wyloguj</button></a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}


 function Logout() {  
  sessionStorage.clear();
  window.location.href = 'http://localhost:3000/';
}


// <a href="#" onClick={this.logout()}>Wyloguj</a>