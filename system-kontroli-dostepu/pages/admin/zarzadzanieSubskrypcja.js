import Layout from "../../components/layouts/Layout";
import Tabela from "../../components/Tabela";
import Szczegoly from "../../components/Szczegoly";

// dane klienta jego historia subskrypcji, historia jego wizyt
export default function zarzadzaniePracownikiem() {
    return (
        <Layout>
            <Szczegoly/>
            <h1>
                Tabele powiazane z Subskrypcja
            </h1>

            <h2> Klienci </h2>
            <Tabela
                apiURL={require('../api/klienci').URLgetAll()}
                onNewClick={require('../api/klienci').URLgetAll()}
            />

            <h2> Wizyty </h2>
            <Tabela
                apiURL={require('../api/klienci').URLgetAll()}
                onNewClick={require('../api/klienci').URLgetAll()}
            />        
        </Layout>
    )
}