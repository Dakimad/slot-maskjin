<?php
// Aktiver feilmeldinger for feilsøking
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database tilkoblingsdetaljer
$dbhost = '172.20.128.78:3306';
$dbuser = 'adminusr';
$dbpass = 'Skole123';
$dbname = 'login';

// Opprett en ny MySQLi-tilkobling
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Sjekk om tilkoblingen er vellykket
if ($conn->connect_error) {
    die('Tilkobling mislyktes: ' . $conn->connect_error);
}

// Klasse for å håndtere spilleautomaten
class SlotMachine {
    private $credits;
    private $spinCounter;
    private $conn;

    public function __construct($conn) {
        $this->credits = 0;
        $this->spinCounter = 0;
        $this->conn = $conn;
    }

    // Metode for å starte spillet
    public function startGame() {
        if ($this->credits > 0) {
            // Reduser kreditter med 1 per spinn
            $this->credits--;

            // Simuler tilfeldige resultater for hver spalte
            $result1 = rand(0, 9);
            $result2 = rand(0, 9);
            $result3 = rand(0, 9);

            // Oppdater spinn telleren
            $this->spinCounter++;

            // Vis resultatet på skjermen
            echo "Resultat: $result1 $result2 $result3\n";

            // Oppdater grensesnittet med kreditter og spinn teller
            $this->updateUI();
        } else {
            echo "Du har ikke nok kreditter til å spille.\n";
        }
    }

    // Metode for å oppdatere grensesnittet med kreditter og spinn teller
    private function updateUI() {
    }
}

// Opprett en instans av spilleautomaten
$slotMachine = new SlotMachine($conn);

// Sjekk om skjemaet er sendt (for eksempel ved bruk av et HTML-skjema)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sjekk om "startGame"-knappen ble trykket
    if (isset($_POST["startGame"])) {
        // Start spillet
        $slotMachine->startGame();
    }
}
?>
