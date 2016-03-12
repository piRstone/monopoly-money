<?php

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

$bdd->exec("UPDATE properties SET owner_id = NULL, nbHouses = 0 WHERE id > 0");
$bdd->exec("UPDATE users SET credit = 1500, nbGares = 0, nbCompagnies = 0 WHERE id > 0");

?>