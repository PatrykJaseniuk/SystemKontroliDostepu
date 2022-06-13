// klienci CRUD
// Pracownik może tylko dodawać 
// admin może wszystko
import Link from 'next/link'
import ZarzadzanieKlientem from './zarzadzanieKlientem/[id]'
import Tabela from '../../components/Tabela'
import Layout from '../../components/layouts/Layout'
// import{linkGenerator} from 'pracownik/zarzadzanieKlientem/[id].js'

export default function Klienci() {
    return(

        <Layout>
            <h1>Klienci</h1>

            <Tabela
                apiURL={require('../api/klienci').URLgetAll()}
                onDetailsClick={require('./zarzadzanieKlientem/[id]').linkGeneretor}
                onNewClick={require('../api/klienci').URLgetAll()}
            />
        </Layout>
    )

}

