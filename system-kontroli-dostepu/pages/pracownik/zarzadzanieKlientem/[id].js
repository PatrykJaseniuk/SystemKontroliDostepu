// dane klienta, historia jego subskrypcji, historia jego wizyt
// dodawanie nowej subskrypcji

// server side rendering
import { useRouter } from 'next/router'
import Tabela from '../../../components/Tabela'
import Layout from '../../../components/layouts/Layout'
import DaneKlienta from '../../../components/DaneKlienta'

export default function ZarzadzanieKlientem() {

    const router = useRouter()
    const { id } = router.query
    return (
        <Layout>
            <h2>Dane Klienta</h2>
            <DaneKlienta/>
            <h2>subskrypcje </h2>
            <Tabela
                apiURL={require('../../api/klienci').URLgetAll()}
                onDetailsClick={linkGeneretor}
                onNewClick={require('../../api/klienci').URLgetAll()}
            />
            <h2>Wizyty</h2>
            <Tabela
                apiURL={require('../../api/klienci').URLgetAll()}
                onDetailsClick={linkGeneretor}
                onNewClick={require('../../api/klienci').URLgetAll()}
            />

        </Layout>
    )
}

export function linkGeneretor(id) {
    return `/pracownik/zarzadzanieKlientem/${id}`
}
