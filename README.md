**Slot-Maskjin Brukertesting**

**Hav er nettsiden*

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

**Testscenario for påloggingssystemet**

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
