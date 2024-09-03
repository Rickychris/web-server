console.log('Client side javascript file is loaded');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const search = document.querySelector('input').value
    document.querySelector('input').value = ''
    document.querySelector('div#weather').textContent = 'Loading...'
    fetch('/weather?address=' + search).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('div#weather').textContent = data.error
                document.querySelector('div#location').textContent = ''
            } else {
                document.querySelector('div#weather').textContent = data.forecast
                document.querySelector('div#location').textContent = data.location
            }
        })
    })
})