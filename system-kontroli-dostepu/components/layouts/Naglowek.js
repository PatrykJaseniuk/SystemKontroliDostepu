import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'


export default function Naglowek() {
  return (
    <div >
      {/* <!-- bootstrap nav --> */}
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">System kontroli dostępu</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="http://localhost:3000">Home</a>
              <a class="nav-link" href="#">nic</a>
              <a class="nav-link" href="#">nic</a>
              <a> < button type="button"  class="btn btn-primary btn-block mb-1"  onClick={Logout}>Wyloguj</button></a>
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