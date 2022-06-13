//lista wizyt z możliwością sortownia i filtrowania 

import Layout from "../../components/layouts/Layout";
import Tabela from "../../components/Tabela";

export default function Wizyty() {
  return (
    <Layout>
      <Tabela
        apiURL={require('../api/klienci').URLgetAll()}
        onDetailsClick={require('./zarzadzanieKlientem/[id]').linkGeneretor}
        onNewClick={require('../api/klienci').URLgetAll()}
      />

    </Layout>
  )
}
