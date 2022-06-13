// import
import { useEffect } from 'react';
import { useState } from 'react';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function Tabela({ apiURL, onDetailsClick, onNewClick }) {

    console.log(`API URL: ${apiURL}`);
    // get data from api
    const { data, error } = useSWR(apiURL, fetcher)




    return (
        <div>
            <h2>
                {JSON.stringify(data)}
            </h2>
        </div>
    )
}