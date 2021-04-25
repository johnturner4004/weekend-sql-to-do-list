$(document).ready(onReady);

function onReady() {
  console.log('JQ');
  getTask();
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
  let description = '';
  if (array[0].task_description) {
    description = array[0].task_description;
  }
  $('.next-task').replaceWith(`
  <div class="glass next-task col-10">
  <h2>${array[0].task_name}</h2>
  <p>${description}</p>
  </div>
  `);
  for(let i = 1; i < array.length; i++) {
    $('.list').append(`
      <div class="glass task col-12">
        <h2>${array[i].task_name}</h2>
      </div>
    `)
  }
}