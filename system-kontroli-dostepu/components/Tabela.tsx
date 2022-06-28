// API
import { Argument as query, Result as tab } from '../APICaller&Interface/read';
import { } from '../APICaller&Interface/read';
//Components
import Link from 'next/link';
// hooks
import React, { useEffect } from 'react';


interface Properties {
    getFileteredAndSorted: (query: query) => Promise<tab>;
    onDetailsClick?: (id: number) => string;
    onNewClick?: () => void;
    onRowClick?: (id: number) => void;
}

export default function Tabela(prop: Properties) {
    var [query, setQuery] = React.useState<query>({ filter: {}, sort: { column: 'id', direction: 'none' } });

    // const filterQueryBuilder = (x) => { setFilterQuery({ ...filterQuery, ...x, }) }

    var [tabela, setTabela] = React.useState<tab>(null);
    var [error, setError] = React.useState(null);
    useEffect(() => {
        prop.getFileteredAndSorted(query)
            .then(tabela => { setTabela(tabela); })
            .catch(error => setError(error))
    }, [query])


    if (error) return <div>Failed to load</div>
    if (!tabela) return <div>Loading...</div>
    return (
        <div className="container">
            <div className="card  mb-3" >
                <table className="table table-striped">
                    <Thead
                        columns={tabela.columns}
                        setQuery={setQuery}
                        query={query}
                    />
                    <Tbody
                        rows={tabela.rows}
                        onDetailsClick={prop.onDetailsClick}
                        onRowClick={prop.onRowClick}
                    />
                </table>
            </div>
        </div>
    )
}

interface TheadProps {
    columns: tab['columns'];
    setQuery: (query: query) => void;
    query: query;
}
function Thead(prop: TheadProps) {
    return (
        <thead>
            {/* filters and sorting */}
            <tr>
                {prop.columns.map((column, index) => (
                    <th key={index}>
                        <input
                            type={column.typ}
                            onKeyUp={(e) => {
                                // filterQueryBuilder({ [column.name]: e.target.value })
                                prop.setQuery(
                                    {
                                        ...prop.query,
                                        filter: { ...prop.query.filter, [column.nazwaKolumny]: e.currentTarget.value }
                                    }
                                )
                            }}
                        />
                        {/* button bootstrap */}
                        <SortButton
                            onClick={
                                (direction) => {
                                    prop.setQuery({ ...prop.query, sort: { column: column.nazwaKolumny, direction: direction } });
                                }
                            }
                            direction={
                                (() => {
                                    if (prop.query.sort.column == (column.nazwaKolumny)) {
                                        return prop.query.sort.direction
                                    }
                                })()
                            }
                        />
                    </th>
                ))}
            </tr>
            <tr>
                {/* {JSON.stringify(columns)} */}
                {prop.columns.map((column, index) => (
                    <th key={index}>{column.nazwaKolumny}</th>

                ))}
            </tr>
        </thead>
    )
}

function SortButton({ onClick, direction }) {
    if (direction == undefined) {
        direction = 'none'
    }

    let nextDirection;
    if (direction === 'asc') {
        nextDirection = 'desc'
    }
    else if (direction === 'desc') {
        nextDirection = 'none'
    }
    else {
        nextDirection = 'asc'
    }

    const ico = {
        'asc': <i className="fas fa-sort-alpha-down"></i>,
        'desc': <i className="fas fa-sort-alpha-up"></i>,
        'none': <i className="fas fa-sort"></i>
    }
    return (
        <button className="btn btn-primary" onClick={
            () => {
                onClick(nextDirection)
            }
        }>
            {ico[direction]}
        </button>
    )
}

interface TbodyProps {
    rows: tab['rows'];
    onDetailsClick?: (id: number) => string;
    onRowClick?: (id: number) => void;
}
function Tbody(prop: TbodyProps) {
    return (
        <tbody>
            {prop.rows.map((row, index) => (
                <tr
                    key={index}
                    onClick={() => { prop.onRowClick(row.id) }}
                >
                    {
                        Object.entries(row.komorki).map(([nazwaKolumny, wartosc]) => {
                            return <td key={nazwaKolumny}>{wartosc}</td>
                        })
                    }
                    {(() => {
                        if (prop.onDetailsClick) {
                            return <td><Link href={prop.onDetailsClick(row.id)}><a>Szczegóły</a></Link></td>
                        }
                    }
                    )()
                    }
                </tr>
            ))}
        </tbody>
    )
}