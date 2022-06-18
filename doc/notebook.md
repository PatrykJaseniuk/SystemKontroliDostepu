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







