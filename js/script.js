/**
 * let ●●● = [];
 * $("●●●")
 * 
$("#●●●").on("click", function () {

});

for (let i = 0; i < ●●●; i++) {

}
 *
 *
 *
 *
 */
let taskList = [];

// ローカルストレージからデータとってきて文字→配列に変換
const tasks = localStorage.getItem('todoText');

// length配列の個数にあった数
// ローカルストレージにあるタスクを読み込みして画面上に繰り返し表示している部分
// 保存されてるタスクの中身が空っぽの場合何もする必要ない
if (tasks !== null) {
    taskList = JSON.parse(tasks);
    for(let i = 0; i < taskList.length; i++) {
        $("#todoList").append(`<li>${taskList[i]}</li>`);
    }
}

let completedList = [];

const completetasks = localStorage.getItem('completedText');
if (completetasks !== null) {
    completedList = JSON.parse(completetasks);
    for(let i = 0; i < completedList.length; i++) {
        $("#completedList").append(`<li>${completedList[i]}</li>`);
    }
}

// ToDoリストのアイテムを表示する関数
function displayToDos() {
    let html = '<ul>';
    for (var i = 0; i < taskList.length; i++) {
        html += '<li class="task-item">' + taskList[i] + 
        ' <button onclick="deleteToDo(' + i + ')">削除</button>' + 
        ' <button onclick="completeToDo(' + i + ')">完了</button></li>';
    }
    html += '</ul>';
    $("#todoList").html(html);
}

// ToDoを削除する関数
function deleteToDo(index) {
    taskList.splice(index, 1);
    localStorage.setItem('todoText', JSON.stringify(taskList));
    displayToDos();
}

// ToDoを完了する関数
function completeToDo(index) {
    let completedItem = taskList[index];
    let completedList = JSON.parse(localStorage.getItem('completedText')) || [];
    completedList.push(completedItem);
    localStorage.setItem('completedText', JSON.stringify(completedList));
     // ToDoリストからアイテムを削除
     taskList.splice(index, 1);
     localStorage.setItem('todoText', JSON.stringify(taskList));
 
     // ToDoリストと「終わったこと」のパネルを再表示
     displayToDos();
     displayCompleted();
}

// 「終わったこと」のパネルにアイテムを表示する関数
function displayCompleted() {
    let completedList = JSON.parse(localStorage.getItem('completedText')) || [];
    let html = '<ul>';
    for (var i = 0; i < completedList.length; i++) {
        html += '<li class="task-item">' + completedList[i] +
            ' <button onclick="deleteCompleted(' + i + ')">削除</button></li>';
    }
    html += '</ul>';
    $("#completedList").html(html);
}

// 完了したアイテムを削除する関数
function deleteCompleted(index) {
    let completedList = JSON.parse(localStorage.getItem('completedText')) || [];
    completedList.splice(index, 1);
    localStorage.setItem('completedText', JSON.stringify(completedList));
    displayCompleted();
}


// 追加ボタン押したとき
$('#addTodoBtn').on('click',function(){
    // 入力されたテキスト情報を取得
    const todoText = $('#todoText').val();
    // todoTextが空じゃなかったらタスクリストに追加
    if(todoText !== ""){
        taskList.push(todoText);
        localStorage.setItem('todoText', JSON.stringify(taskList));
        displayToDos();

    // 入力した文字を削除
    $('#todoText').val('');
    }
});

// Enterキーを押しても追加
$('#todoText').on('keydown', function (event) {
    if (event.key === 'Enter') {
        // Enterキーが押されたときの処理
        const todoText = $('#todoText').val();
        if (todoText !== "") {
            taskList.push(todoText);
            localStorage.setItem('todoText', JSON.stringify(taskList));
            displayToDos();
            $('#todoText').val('');
        }
    }
});


// 全削除ボタン押したとき
$('#deleteTodoBtn').on('click',function(){
    // localStorageのデータを全部削除
    localStorage.clear();    
    // 画面上のタスク情報を全部削除　指定した場所の中身をからっぽに
    $('#todoList').empty();
// 配列の中身を空にする
    taskList = [];
    $('#completedList').empty();
    completedList = [];
});
