// dane klienta, historia jego subskrypcji, historia jego wizyt
// dodawanie nowej subskrypcji

// server side rendering
import { useRouter } from 'next/router'

export default function ZarzadzanieKlientem() {

    const router = useRouter()
    const { id} = router.query
    return (
        <div>
        <h1>Zarządzanie klientem id: {id} </h1>
        <p>
        dane klienta, historia jego subskrypcji, historia jego wizyt
        dodawanie nowej subskrypcji
        </p>
        </div>
    )
}

export function linkGeneretor(id) {
    return `/pracownik/zarzadzanieKlientem/${id}`
}
