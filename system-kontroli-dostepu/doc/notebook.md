# System Kontroli dostępu
## Początek
### todo:
1) Utworzyć nowy projekt
***
## 1 Tworzenie projektu
w konsoli wpisz: 
```
npx create-next-app@latest
```
### to do:
2) stworzenie `stron` , które będą stanowiły punkty wejścia do systemu. Strony to tak naprawdę aplikację napisane w react. Strony , czyli te aplikacje będą przed wysłaniem do przeglądarki klienta przygotowane(pre-rendering i data fetching) przez Next.js.
***
## 2 Stworzenie stron
Stworzyłem pliki stron z bardzo ogólnymi opisami co mają robić.

### to do:
3) hello world dla każdej strony.
***
## 3 wypełnianie stron pracownika
Wszystkie strony stanowią jedną aplikacje, przejście z jednej do drugiej nie wymaga pobrania danych z servera. Pobranie stron do których linki znajdują się na aktywnej stronie odbywają się jakoś w tle, tak że użytkownik nie musi czekać kiedy klika w link do innej strony, nie jest wywoływane zapytanie do servera, chociaż zmienia się url w przeglądarce.(jak to działa?).

Komunikacja miedzy stronami odbywa się przez przesyłanie parametrów w url. Jednak tak jak to wyżej już napisałem kliknięcie w taki link nie wiąże się z wysłaniem czegoś do severa tylko wszystko dobywa się w przeglądarce klienta.

W obecnej formie aplikacja jest całkowicie oddzielona od servera, nie ma dostępu do danych z serwera, ani server do danych aplikacji. Komunikacja aplikacja <-> server będzie się odbywać przez api. Każdy z komponentów może pobierać coś z serwera prze api i to nawet nie jednego. To jest różnica pomiędzy klasycznym MVC ponieważ tam dane są pobierana przez jeden kontroler dla całego widoku(strony), a tutaj każdy komponent ma jakby własny kontroler, a strona jest drzewem komponentów. 


* MVC: Kontroler--dane-->View:(komponent1, komponent2, komponent3)
* Next.js: app:((kontroler1--dane-->komponent1),(kontroler2--dane-->komponent2),(kontroler2--dane-->komponent2) )

Dane z servera w aplikacji uzyskuję dzięki bibliotece SWR. Żeby zainstalować node_module SWR w konsoli wpisz:
```
npm install swr
```
***
## 3 Hello World dla wszystkich stron
Zrobiono hello world dla każdej strony z przykładowymi danymi. Stworzono podstawowe komponenty.

***
## Komponenty i Api
### to do :
4) Sprecyzować komponenty
5) Stworzyć API dla aplikacji, na razie dane na serverze będą statyczne
6) Znaleźć jakiś sposób na przechowywanie danych. (może MongoDB)

***
## 4 Komponent Tabela, 5 API klienci
* Dodałem możliwość filtrowania danych w tabeli.
* Rozbudowałem api o możliwość filtrowania danych.
***

## 4.1 Komponent Tabela i 5.1 api
### to do:
* sortowanie tabeli 

Modyfikuje api. Teraz argument będzie w body, a nie w url. Dzięki temu argument może być złożony, tz. mogę wysłać tablice z parametrami filtrowania i obiekt z parametrami sortowania.
Źródło: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

```js
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
```

### done :
Dodałem sortowanie tabeli do komponentu i API
***

## 5 API ,6 Baza danych
Baza danych będzie chyba najprostsza z możliwych tz będzie zwykłym obiektem i będę ten obiekt serializował przy użyciu specjalnej biblioteki do serializacji obiektów z zapętlonymi referencjami (jak to mam miejsce w bazie danych). 

Z powody zmian w bazie zmieniłem też trochę api.

### to do:
6.2) Rozbudować bazę danych o metody dodawania, brania rekordu po id i ogarnąć relacje.
5.2) Rozbudować api o obsługę dodatkowych funkcjonalności bazy danych.

Przydał by się jakiś sposób żeby zdefiniować obiekt który jest argumentem dla api, 
żeby IDE podpowiadało mi jaką ma strukturę. Pora na TypeScript.
***

## 6 Rozbudowa Bazy, 5 Rozbudowa Api, TypeScript

Najważniejsze to przejscie z JS so TS. Znacznie ułatwiło poruszanie się po złożonych obiektach jak baza danych z relacjami, albo obiektach, które są argumentami dla fukcji.

### to do:
Definiować strony i komponenty, tworzyć dla nich api i bazę danych.

***
## Debugowanie
Skonfigurowałem debuger w Next.js. i zaczynam dbugowanie. 

***
## Debugowanie
Dlaczego api KlienciWUslugach jeset wywolwana 3 razy?
Pojawił się problem: kiedy importuje jakiś element z pliku to do klienta jest wysyłany cały ten plik i import nasępuje dopiero po stronie klienta.
Dlatego do stron moge importować tylko pliki ktore zawieraja tylko elementy uzywane przez klienta, a nie jak teraz że plik w czesci się składa z funkcji ktore maja sie wykonac po stronie servera a czesc po stronie klienta.

w ts można zdefiniować obiekt z dynamicznym indeksem:
https://bobbyhadz.com/blog/typescript-object-with-dynamic-keys

```ts
interface Person {
  
  [key: string]: string | number;
}

const obj: Person = {
  name: 'Tom',
};

obj.age = 30;

obj.country = 'Chile';
```

Rozdzieliłem kazdy z plikow API na część wykonywaną przez klienta i czesc wykonywana przez serwer.
***
## 6 Baza danych
Postanowilem kozystac ze zwyklej bazy danych.
### to do:
* Polaczyc sie z baza PostgreSQL.
* Stworzyc migracje(zdefiniowac dane)
* ORM i uzyskiwanie danych przez API.

Kozystam z Prisma, czyli moduly który rozwiazuje wszystkie powyzsze zadania. 
https://www.prisma.io/docs/concepts/overview/what-is-prisma

Stworzylem plik Prisma schema, w ktorym sa zdefiniowane::
* polaczenie z baza (Data source)
* generator klienta ???
* model danych (Data model definition)

Stworzylem baze danych za pomoca PGAdmin o nazwie `system-kontroli-dostepu`.

instaluje prisme komeda:
```bash
npm install @prisma/client
```

dokonalem testowej migracji:
```bash
npx prisma migrate dev --name init
```
w dokumentacji podali ta komede bez `npx` na poczatku, ale to nie dziala.
Kiedy mozna uzyc tej komendy bez `npx`?

Tworze klienta na podstawie schemy:
```bash
npx prisma generate
```
udalo sie uzyskać dane w api.

