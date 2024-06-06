document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'user.html';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
