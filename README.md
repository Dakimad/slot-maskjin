**Dekryptering og Brukervennlighetstesting Skjema**

**Hav gjør nettsiden**

1. **MD5-kryptering av passord**:
Det har en funksjon (`encryptWithMD5`) som tar inn et passord og utfører MD5-kryptering på det.

2. **Kryptering**:
Når brukeren trykker på "Krypter" -knappen, hentes passordet og teksten fra input-feltet. Teksten konverteres deretter til en rekke emojis, og dette krypterte resultatet vises på nettsiden. Den krypterte teksten lagres også i `localStorage` sammen med passordet for senere dekryptering.

3. **Dekryptering**:
Når brukeren trykker på "Dekrypter" -knappen, hentes den krypterte teksten og det angitte passordet. Deretter utføres MD5-kryptering på det angitte passordet for sammenligning med lagrede krypterte passord. Hvis passordene stemmer overens, dekodes den krypterte teksten tilbake til den opprinnelige teksten og vises på nettsiden.

4. **Knappehåndtering**:
   Det er knapper for å bytte mellom krypterings- og dekrypteringsmodus. Disse knappene endrer visningen på nettsiden basert på hvilken modus som er valgt.

**Logg inn**

1. **Feilmeldinger aktiveres for feilsøking**:
Det første skriptet gjør er å aktivere visning av feilmeldinger for å lette feilsøking under utvikling. Dette bør fjernes eller endres i produksjonsmiljøet for sikkerhetsformål.

2. **Database tilkoblingsdetaljer**:
Det definerer detaljer for å koble til databasen, inkludert vertsadresse, brukernavn, passord og databaseskjema.

3. **Opprettelse av MySQLi-tilkobling**:
Deretter opprettes en tilkobling til databasen ved hjelp av MySQLi-objektet. Hvis tilkoblingen mislykkes, vil skriptet avslutte med en feilmelding.

4. **Behandling av forespørsel**:
Skriptet sjekker om forespørselsmetoden er POST. Dette antyder at data er sendt fra et skjema, for eksempel et påloggingsformular.
