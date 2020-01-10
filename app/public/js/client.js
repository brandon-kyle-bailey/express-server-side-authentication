function submitData(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const params = {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: formData.get('name'), email: formData.get('email') }),
        method: 'POST'
    };

    fetch('http://localhost:8080/submit/user', params)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
};

let form = document.querySelector('.validation-form');
form.addEventListener('submit', submitData);