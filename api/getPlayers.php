<?php

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

$res = $bdd->query("SELECT * FROM users");

$users = array();

while ($data = $res->fetch()) {
	array_push($users, $data);
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