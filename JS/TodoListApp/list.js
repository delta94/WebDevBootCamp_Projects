// console.log ("CONNECTED!)

var todos =[];
var input = prompt("What would you like to do?");

while (input !== "quit") {
   if (input === "list") {
    console.log("**********");
    todos.forEach(function(todo, i) {
        console.log(i + ": " + todo);
    });
      console.log("**********");
 
} else if (input === "new") {
    //ask for a new todo
    var newTodo = prompt ("Enter your new todo");
    // add it to your todo array
    todos.push(newTodo);
    console.log ("Added");
} else if (input === "delete") {
    //ask for index of todo to be deleted
    var index = prompt ("Enter index of todo to delete?");
    // delete that todo
    // Use splice() to delete '1' item starting at 'index'
    todos.splice(index,1);
    console.log("Deleted");
}
 // ask for new input
 input = prompt("What would you like to do?");
}

console.log ("OK. See You Next Time");