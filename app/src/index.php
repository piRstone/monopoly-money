<!doctype html>
<html>
	<head>
		<title>Monopoly Money</title>
		

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

		<link rel="stylesheet" type="text/css" href="assets/css/reset.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/home.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/monopoly.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-additions.min.css"/>
		<link rel="stylesheet" type="text/css" href="assets/css/angular-motion.css"/>
	</head>
	<body id="ng-app" ng-app="monopoly">
		<h1>Monopoly Money</h1>
		<div ng-controller="AppCtrl">
			<p>{{ text }}</p>
		</div>

		<script src="assets/js/angular/angular.js"></script>
		<script src="assets/js/jquery/jquery.js"></script>
		<!-- <script src="assets/js/restangular/dist/restangular.js"></script> -->
		<script src="app/app.js"></script>
	</body>
</html>