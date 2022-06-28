import { Result as TabelaProsta } from "../read"

export interface Argument {
}

export interface Usluga {
    nazwa: string,
    tabela: TabelaProsta
}

export interface Result {
    uslugi: Usluga[]
}

const URL = '/api/klient/getKlienciWUslugach';

export async function getKlienciWUslugach(): Promise<Result> {
    // Default options are marked with *
    const response = await fetch(URL);
    return response.json(); // parses JSON response into native JavaScript objects
}