$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTask();
  $('.list').on('click', '.completeBtn', complete);
  $('.list').on('click', '.deleteBtn', deleteTask);
  $('.next-task').on('click', '.completeBtn', complete);
  $('.next-task').on('click', '.deleteBtn', deleteTask);
  $('#addButton').on('click', addTask);
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
  $('.next-task').empty()
  let nextTask = '';
  let numberNext = 0;
  while (nextTask === '' && numberNext < array.length) {
    console.log('in the loop');
    
    if (array[numberNext].completed !== true) {
      nextTask = array[numberNext];
    } else {
      numberNext++;
    }
  }
  console.log('next number', numberNext);
  
  $('.list').empty();
  for (let i = 0; i < array.length; i++) {
    let classString = '';
    if (array[i].completed) {
      classString = "glass task row container complete";
    } else {
      classString = "glass task row container";
    }
    let locationString = '';
    if (i === numberNext) {
      locationString = '.next-task'
      classString = "task container row"
    } else {
      locationString = '.list'
    }
    let description = '';
    if (array[i].description !== null) {
      description = array[i].description;
    }
    $(locationString).append(`
      <li class="${classString}">
        <div class="text col-10">
          <h2>${array[i].task_name}</h2>
          <p>${description}</p>
        </div>
        <div class="button col-2">
          <p><button class="completeBtn" data-id="${array[i].id}">√</button>
          Delete: <button aria-label="Close" class="btn-close" class="deleteBtn" data-id="${array[i].id}"></button></p>
        </div>
      </li>
    `)
  }
}

function addTask() {
  console.log('add click');
  let new_task = {
    task_name: $('#task_name').val(),
    due_date: $('#due_date').val(),
    description: $('#description').val(),
  };
  console.log(new_task);
  $.ajax({
      method: 'POST',
      url: '/task',
      data: new_task
    })
    .then(response => {
      console.log(`Added ${new_task} to task list`, response);
      $('#task_name').val('');
      $('#due_date').val('');
      $('#description').val('');
      $('#addTaskModal').modal('toggle')
      getTask()
    })
    .catch(error => {
      console.log(`Unable to add task ${new_task}`, error);
      alert('Unable to add new task');
    });
}

function complete() {
  console.log('Complete click');
  let completeId = $(this).data("id");
  console.log(completeId);
  $.ajax({
      method: 'PUT',
      url: `/task/${completeId}`,
      data: {complete: 'true'}
    })
    .then(response => {
      console.log('Marked task as complete', response);
      getTask();
    })
    .catch(error => {
      console.log('Unable to mark task as complete', error);
      alert('Unable to mark task as complete');
    });
}

function deleteTask() {
  console.log('Delete click');
  let deleteId = $(this).data("id");
  console.log(deleteId);
  $.ajax({
      method: 'DELETE',
      url: `/task/${deleteId}`
    })
    .then(response => {
      console.log('Deleted a task', response);
      getTask();
    })
    .catch(error => {
      console.log('Unable to delete task', error);
      alert('Unable to delete task');
    })
}