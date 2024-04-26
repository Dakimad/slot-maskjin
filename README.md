**Slot-Maskjin Brukertesting**

**Hav er nettsiden**

1. **Navigansjoin**:
Hva syns du om navigasjonen er det vansleking å se hvoran du skal komme deg frem og tilbake mellom logginn og signupp.
Har du noen endringer du ville ha gjort.

3. **Spinn**:
Når brukeren trykker på "Start", "Stop", "tilbaksestill" -knappen, gjør knappen det den skal og funker funktionen.

4. **poeng og spinn-Counter**:
Når brukeren spinnner og får to like får du poeng. og når du spunnner får du et spinn for hvær gang du trykker start.

5. **Knappehåndtering**:
   Det er knapper for å bytte mellom Logginn/Signupp- og Hjemme siden. Disse knappene endrer visningen på nettsiden basert på hvilken modus som er valgt.

Selvfølgelig, her er teksten tilpasset koden for innlogging:

---

**Logg inn**

1. **Feilmeldinger aktiveres for feilsøking**:
   Skriptet aktiverer visning av feilmeldinger for å lette feilsøking under utvikling. Dette bør fjernes eller endres i produksjonsmiljøet for sikkerhetsformål.

2. **Database tilkoblingsdetaljer**:
   Det definerer detaljer for å koble til databasen, inkludert vertsadresse, brukernavn, passord og databaseskjema.

3. **Opprettelse av MySQLi-tilkobling**:
   Deretter opprettes en tilkobling til databasen ved hjelp av MySQLi-objektet. Hvis tilkoblingen mislykkes, vil skriptet avslutte med en feilmelding.

4. **Behandling av forespørsel**:
   Skriptet sjekker om forespørselsmetoden er POST. Dette antyder at data er sendt fra et skjema, for eksempel et påloggingsformular.

5. **Sikring av brukerinput**:
   Brukerinndata, i dette tilfellet brukernavn og passord, blir sikret mot SQL-injeksjon ved å bruke `real_escape_string`-funksjonen.

6. **Utføring av spørring**:
   En forberedt spørring blir utført for å hente data fra databasen basert på det oppgitte brukernavnet.

7. **Behandling av resultat**:
   Resultatet av spørringen blir sjekket for å se om det finnes en matchende bruker. Hvis et samsvar blir funnet, blir det lagrede passordet sammenlignet med det innsendte passordet.

8. **Omdirigering ved vellykket pålogging**:
   Hvis legitimasjonen er vellykket, omdirigeres brukeren til en annen side, for eksempel en innloggede side.

9. **Visning av feilmelding ved ugyldige legitimasjonsopplysninger**:
   Hvis passordet ikke samsvarer med det lagrede passordet, vises en feilmelding.

10. **Lukking av databaseforbindelsen**:
    Til slutt lukkes databaseforbindelsen for å frigjøre ressurser.



---

**Hensikt:**
Teste påloggingssystemet for å sikre at det fungerer som forventet og gir passende tilbakemeldinger til brukeren.
**Signupp:**

1. **Aktivering av feilmeldinger:**
   - Kontroller at feilmeldinger er aktivert for å lette feilsøking under utvikling. Pass på å merke at dette bør fjernes eller endres i produksjonsmiljøet av sikkerhetsmessige årsaker.

2. **Database tilkoblingsdetaljer:**
   - Verifiser at detaljene for å koble til databasen er korrekt definert, inkludert vertsadresse, brukernavn, passord og databaseskjema.

3. **Opprettelse av MySQLi-tilkobling:**
   - Sjekk om tilkoblingen til databasen er opprettet ved hjelp av MySQLi-objektet. Hvis tilkoblingen mislykkes, forventes det at skriptet avsluttes med en feilmelding.

4. **Behandling av forespørsel:**
   - Verifiser at skriptet sjekker om forespørselsmetoden er POST, som indikerer at data er sendt fra et skjema, for eksempel et påloggingsformular.

5. **Sikring av brukerinput:**
   - Se etter at brukerinndata, spesielt brukernavn og passord, blir sikret mot SQL-injeksjon ved å bruke real_escape_string-funksjonen.

6. **Utførelse av spørring:**
   - Sjekk om en forberedt spørring blir utført for å hente data fra databasen basert på det oppgitte brukernavnet.

7. **Behandling av resultat:**
   - Verifiser at resultatet av spørringen blir sjekket for å se om det finnes en matchende bruker. Se etter at det lagrede passordet sammenlignes med det innsendte passordet.

8. **Omdirigering ved vellykket pålogging:**
   - Kontroller at hvis legitimasjonen er vellykket, blir brukeren omdirigert til en annen side, for eksempel en innloggede side.

9. **Visning av feilmelding ved ugyldige legitimasjonsopplysninger:**
   - Se etter at hvis passordet ikke samsvarer med det lagrede passordet, vises en passende feilmelding.

10. **Lukking av databaseforbindelsen:**
    - Sjekk at databaseforbindelsen blir lukket for å frigjøre ressurser.

**Forventede Resultater:**
- Påloggingssystemet skal validere brukerens legitimasjon og gi passende tilbakemeldinger.
- Feilhåndtering og sikkerhetspraksiser skal implementeres i samsvar med beste praksis.
- Brukeren skal kunne logge inn på systemet uten problemer, og feil skal håndteres på en informativ måte.

**Oppfølgingsspørsmål:**
- Ble det identifisert noen feil eller uoverensstemmelser under testingen?
- Var feilmeldinger og tilbakemeldinger til brukeren tilstrekkelige og forståelige?

---

Slot-maskjin nettsiden min tilbyr funksjonalitet for pålogging og registrering (sign-up), er det flere viktige sikkerhetsaspekter som må tas i betraktning:

1. **Beskyttelse mot SQL-injeksjon**: Sikre at all brukerinndata som blir sendt til databasen, blir behandlet på en sikker måte for å forhindre SQL-injeksjon. Dette kan oppnås ved å bruke forberedte spørringer (prepared statements) eller ved å sanitere input ved hjelp av funksjoner som `real_escape_string`.

2. **Passordsikkerhet**: Implementer en sikker metode for lagring av passord i databasen, for eksempel hashing med en tilfeldig saltverdi. Dette bidrar til å beskytte brukerens passord i tilfelle en databaselekkasje.

3. **Brukerautentisering og -autorisasjon**: Sørg for at bare autoriserte brukere har tilgang til bestemte deler av nettsiden. Dette kan oppnås ved å implementere en robust autentiseringsmekanisme, for eksempel bruk av sessions eller tokens, og ved å kontrollere tilgangsnivåer til ulike ressurser.

4. **Sikkerhet mot brute force-angrep**: Implementer mekanismer som begrenser antall påloggingsforsøk eller innfører en captcha-løsning for å hindre brute force-angrep på påloggingssiden.

5. **Datakryptering**: Krypter sensitiv brukerinformasjon, for eksempel personopplysninger og betalingsdetaljer, når de blir sendt over nettverket, for å beskytte mot avlytting og datatyveri.

6. **Beskyttelse mot XSS-angrep**: Sikre at all brukerinput som blir vist på nettsiden, blir skikkelig escaped eller filtrert for å forhindre XSS (Cross-Site Scripting) -angrep.

7. **Oppdatering og sårbarhetshåndtering**: Sørg for å holde nettsiden oppdatert med de nyeste sikkerhetsoppdateringene og håndter sårbarheter så snart de oppdages.

Når det gjelder hvorfor disse sikkerhetsaspektene er viktige, er det fordi nettsider som tilbyr pålogging og registrering håndterer sensitiv brukerinformasjon. Dette inkluderer personlige detaljer og passord som kan være attraktive mål for hackere og angripere. Å implementere tilstrekkelige sikkerhetsforanstaltninger bidrar til å beskytte både brukernes personvern og nettsidens integritet, og det bygger tillit hos brukerne.

---

**Serveroppsett**

**Bakgrunn:**
Jeg tok initiativ til å konfigurere to containere på en Core med Ubuntu-serveren min. En container skulle være for kjøring av nettsiden, mens den andre skulle være for MySQL-databaser.

**Trinnene i Serveroppsettet:**

1. **Opprettelse av Containere:**
   - Jeg startet med å lage to containere – en Core med Ubuntu-server for nettsiden og en MySQL-container for databaseoppsett.

    
2. **Minimal Krav**
   - De Minimmale kravene for å sette opp serverene son som jeg har gjort det er: 
<img width="433" alt="Screenshot 2024-03-12 at 13 31 06" src="https://github.com/Dakimad/Emoji-Krypting-og-dekrypting/assets/104507449/9874e947-c09d-450b-9a3d-91d06e50691e">

3. **Klone Github-repositoriet:**
   - For Core-containeren, klonte jeg GitHub-repositoriet rett mot serveren. Dette trinnet var enkelt og raskt utført.

4. **Tilpasninger og Feilretting:**
   - Etter kloneprosessen måtte jeg gjøre noen tilpasninger på grunn av forskjeller mellom min laptop og serveren. Dette inkluderte å justere enkelte filer for å sikre sømløs drift på serveren. For å implementere disse endringene, gikk jeg inn i serverkoden og rettet opp noen småfeil. Dette skyldes at Ubuntu ikke er like tolerant som macOS når det gjelder kodepresisjon. Selv om VS Code tillater bruk av små bokstaver i filnavn, fungerer det ikke som forventet når filnavnet inneholder store bokstaver og jeg refererer til det med små bokstaver i koden. da det viste seg å være en effektiv metode.

5. **Alternativ Tilpasning:**
   - En annen tilpasningsmetode, selv om mer tidkrevende, er å slette alle filene i containeren og deretter klone GitHub-repositoriet på nytt. Dette kan være et alternativ for de som foretrekker en ren start.
  
