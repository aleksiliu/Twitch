const p = document.querySelector('p');
const ulOnline = document.querySelector('.online');
const ulOffline = document.querySelector('.offline');
const wrapper = document.querySelector('.wrapper');
const twitch = 'twitch.json';

fetch(twitch)
  .then(response => response.json())
  .then(data => {
    render(data);
  });

function render(data) {
  const offlineChannels = data.filter(user => user.stream === null) 
  const onlineChannels = data.filter(user => user.stream !== null && user.error !== 'Not Found')

  onlineChannels.forEach(channel => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.innerHTML = `<img src=${channel.stream.logo}> <a href="${channel.stream.url}">${channel.stream.display_name}</a> ${channel.stream.status}`;
    ulOnline.appendChild(li);
  })

  offlineChannels.forEach(channel => {
    const li = document.createElement('li');
    li.innerHTML = channel.display_name;
    ulOffline.appendChild(li);
  })
}

document.querySelector('.filter').addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'LI') {
      let elements = document.querySelector('.filter').children;
      for (let i = 0; i < elements.length; ++i) {
          elements[i].classList.remove('active');
      }
      e.target.classList.add('active');
   }
   if (e.target.outerText === 'Offline') {
      ulOnline.classList.add('hide');
      ulOffline.classList.remove('hide');
    } else if (e.target.outerText === 'Online') { 
      ulOffline.classList.add('hide');
      ulOnline.classList.remove('hide');
    } else if (e.target.outerText === "All") { 
      ulOffline.classList.remove('hide');
      ulOnline.classList.remove('hide');
      }
}, true);