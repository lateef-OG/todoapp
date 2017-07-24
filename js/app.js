var tasks = JSON.parse(localStorage.getItem('todo-list')) || []; //contains tasks to do
var compTasks = JSON.parse(localStorage.getItem('comp-list')) || []; //contains completed tasks

//add tasks to to-do list
function addTask(){
	var task = document.getElementById('input').value;
	
	if (task == ""){
		return alert('You need to add a task');
	}
	
	tasks.push({
		value: task,
		date: (new Date()).toLocaleDateString()
	});
	
	localStorage.setItem('todo-list', JSON.stringify(tasks));
	
	show();
	showCompleted();
	
	document.getElementById('input').value = "";
}

//function to delete task from to-do list
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('todo-list', JSON.stringify(tasks))
  show();
  showCompleted();
}

//function to delete completed task
function deletecompleted(index) {
  compTasks.splice(index, 1);
  localStorage.setItem('comp-list', JSON.stringify(compTasks))
  show();
  showCompleted();
}

//adding completed task to list of completed tasks
function completeTask(index){
	compTasks.push({
		value: tasks[index].value,
		date: (new Date()).toLocaleDateString()
	});
	localStorage.setItem('comp-list', JSON.stringify(compTasks));
	
	tasks.splice(index, 1);
	localStorage.setItem('todo-list', JSON.stringify(tasks))
	show();
	showCompleted();
}

//showing tasks on the to-do list
function show() {
  var list = "";
  for (var i = 0; i < tasks.length; i++) {
    list += "<li><span id = 'check' onclick='completeTask("+ i +")'>✔</span>" + "  ";
    list += tasks[i].value + "   ";
	list += "<span style = 'font-size: 12px'>" + tasks[i].date + "</span>";
	list += "<span id = 'remove' onclick='deleteTask("+ i +")'>X</span>";
  }
  document.getElementById("list").innerHTML = list;
}

//showing completed task
function showCompleted() {
  var list = "";
  for (var i = 0; i < compTasks.length; i++) {
    list += "<li>";
    list += compTasks[i].value + " ";
	list += "<span style = 'font-size: 12px'>" + compTasks[i].date + "</span>";
	list += "<span id = 'remove' onclick='deletecompleted("+ i +")'>X</span></li>";
  }
  document.getElementById("comp-list").innerHTML = list;
}

//functions run when page loads 
 (function() {
  show();
  showCompleted();
})(); 