// Rejstrowanie wejscia do uslugi,czyli:
//1 wyszukanie klienta po id, imieniu, czy czymśtam jeszcze
// 2 wybranie usługi z której klient chce skorzystać, oczywiście jeżeli ma dostęp do niej. Tutaj powinno być przejście do `zarzadzenieKlientem` gdyby trzeba było np przedłużyć subskrypcję

import Layout from "../../components/layouts/Layout";
import RejestracjaWejsciaWyjscia from "../../components/RejestracjaWejsciaWyjscia";
import KlienciWUslugach from "../../components/klienciWUslugach";


// Lista klientów korzystających z usług, czyli dla każdej usługi tabela a w niej osoby aktualnie z niej korzystające.

// Wypuszczanie klienta z usługi np podając id klienta, albo klikając go w tabeli z klientami korzystającymi z danej usługi.

export default function ObslugaWejscia() {
    return (
        <Layout>
            <RejestracjaWejsciaWyjscia/>
            <KlienciWUslugach/>
        </Layout>
    )
}
