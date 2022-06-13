import Layout from "../../components/layouts/Layout";
import DaneKlienta from "../../components/DaneKlienta";
import Tabela from "../../components/Tabela";

// dane klienta jego historia subskrypcji, historia jego wizyt
export default function zarzadzaniePracownikiem() {
    return (
        <Layout>
            <h2>Dane Pracownika </h2>
            <DanePracownika />

            <h1>
                Tabele powiazane z pracownikiem
            </h1>

            <h2> sprzedaż subskrypcji </h2>
            <Tabela
                apiURL={require('../api/klienci').URLgetAll()}
                onNewClick={require('../api/klienci').URLgetAll()}
            />

            <h2> zarejestrowane wizyty </h2>
            <Tabela
                apiURL={require('../api/klienci').URLgetAll()}
                onNewClick={require('../api/klienci').URLgetAll()}
            />        
        </Layout>
    )
}