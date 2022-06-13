// import
import useSWR from 'swr'
import Link from 'next/link';
import React from 'react';
import styles from '../styles/Home.module.css'



export default function Tabela({ apiURL, onDetailsClick, onNewClick }) {

    const fetcher = (url) => fetch(url).then(r => r.json()).then(data => {// tutaj mozna modyfikowac uzyskane dane przd wyswietlaniem
        data.columns.push('Szczegóły') // add column with link to details.
        return data;
    })
    const { data, error } = useSWR(apiURL, fetcher)


    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>


    return (


        <div className={styles.container}>
            <div class="card  mb-3" >
                <table className="table table-striped">
                    <Thead
                        columns={data.columns}
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

function Thead({ columns }) {
    return (
        <thead>
            <tr>
                {/* {JSON.stringify(columns)} */}
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
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
                    {()=>{
                        if(onDetailsClick){
                            return <td><Link href={onDetailsClick(row.id)}><a>Szczegóły</a></Link></td>
                        }
                    }}
                </tr>
            ))}
        </tbody>
    )
}