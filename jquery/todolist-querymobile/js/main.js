var checklists = {
	1: {
		name: 'ma belle liste',
		tasks : [
		{name: 'Task1', done: true},
		{name: 'Task2', done: false},
		{name: 'Task3', done: false},
		{name: 'plop', done: true},
		]
	},
	2: {
		name:'checklist2',
		tasks : [
		{name: 'Task1', done: true},
		{name: 'Task2', done: false},
		{name: 'Task3', done: true},
		]
	}
}
var getUrlParameter = function(paramName) {
	var urlParams = window.location.href.split('?')[1];
	if (urlParams) {
		var params = urlParams.split('&');

		for (var i = 0; i <  params.length; i++) {
			var param = params[i].split('=');
			if (param[0] == paramName)
				return param[1];
		}
	}
}
$("#list").on("pageinit", function() {
	$.mobile.toolbar.prototype.options.backBtnText = "Retour";
	$.mobile.toolbar.prototype.options.addBackBtn = true;
	if (localStorage.getItem("checklists") == null){
		localStorage.setItem("checklists", JSON.stringify(checklists));
	}
	else {
		checklists = JSON.parse(localStorage.getItem("checklists"));
	}
});

$(document).on("pagebeforeshow", "#list", function() {
	$content = "";
	$.each(checklists, function(index, val) {
		$content += '<li><a href="view.html?id='+index+'" data-transition="slidefade">'+val.name+'</a><a href="form.html?id='+index+'"></a></li>';
	});
	$("ul").html($content).listview("refresh");
});

$(document).on("pagebeforeshow", '#view', function(){
	$id = getUrlParameter('id');
	$list = checklists[$id];
	$("#view h1").html($list.name);
	$content = "";
	$.each($list.tasks, function(index, val) {
		$content += '<label><input data-id='+index+' name="checkbox-'+index+'" type="checkbox"';
		$content += (val.done) ? " checked" : "";
		$content += '>'+val.name+'</label>';
	});
	console.log($content);
	$("div#viewTasks").html($content).trigger("create");
});

$(document).on("pagebeforeshow", '#form', function(){
	$id = getUrlParameter('id');
	$numberOfInputs = 3;
	if (!$id){
		$("#form h1").html("Create new list");
	}
	else {
		$list = checklists[$id];
		$("#form h1").html("Edit " + $list.name);
		console.log($list.tasks);
		$numberOfInputs = $list.tasks.length;
	}
	$content = "";
	$listName = ($id) ? checklists[$id].name : "";
	$content += '<label for="title">Titre de la liste</label>'+
	'<input name="title" id="title" value="'+$listName+'" placeholder="Titre" type="text">';
	
	$content += '<div data-role="controlgroup">';
	for (i = 0; i < $numberOfInputs; i++){
		$taskName = ($id) ? checklists[$id].tasks[i].name : "";
		$content += '<label for="task'+i+'">Tâche</label>'+
		'<input name="task'+i+'" id="task'+i+'" value="'+$taskName+'" placeholder="Tâche" type="text">';
	}
	$content += "</div>";
	$('#form #tasks').html($content).trigger("create");
});

$(document).on('click', "#addTask", function(event) {
	$nextId = $("#tasks .ui-controlgroup-controls div").length; // 4
	$content = $('<label for="task'+$nextId+'">Tâche</label>'+
		'<input name="task'+$nextId+'" id="task'+$nextId+'" value="" placeholder="Tâche" type="text">');
	$content.insertAfter("#tasks .ui-controlgroup-controls div:last-child");
	$('#form #tasks').trigger("create");
});

$(document).on('click', '#save', function(event){ 
	event.preventDefault();
	$element = ($id) ? checklists[$id] : {};
	$element.name = $("#tasks #title").val();
	$element.tasks = [];
	$("#tasks .ui-controlgroup-controls div input").each(function(index, el) {
		$isDone = ($element.tasks[index]) ? $element.tasks[index].done : false;
		$element.tasks.push({ 'name': el.value, 'done': $isDone });
	});
	console.log($element);
	if ($id){
		checklists[$id] = $element;
	}
	else {
		$(checklists).extend($element);
	}
	localStorage.setItem("checklists", JSON.stringify(checklists));
});

$(document).on("change", '#view input:checkbox', function(event) { 
	$index = $(this).attr("data-id");
	checklists[$id].tasks[$index].done = !checklists[$id].tasks[$index].done;
	localStorage.setItem("checklists", JSON.stringify(checklists));
});