document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    const servicesBtn = document.getElementById('services-btn');
    const infoBtn = document.getElementById('info-btn');
    const homeSection = document.getElementById('home-section');
    const servicesSection = document.getElementById('services-section');
    const infoSection = document.getElementById('info-section');
    const servicesList = document.getElementById('services-list');
    const requestForm = document.getElementById('request-form');
    const serviceSelect = document.getElementById('service-select');

    // Navigation
    homeBtn.addEventListener('click', () => showSection(homeSection));
    servicesBtn.addEventListener('click', () => {
        showSection(servicesSection);
        loadServices();
    });
    infoBtn.addEventListener('click', () => showSection(infoSection));

    function showSection(section) {
        [homeSection, servicesSection, infoSection].forEach(s => s.style.display = 'none');
        section.style.display = 'block';
    }

    // Load services from API
    function loadServices() {
        fetch('/api/services')
            .then(response => response.json())
            .then(data => {
                servicesList.innerHTML = '';
                serviceSelect.innerHTML = '';
                data.forEach(service => {
                    servicesList.innerHTML += `<div><h4>${service.name}</h4><p>${service.description}</p><button onclick="showForm(${service.id}, '${service.name}')">Request</button></div>`;
                    const option = document.createElement('option');
                    option.value = service.name;
                    option.textContent = service.name;
                    serviceSelect.appendChild(option);
                });
            });
    }

    // Show form for request
    window.showForm = function(id, name) {
        serviceSelect.value = name;
        requestForm.style.display = 'block';
    };

    // Handle form submission
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const service = serviceSelect.value;
        const name = document.getElementById('name').value;
        const details = document.getElementById('details').value;

        fetch('/api/submit-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ service, name, details })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            requestForm.reset();
            requestForm.style.display = 'none';
        })
        .catch(error => alert('Error submitting request'));
    });
});
