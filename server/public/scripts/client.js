$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTask();
  $('.list').on('click', '.completeBtn', complete);
  $('#new').on('click', addTask);
}

function getTask() {
  $.ajax({
      method: 'GET',
      url: '/task'
    })
    .then(response => {
      console.log('Here\'s your to-do list', response);
      render(response);
    })
    .catch(error => {
      console.log('Unable to get task list from server', error);
      alert('Unable to retrieve to do list from server');
    });
  console.log('Finished running getTask');
}

function render(array) {
  $('.list').empty();
  for (let i = 0; i < array.length; i++) {
    $('.list').append(`
      <li class="glass task row container">
        <div class="text" col-10">
          <h2>${array[i].task_name}</h2>
        </div>
        <div class="button col-2">
          <button class="completeBtn" data-id="${array[i].id}">√</button>
          <button class="deleteBtn data-id="${array[i].id}">X</button>
        </div>
      </li>
    `)
  }
}

function addTask() {
  console.log('add click');
  let new_task = {task_name: $('#task_name').val()};
  console.log(new_task);
  $.ajax({
    method: 'POST',
    url: '/task',
    data: new_task
  })
  .then(response => {
    console.log(`Added ${new_task} to task list`, response);
    $('#task_name').val('');
    getTask()
  })
  .catch(error => {
    console.log(`Unable to add task ${new_task}`, error);
    alert('Unable to add new task');
  });
}

function complete() {
  console.log('Complete click');
  id = $(this).data("id");
  console.log(id);

  $.ajax({
      method: 'PUT',
      url: `./task/${id}`,
      data: {
        complete: id
      }
    })
    .then(response => {
      console.log('Marked task as complete', response);
    })
    .catch(error => {
      console.log('Unable to mark task as complete', error);
      alert('Unable to mark task as complete');
    });
}