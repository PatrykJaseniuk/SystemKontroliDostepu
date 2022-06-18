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
    var [filterQuery, setFilterQuery] = React.useState({});
    var [sortQuery, setSortQuery] = React.useState({});
    const filterQueryBuilder = (x) => { setFilterQuery({ ...filterQuery, ...x, }) }
    // const { data, error,mutate } = useSWR(apiURLGenerator(query), fetcher);
    var [data, setData] = React.useState(null);
    var [error, setError] = React.useState(null);
    useEffect(() => {
        getData({ filter: filterQuery, sort: sortQuery })
            .then(data => { setData(data); console.log(data) })
            .catch(error => setError(error))
    }, [filterQuery, sortQuery])


    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    // console.log(data)
    return (
        <div className={styles.container}>
            <div class="card  mb-3" >
                <table className="table table-striped">
                    <Thead
                        columns={data.columns}
                        filterQueryBuilder={filterQueryBuilder}
                        setSortQuery={setSortQuery}
                        sortQuery={sortQuery}
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

function Thead({ columns, filterQueryBuilder, setSortQuery, sortQuery }) {
    return (
        <thead>
            {/* filters and sorting */}
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>
                        <input
                            type={column.type}
                            onKeyUp={(e) => {
                                filterQueryBuilder({ [column.name]: e.target.value })
                            }}
                        />
                        {/* button bootstrap */}
                        <SortButton
                            onClick={
                                (direction) => {
                                    setSortQuery({ column: [column.name], direction: direction })
                                }
                            }
                            direction={
                                (() => {
                                    if (sortQuery.column == (column.name)) {
                                        return sortQuery.direction
                                    }
                                })()
                            }
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