<?php

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

$res = $bdd->query('SELECT amount FROM free_parking');

$res2 = $res->fetch();

$response = $res2['amount'];

echo $response;

$res->closeCursor();

?>