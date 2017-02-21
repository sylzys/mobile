jQuery(document).ready(function($) {

	$taskList = localStorage.getItem("taskList");
	if ($taskList == null){
		$.getJSON('tasks.json', function(json, textStatus) {
			console.log(json.tasks);
			createTaskList(json.tasks);
			console.log("parsing fichier local");
			localStorage.setItem("taskList", JSON.stringify(json));
		});
	}
	else {
		createTaskList(JSON.parse($taskList).tasks);
	}
	$('li input:checkbox').click(function(event) {
		$(this).parent().addClass('green complete hidden');
		verifComplete();
	});

	$('#showHide').click(function(event) {
		$('.complete').each(function(index, el) {
			$(this).toggleClass('hidden');
		});
	});

	$('p.title').click(function(event) {
		$(this).next().toggle();
	});

	$('#addTask').click(function(event) {
		$('form').toggle('fast');
	});

	$('#saveTask').click(function(event) {
		event.preventDefault();
		$title = $("#taskTitle");
		$desc = $("#taskDescription");
		$element = '<li class="task"><input type="checkbox"/>'+
		'<div><p class="title">'+$title.val()+'</p>'+
		'<p class="description">'+$desc.val()+'</p>'+
		'</div><i class="fa fa-check" aria-hidden="true"></i>'+
		'</li>';

		$list = JSON.parse(localStorage.getItem("taskList"));
		$list.tasks.push({"title": $title.val(), "description": $desc.val()});
		localStorage.setItem("taskList", JSON.stringify($list));
		
		$('ul li:last-child').append($element);
		$title.val("");
		$desc.val("");

	});

	function createTaskList(list) {
		$myList = "<ul>";
		list.forEach( function(element, index) {
			$myList += '<li class="task"><input type="checkbox"/>'+
			'<div><p class="title">'+element.title+'</p>'+
			'<p class="description">'+element.description+'</p>'+
			'</div><i class="fa fa-check" aria-hidden="true"></i>'+
			'</li>';
		});
		$myList += "</ul>";

		$("#taskList").html($myList);
	}
	function verifComplete (){
		console.log($("li input:checkbox:not(:checked)"));
		if ($("li input:checkbox:not(:checked)").length == 0) {
			$('#msg').text("Plus de tâches en cours");
		}
	}
});