'use strict';

define(function (require) {
	var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};
	var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'}
	];
	var currentStep = steps[0].key;

	$(window).ready(function () {
		connection.trigger('ready');
	});

	function initialize (data) {
		if (data) {
			payload = data;
		}
	}

	function onClickedNext () {
		save();/*
		if (currentStep.key === 'eventdefinitionkey') {
		} else {
			connection.trigger('nextStep');
		}*/
	}

	function onClickedBack () {
		connection.trigger('prevStep');
	}

	function onGotoStep (step) {
		showStep(step);
		connection.trigger('ready');
	}

	function showStep (step, stepIndex) {
		if (stepIndex && !step) {
			step = steps[stepIndex - 1];
		}

		currentStep = step;

	//	$('.step').hide();

		switch 	(currentStep.key) {
		case 'eventdefinitionkey':
			$('#step1').show();
			$('#step1 input').focus();
			break;
		}
	}

	function save () {
		var eventDefinitionKey = $('#msgFrom').val();

		payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].execute = payload['arguments'].execute || {};
		payload['arguments'].execute.inArguments = [{
			'serviceCloudId': '{{Event.' + eventDefinitionKey + '.\"<EVENT DATA ID PATH>\"}}'
		}];

		payload['metaData'] = payload['metaData'] || {};
		payload['metaData'].isConfigured = true;

		//console.log(JSON.stringify(payload));
		var teste = {
			"nome": "andrews"
		}
		connection.trigger('updateActivity', teste);
	}

	connection.on('initActivity', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
});
