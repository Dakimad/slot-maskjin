<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
// Aktiver feilmeldinger for feilsøking
// Fjern eller endre disse innstillingene i produksjon
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database tilkoblingsdetaljer
$dbhost = 'localhost'; // Endre dette til din faktiske databasevert
$dbuser = 'adminusr';
$dbpass = 'Skole123';
$dbname = 'spin';

// Opprett en ny MySQLi-tilkobling
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

// Sjekk om tilkoblingen er vellykket
if ($conn->connect_error) {
    die('Tilkobling mislyktes: ' . $conn->connect_error);
}

// Variabel for å lagre feil- eller suksessmeldinger
$message = '';

// Sjekk om forespørselsmetoden er POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Unngå SQL-injeksjon ved å sikre brukerinput
    $input_username = $conn->real_escape_string($_POST['username']);
    $input_password = $conn->real_escape_string($_POST['password']);

    // Sjekk om brukernavnet allerede er i bruk
    $check_username_query = "SELECT * FROM brukere WHERE Username='$input_username'";
    $check_username_result = $conn->query($check_username_query);
    if (!$check_username_result) {
        // Feil ved spørring, logg feilmelding
        $message = "Feil ved spørring: " . $conn->error;
    } elseif ($check_username_result->num_rows > 0) {
        $message = "Brukernavnet er allerede i bruk. Velg et annet brukernavn.";
    } else {
        // Legg til brukeren i databasen
        $add_user_query = "INSERT INTO brukere (Username, Password) VALUES ('$input_username', '$input_password')";
        if ($conn->query($add_user_query) === TRUE) {
            // Vis suksessmelding hvis brukeren ble lagt til
            $message = "Brukeren ble registrert vellykket. Du kan nå logge inn.";
        } else {
            // Vis feilmelding hvis det oppstod en feil under registreringen
            $message = "Det oppstod en feil under registreringen: " . $conn->error;
        }
    }
}

// Lukk databaseforbindelsen
$conn->close();
?>
</body>
</html>
