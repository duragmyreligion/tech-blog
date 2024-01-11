// const emojifyText = require('../../utils/helpers')
// const emoji = require('node-emoji')


const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#forum-title').value.trim();
    const name = document.querySelector('#forum-game').value.trim();
    const description = document.querySelector('#forum-desc').value.trim();

    // emojifyText(title, name, description, comments)
    
    if (title && name && description) {
      const response = await fetch('/api/forums/', {
        method: 'POST',
        body: JSON.stringify({title, name, description}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create forum post');
      }
    }
  };

  

document
    .querySelector('.new-forum-form')
    .addEventListener('submit', newFormHandler);