// Klasse for å håndtere spilleautomaten
class SlotMachine {
    private credits: number;
    private spinCounter: number;

    constructor() {
        this.credits = 0;
        this.spinCounter = 0;
    }

    // Metode for å starte spillet
    startGame() {
        if (this.credits > 0) {
            // Reduser kreditter med 1 per spinn
            this.credits--;

            // Simuler tilfeldige resultater for hver spalte
            const result1 = Math.floor(Math.random() * 10);
            const result2 = Math.floor(Math.random() * 10);
            const result3 = Math.floor(Math.random() * 10);

            // Oppdater spinn telleren
            this.spinCounter++;

            // Vis resultatet på skjermen
            console.log(`Resultat: ${result1} ${result2} ${result3}`);

            // Oppdater grensesnittet med kreditter og spinn teller
            this.updateUI();
        } else {
            console.log("Du har ikke nok kreditter til å spille.");
        }
    }

    // Metode for å oppdatere grensesnittet med kreditter og spinn teller
    private updateUI() {
        const creditsElement = document.querySelector('.credits');
        const spinCounterElement = document.querySelector('#spin-counter');

        if (creditsElement && spinCounterElement) {
            creditsElement.textContent = `Credits: ${this.credits}`;
            spinCounterElement.textContent = `${this.spinCounter}`;
        }
    }
}

// Opprett en instans av spilleautomaten
const slotMachine = new SlotMachine();

// Lytter på klikk-hendelsen for startknappen
const controlButton = document.querySelector('#control');
if (controlButton) {
    controlButton.addEventListener('click', () => {
        slotMachine.startGame();
    });
}
