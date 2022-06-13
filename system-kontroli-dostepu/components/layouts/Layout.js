import Naglowek from "./Naglowek"
import Footer from "./Footer"
import Head from "next/head"
import styles from '../../styles/Home.module.css'

export default function Layout({ children }) {


    return (
        <div class="container">
            <Naglowek />
            <h1>
                layout start
            </h1>
            {children}
            <h1>
                layout end
            </h1>
            <Footer />
        </div>
    )
}