// class BazowaEncja {
//     id: number;
//     cells: {};
//     powiazaneEncje: {};
// }

// interface Query {
//     filter?: {};
//     sort?: {
//         direction: 'asc' | 'desc' | 'none';
//         column: string;
//     };
// }
interface Encja {
    id: number;
    komorki: {}
    powiazaneEncje: {}
}

export interface Tabela {
    columns: { nazwaKolumny: string, typ: TypPola }[];
    rows: Encja[];
}

export interface query {
    filter: {
        // nazwaKolumny: string,
        // szukanyString: string
    };
    sort: {
        direction: 'asc' | 'desc' | 'none';
        column: string;
    }
}

class BazowaTabela implements Tabela {
    columns: { nazwaKolumny: string, typ: TypPola }[];
    rows: Encja[];
    getFilteredAndSorted(query: query): Tabela {
        console.log(query)
        // filter by query params

        let filteredRows: Encja[] = this.rows.filter(row => {
            let resoult = true;
            Object.entries(query.filter).map(([nazwaKolumny, szukanyString]) => {
                if (!row.komorki[nazwaKolumny].toLowerCase().includes(szukanyString.toLowerCase())) {
                    resoult = false;
                    return false;
                }
            }
            );
            return resoult;
        }
        )

        // let columnName = klienci.columns.findIndex(column => column.name == req.body.sort.column);
        let direction = query.sort.direction;
        let columnName = query.sort.column
        let sortedRows = filteredRows.sort((a, b) => {
            let result = 0;
            if (direction === 'asc') {
                result = a.komorki[columnName] > b.komorki[columnName] ? 1 : -1;
            }
            else if (direction === 'desc') {
                result = a.komorki[columnName] < b.komorki[columnName] ? 1 : -1;
            }
            return result;
        }
        )
        return { columns: this.columns, rows: sortedRows };
    }

    getById(id: number): Encja {
        return this.rows.find(row => row.id === id);
    }

    add(newRekord: Encja): boolean {
        newRekord.id = this.rows.length + 1;
        this.rows.push(newRekord);
        return true;
    }
}

type TypPola = 'text' | 'boolean' | 'date' | 'array' | 'object';


export class Klient implements Encja {
    id: number;
    komorki: {
        imie: string;
        nazwisko: string;
    }
    powiazaneEncje: {
        subskrypcje: Subskrypcja[];
    }
    constructor(imie: string, nazwisko: string) {
        this.komorki = {
            imie: imie,
            nazwisko: nazwisko
        }
        this.powiazaneEncje = {
            subskrypcje: []
        }
    }
}

class Klienci extends BazowaTabela {
    columns = [
        { nazwaKolumny: 'imie', typ: 'text' as TypPola, },
        { nazwaKolumny: 'nazwisko', typ: 'text' as TypPola },
    ];
    rows: Klient[] = [];// = [] inicjalizuje tablice
    // constructor() {
    //     super();
    //     this.add(new Klient('Jan', 'Kowalski'));
    //     this.add(new Klient('Zbigniew', 'Nowak'));
    //     this.add(new Klient('Mariusz', 'Pudzianiowski'));
    //     this.add(new Klient('Robert', 'Burnejka'));
    // }
    getById(id: number): Klient {
        return this.rows.find(row => row.id == id);
    }
}

class Subskrypcja implements Encja {
    id: number;
    komorki: {
        dataZakupu: Date;
        dataKOncaWaznosci: Date;
        bazowaIloscWizyt: number;
        iloscWykozystanychWizyt: number;
        cena: number;
        czyJestUzywana: boolean;
    }
    powiazaneEncje: {
        klient: Klient;
        typSubskrypcji: TypSubskrypcji;

    }
    constructor(dataZakupu: Date, dataKOncaWaznosci: Date, bazowaIloscWizyt: number, iloscWykozystanychWizyt: number, cena: number, klient: Klient, typSubskrypcji: TypSubskrypcji) {
        this.komorki = {
            dataZakupu: dataZakupu,
            dataKOncaWaznosci: dataKOncaWaznosci,
            bazowaIloscWizyt: bazowaIloscWizyt,
            iloscWykozystanychWizyt: iloscWykozystanychWizyt,
            cena: cena,
            czyJestUzywana: false
        }
        this.powiazaneEncje = {
            klient: klient,
            typSubskrypcji: typSubskrypcji
        }
        // dodanie referencji do klienta
        klient.powiazaneEncje.subskrypcje.push(this);

        // dodanie referencji do typu subskrypcji
        typSubskrypcji.powiazaneEncje.subskrypcje.push(this);
    }
}

class Subskrypcje extends BazowaTabela {
    columns = [
        { nazwaKolumny: 'dataZakupu', typ: 'date' as TypPola },
        { nazwaKolumny: 'dataKOncaWaznosci', typ: 'date' as TypPola },
        { nazwaKolumny: 'bazowaIloscWizyt', typ: 'number' as TypPola },
        { nazwaKolumny: 'iloscWykozystanychWizyt', typ: 'number' as TypPola },
        { nazwaKolumny: 'cena', typ: 'number' as TypPola },
    ];
    rows: Subskrypcja[] = [];

    getById(id: number): Subskrypcja {
        return this.rows.find(row => row.id == id);
    }
    // constructor() {
    //     super();
    //     this.add(new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient, typSubskrypcji));
    //     this.add(new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient, typSubskrypcji));
    // }
}

class Usluga implements Encja {
    id: number;
    powiazaneEncje: {
        typySubskrypcji: TypSubskrypcji[];
    };
    komorki: {
        nazwa: string;
    };
    constructor(nazwa: string) {
        this.komorki = {
            nazwa: nazwa
        }
        this.powiazaneEncje = {
            typySubskrypcji: []
        }
    }
}

class Uslugi extends BazowaTabela {
    columns = [
        { nazwaKolumny: 'nazwa', typ: 'text' as TypPola },
    ];
    rows: Usluga[] = [];

    getById(id: number): Usluga {
        return this.rows.find(row => row.id == id);
    }
}

class TypSubskrypcji implements Encja {
    id: number;
    komorki: {
        nazwa: string;
        cena: number;
        OkresWaznosci: number;
        IloscWejsci: number;
    }
    powiazaneEncje: {
        subskrypcje: Subskrypcja[];
        usluga: Usluga;
    }
    constructor(nazwa: string, cena: number, upowaznienie: Usluga, okresWaznosci: number, iloscWejsci: number) {
        this.komorki = {
            nazwa: nazwa,
            cena: cena,
            OkresWaznosci: okresWaznosci,
            IloscWejsci: iloscWejsci
        }
        this.powiazaneEncje = {
            subskrypcje: [], //trzeba zainicjalizowac tablice
            usluga: upowaznienie
        }

        upowaznienie.powiazaneEncje.typySubskrypcji.push(this);
    }
}

class TypySubskrypcji extends BazowaTabela {
    columns = [
        { nazwaKolumny: 'nazwa', typ: 'text' as TypPola },
        { nazwaKolumny: 'cena', typ: 'number' as TypPola },
        { nazwaKolumny: 'upowaznienie', typ: 'text' as TypPola },
        { nazwaKolumny: 'OkresWaznosci', typ: 'number' as TypPola },
        { nazwaKolumny: 'IloscWejsci', typ: 'number' as TypPola },
    ];
    rows: TypSubskrypcji[] = [];

    // constructor() {
    //     super();
    //     this.add(new TypSubskrypcji('Siłownia Miesięczny', 100, 'Siłownia', 30, 100));
    //     this.add(new TypSubskrypcji('Fitness Miesięczny', 120, 'Fitness', 30, 100));
    // }
}


class DataBase {
    tabele: {
        klienci: Klienci;
        typySubskrypcji: TypySubskrypcji
        subskrypcje: Subskrypcje
        upowaznienia: Uslugi
    }
    getTabele(tableName: string): BazowaTabela {
        return this.tabele[tableName];
    }

    constructor() {
        this.tabele = {
            klienci: new Klienci(),
            typySubskrypcji: new TypySubskrypcji(),
            subskrypcje: new Subskrypcje(),
            upowaznienia: new Uslugi()
        }
        // tworzenie przyladowych danych
        // klienci
        const klient1 = new Klient('Jan', 'Kowalski');
        const klient2 = new Klient('Zbigniew', 'Nowak');
        const klient3 = new Klient('Mariusz', 'Pudzianiowski');
        const klient4 = new Klient('Robert', 'Burnejka');
        const klient5 = new Klient('Krzysztof', 'Kowalski');
        // upowaznienia
        const upowaznienieSilownia = new Usluga('Siłownia');
        const upowaznienieFitness = new Usluga('Fitness');
        // typy subskrypcji
        const typSubskrypcji1 = new TypSubskrypcji('Siłownia Miesięczny', 100, upowaznienieSilownia, 30, 100);
        const typSubskrypcji2 = new TypSubskrypcji('Fitness Miesięczny', 120, upowaznienieFitness, 30, 100);
        // subskrypcje
        const subskrypcja1 = new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient1, typSubskrypcji1);
        const subskrypcja2 = new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient2, typSubskrypcji1);
        const subskrypcja3 = new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient3, typSubskrypcji2);
        const subskrypcja4 = new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient4, typSubskrypcji2);
        const subskrypcja5 = new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient5, typSubskrypcji2);
        const subskrypcja6 = new Subskrypcja(new Date(2020, 1, 1), new Date(2020, 1, 1), 10, 0, 100, klient1, typSubskrypcji2);
        // dodawanie do tabel
        this.tabele.klienci.add(klient1);
        this.tabele.klienci.add(klient2);
        this.tabele.klienci.add(klient3);
        this.tabele.klienci.add(klient4);
        this.tabele.klienci.add(klient5);
        this.tabele.typySubskrypcji.add(typSubskrypcji1);
        this.tabele.typySubskrypcji.add(typSubskrypcji2);
        this.tabele.subskrypcje.add(subskrypcja1);
        this.tabele.subskrypcje.add(subskrypcja2);
        this.tabele.subskrypcje.add(subskrypcja3);
        this.tabele.subskrypcje.add(subskrypcja4);
        this.tabele.subskrypcje.add(subskrypcja5);
        this.tabele.subskrypcje.add(subskrypcja6);
        this.tabele.upowaznienia.add(upowaznienieSilownia);
        this.tabele.upowaznienia.add(upowaznienieFitness);
    }
}

 const dataBase = new DataBase();

 export default dataBase;
// export const dataBase = {
//     tabele: {
//         klienci: new Klienci(),
//         typySubskrypcji: new TypySubskrypcji(),
//         subskrypcje: new Subskrypcje()
//     },
//     getTable: function (tableName: string): BazowaTabela {
//         return this.tabele[tableName];
//     }
// }