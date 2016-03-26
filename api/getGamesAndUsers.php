<?php
include 'config.php';

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', $password);

$qGames = $bdd->query('SELECT * FROM game');
$games = array();
while ($data = $qGames->fetch()) {
	array_push($games, $data);
}

$qUsers = $bdd->query('SELECT * FROM users');
$users = array();
while ($data = $qUsers->fetch()) {
	array_push($users, $data);
}

$response = array();
$response["games"] = $games;
$response["users"] = $users;

echo json_encode($response);

$qGames->closeCursor();
$qUsers->closeCursor();

?>