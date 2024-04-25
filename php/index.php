<?php
// Aktiver feilmeldinger for feilsøking
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database tilkoblingsdetaljer
$dbhost = '172.20.128.78';
$dbport = '3306'; // Portnummer for MySQL-serveren
$dbuser = 'adminusr';
$dbpass = 'Skole123';
$dbname = 'spin'; // Databasenavn

// Opprett en ny MySQLi-tilkobling
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname, $dbport);

// Sjekk om tilkoblingen er vellykket
if ($conn->connect_error) {
    die('Tilkobling mislyktes: ' . $conn->connect_error);
}

// Klasse for å håndtere spilleautomaten
class SlotMachine {
    private $userID;
    private $conn;

    public function __construct($conn, $userID) {
        $this->conn = $conn;
        $this->userID = $userID;
    }

    // Metode for å starte spillet
    public function startGame() {
        // Sjekk om brukeren har nok kreditter til å spille
        $credits = $this->getCredits();
        if ($credits > 0) {
            // Reduser kreditter med 1 per spinn
            $this->updateCredits($credits - 1);

            // Simuler tilfeldige resultater for hver spalte
            $result1 = rand(0, 9);
            $result2 = rand(0, 9);
            $result3 = rand(0, 9);

            // Vis resultatet på skjermen
            echo "Resultat: $result1 $result2 $result3\n";
        } else {
            echo "Du har ikke nok kreditter til å spille.\n";
        }
    }

    // Metode for å hente antall kreditter for brukeren fra databasen
    private function getCredits() {
        $query = "SELECT amount FROM credits WHERE userID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $this->userID);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row ? $row['amount'] : 0;
    }

    // Metode for å oppdatere antall kreditter for brukeren i databasen
    private function updateCredits($newAmount) {
        $query = "UPDATE credits SET amount = ? WHERE userID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ii", $newAmount, $this->userID);
        $stmt->execute();
    }
}

// Brukerens ID (du må tilpasse dette basert på innloggingssystemet ditt)
$userID = 1; // For eksempel, anta at brukerens ID er 1

// Opprett en instans av spilleautomaten
$slotMachine = new SlotMachine($conn, $userID);

// Sjekk om skjemaet er sendt (for eksempel ved bruk av et HTML-skjema)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sjekk om "startGame"-knappen ble trykket
    if (isset($_POST["startGame"])) {
        // Start spillet
        $slotMachine->startGame();
    }
}
?>
