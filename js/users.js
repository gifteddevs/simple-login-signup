window.addEventListener('load', function() {
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    } else {
        // Show the content
        const loaderContainer = document.querySelector('.loader-container');
        const contentContainer = document.querySelector('.content-container');

        loaderContainer.style.display = 'flex';

        setTimeout(function() {
            loaderContainer.remove();
            contentContainer.style.display = 'block';
        }, 3000);
    }
});