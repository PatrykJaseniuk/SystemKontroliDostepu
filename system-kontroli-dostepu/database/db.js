class BazowaEncja {
    id;
    cells = {};
    powiazaneEncje = {};
}

class BazowaTabela {
    columns = [];
    rows = [];

    getFilteredAndSorted(query = {}) {

        console.log(query);
        //     // get all query params
        // for (let [key, value] of Object.entries(req.body.filter)) {
        //     console.log(key, value);

        // }
        // console.log('sort: ', req.body.sort);

        // //  map column name to column index
        // let query = Object.entries(req.body.filter).map(([key, value]) => {
        //     return {
        //         index: klienci.columns.findIndex(column => column.name === key),
        //         value: value
        //     }
        // }
        // )
        // console.log('maped : ', query);


        // filter by query params
        let filteredRows = this.rows.filter(row => {
            let result = true;
            Object.entries(query.filter).forEach(([nazwaKolumny, filterValue]) => {
                if (!row.cells[nazwaKolumny].toLowerCase().includes(filterValue.toLowerCase())) {
                    result = false;
                    return false;
                }
            }
            );
            return result;
        }
        )


        // let columnName = klienci.columns.findIndex(column => column.name == req.body.sort.column);
        let direction = query.sort.direction;
        let columnName = query.sort.column
        let sortedRows = filteredRows.sort((a, b) => {
            let result = 0;
            if (direction === 'asc') {
                result = a.cells[columnName] > b.cells[columnName] ? 1 : -1;
            }
            else if (direction === 'desc') {
                result = a.cells[columnName] < b.cells[columnName] ? 1 : -1;
            }
            return result;
        }
        )
        return { columns: this.columns, rows: sortedRows }
        // let filteredKlienci = { columns: klienci.columns, rows: sortedRows };
    }
    add(newRekord = {}) {

    }

    getById(id) {

    }
}


class Klient extends BazowaEncja {
    constructor({ imie, nazwisko }) {
        super();
        this.id = 1;
        this.cells.imie = imie;
        this.cells.nazwisko = nazwisko;
    }
}

class Klienci extends BazowaTabela {
    constructor() {
        super();
        this.columns = [{ name: 'imie', type: 'text' }, { name: 'nazwisko', type: 'text' }];
        this.rows.push(new Klient({ imie: 'Jan', nazwisko: 'Kowalski' }));
        this.rows.push(new Klient({ imie: 'Maria', nazwisko: 'Konopnicka' }));
        this.rows.push(new Klient({ imie: 'Bartek', nazwisko: 'Nowak' }));
    }
}

class Wzyta extends BazowaEncja {
    constructor({ data, klient, pracownik }) {
        super();
        this.cells.data = data;
        this.cells.klient = klient;
        this.cells.pracownik = pracownik;
    }
}

class Wizyty extends BazowaTabela {
    constructor() {
        super();
        this.rows.push(new Wzyta({ data: '2020-01-01', klient: 1, pracownik: 1 }));
        this.rows.push(new Wzyta({ data: '2020-01-02', klient: 2, pracownik: 1 }));
        this.rows.push(new Wzyta({ data: '2020-01-03', klient: 3, pracownik: 1 }));
        this.rows.push(new Wzyta({ data: '2020-01-04', klient: 4, pracownik: 1 }));
        this.rows.push(new Wzyta({ data: '2020-01-05', klient: 5, pracownik: 1 }));
    }
}

const dataBase = {
    klienci: new Klienci(),
    wizyty: new Wizyty()

}

export default dataBase;
// export default dataBase;