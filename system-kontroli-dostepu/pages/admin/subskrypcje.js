import Layout from "../../components/layouts/Layout";
import DaneKlienta from "../../components/DaneKlienta";
import Tabela from "../../components/Tabela";

// dane klienta jego historia subskrypcji, historia jego wizyt
export default function subskrypcje() {
    return (
        <Layout>
            <h2>subskrypcje </h2>
            <Tabela
                apiURL={require('../api/klienci').URLgetAll()}
                onNewClick={require('../api/klienci').URLgetAll()}
            />
        </Layout>
    )
}