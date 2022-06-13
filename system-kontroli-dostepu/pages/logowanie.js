// panel logowania dla wszystkich użytkowników

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logowanie from '../components/Logowanie'
import Layout from '../components/layouts/Layout'

export default function logowanie() {
  return (
    
    <Layout>      
      <Logowanie/> 
    </Layout>
  )
}