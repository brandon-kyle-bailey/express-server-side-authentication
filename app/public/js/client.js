function submitData(e) {
    e.preventDefault();
    let formData = new FormData(form);

    let params = {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email')
        }),
        method: 'POST'
    };

    fetch('http://localhost:8080/submit', params)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}


let form = document.querySelector('.validation-form');

form.onsubmit = submitData;