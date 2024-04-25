<?php
// Aktiver feilmeldinger for feilsøking
// Fjern eller endre disse innstillingene i produksjon
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

// Variabel for å lagre feil- eller suksessmeldinger
$message = '';

// Sjekk om forespørselsmetoden er POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Unngå SQL-injeksjon ved å sikre brukerinput
    $input_username = $conn->real_escape_string($_POST['username']);
    $input_password = $conn->real_escape_string($_POST['password']);

    // Modifisert for å bruke forberedte uttalelser for forbedret sikkerhet
    $sql = $conn->prepare("SELECT username, credits FROM users WHERE username = ? AND password = ?");
    $sql->bind_param("ss", $input_username, $input_password);
    $sql->execute();
    
    // Få resultatet av spørringen
    $result = $sql->get_result();

    // Sjekk for feil i spørringen
    if (!$result) {
        die('Feil i SQL-spørring: ' . $conn->error);
    }

    // Sjekk om det finnes en matchende bruker
    if ($result->num_rows > 0) {
        // Hent radedata
        $row = $result->fetch_assoc();
        session_start();
        $_SESSION['username'] = $row['username'];
        $_SESSION['credits'] = $row['credits'];
        header('Location: index.php');
        exit();
    } else {
        // Vis feilmelding hvis ingen matchende bruker er funnet
        $message = "Ugyldig brukernavn eller passord. Prøv igjen.";
    }

    // Lukk forberedt uttalelse
    $sql->close();
}

// Lukk databaseforbindelsen
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Logg inn</h2>
    <form method="post" action="">
        <div>
            <label for="username">Brukernavn:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password">Passord:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Logg inn</button>
    </form>

    <!-- Vis feilmelding hvis det er noen -->
    <?php if ($message) : ?>
        <p><?php echo $message; ?></p>
    <?php endif; ?>
</body>
</html>
