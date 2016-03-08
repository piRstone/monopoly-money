<?php

if ($_GET['user']) {

	$userId = $_GET['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->query("SELECT * FROM properties WHERE owner_id = $userId ORDER BY type DESC");

	$response = array();

	while ($data = $res->fetch()) {
		$prop = array();
		$prop['id'] = $data['id'];
		$prop['type'] = $data['type'];
		$prop['name'] = $data['name'];
		$prop['owner_id'] = $data['owner_id'];
		$prop['h0'] = $data['h0'];
		$prop['h1'] = $data['h1'];
		$prop['h2'] = $data['h2'];
		$prop['h3'] = $data['h3'];
		$prop['h4'] = $data['h4'];
		$prop['h5'] = $data['h5'];
		$prop['g1'] = $data['g1'];
		$prop['g2'] = $data['g2'];
		$prop['g3'] = $data['g3'];
		$prop['g4'] = $data['g4'];
		$prop['house'] = $data['house'];
		$prop['price'] = $data['price'];
		$prop['hypotheque'] = $data['hypotheque'];
		$prop['color'] = $data['color'];
		$prop['nbHouses'] = $data['nbHouses'];
		array_push($response, $prop);
	}

	echo json_encode($response);

	$res->closeCursor();
}

?>