<?php
include 'config.php';

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', $password);

$res = $bdd->query("SELECT id, name, game_id, credit, nbGares, nbCompagnies FROM users");

$users = array();

while ($data = $res->fetch()) {
	$user = array();
	$user['id'] = $data['id'];
	$user['name'] = $data['name'];
	$user['game_id'] = $data['game_id'];
	$user['credit'] = $data['credit'];
	$user['nbGares'] = $data['nbGares'];
	$user['nbCompagnies'] = $data['nbCompagnies'];
	array_push($users, $user);
}

$res->closeCursor();

for ($i=0 ; $i < count($users) ; $i++) {
	$userId = $users[$i]['id'];
	$req = $bdd->query("SELECT id FROM properties WHERE owner_id = $userId");
	$propertiesId = array();
	while ($data = $req->fetch()) {
		array_push($propertiesId, $data);
	}
	$users[$i]['nbProperties'] = count($propertiesId);
}

echo json_encode($users);

?>