// import
import useSWR from 'swr'
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css'



export default function Tabela({ getData, onDetailsClick, onNewClick }) {

    // const fetcher = (url) => fetch(url).then(r => r.json()).then(data => {// tutaj mozna modyfikowac uzyskane dane przd wyswietlaniem
        // data.columns.push('Szczegóły') // add column with link to details.
        // return data;
    // })
    var [query, setQuery] = React.useState({});
    const queryBuilder = (x) => { setQuery({...query,...x,}) }
    // const { data, error,mutate } = useSWR(apiURLGenerator(query), fetcher);
    var [data, setData] = React.useState(null);
    var [error, setError] = React.useState(null);
    useEffect(() => {
        getData(query)
        .then(data =>{setData(data); console.log(data)})
        .catch(error => setError(error))
    }, [query])


    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    // console.log(data)
    return (
        <div className={styles.container}>
            <div class="card  mb-3" >
                <table className="table table-striped">
                    <Thead
                        columns={data.columns}
                        queryBuilder={queryBuilder}
                    />
                    <Tbody
                        rows={data.rows}
                        onDetailsClick={onDetailsClick}
                    />
                </table>
            </div>
        </div>
    )
}

function Thead({ columns, queryBuilder }) {
    return (
        <thead>
            {/* filters */}
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>
                        <input
                            type={column.type}
                            onKeyUp={(e) => {
                                queryBuilder({ [column.name]: e.target.value })
                            }}
                        />
                    </th>
                ))}
            </tr>
            <tr>
                {/* {JSON.stringify(columns)} */}
                {columns.map((column, index) => (
                    <th key={index}>{column.name}</th>
                ))}
            </tr>
        </thead>
    )
}

function Tbody({ rows, onDetailsClick }) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.cells.map((cell, index) => (
                        <td key={index}>{cell}</td>
                    ))}
                    {(() => {
                        if (onDetailsClick) {
                            return <td><Link href={onDetailsClick(row.id)}><a>Szczegóły</a></Link></td>
                        }
                    }
                    )()
                    }
                </tr>
            ))}
        </tbody>
    )
}