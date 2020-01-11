function submitData(e) {
    e.preventDefault();

    const formData = new FormData(form);

    const params = {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            postcode: formData.get('postcode')
        }),
        method: 'POST'
    };

    fetch('http://localhost:8080/submit/user', params)
        .then(res => res.json())
        .then(data => {

            if (data.errors) {
                document.querySelector('.error-container').style.display = 'block';
                const error = document.querySelector('.error');

                error.innerHTML = data.errors.map(error => {
                    return `<li>${error.msg}</li>`
                }).join('');
            } else {
                document.querySelector('.error-container').style.display = 'none';
                console.log({ "Success": data });
            }

        })
        .catch(err => console.log(err))
};

let form = document.querySelector('.validation-form');
form.addEventListener('submit', submitData);