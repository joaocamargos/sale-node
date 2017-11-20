'use strict';

define(function (require) {
	var Postmonger = require('postmonger');
	var connection = new Postmonger.Session();
	var payload = {};
	var index = 0;
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
        var message = '';
        var title = '';

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        if (inArguments[0].message ) {
            $('#type').val(inArguments[0].type);
            $('#title').val(inArguments[0].title);
			$('#message').val(inArguments[0].message);
			$('#categoria').val(inArguments[0].categoria);
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
		var name = $('#message').val();
		
		payload.name = $('#type').val();

		payload['arguments'].execute.inArguments[0].type = $('#type').val();
        payload['arguments'].execute.inArguments[0].title = $('#title').val();
		payload['arguments'].execute.inArguments[0].message = $('#message').val();
		payload['arguments'].execute.inArguments[0].categoria = $('#categoria').val();
		payload['metaData'].isConfigured = true;

		connection.trigger('updateActivity', payload);
	}

	connection.on('initActivity', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
});
