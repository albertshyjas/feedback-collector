const url = 'http://localhost:5000';
const form = document.getElementById('fForm');
const list = document.getElementById('fList');

// Run this function immediately when the webpage finishes loading on screen
document.addEventListener('DOMContentLoaded', load);

// Form submission processor to add a new feedback entry
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('msg').value;

    try {
        // Send inputs out via HTTP POST request to backend API server
        await fetch(`${url}/addFeedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message })
        });
        form.reset();
        load(); // Refresh display cards panel
    } catch (err) {
        alert('Cannot send data. Make sure your server terminal is running!');
    }
});

// Load entries function to retrieve data records from the API server
async function load() {
    try {
        const r = await fetch(`${url}/feedbacks`);
        const d = await r.json();
        list.innerHTML = d.length === 0 ? '<p class="no-feedback">No feedback yet.</p>' : '';
        
        d.forEach(f => {
            const c = document.createElement('div');
            c.className = 'card';
            c.innerHTML = `
                <h4>${f.name}</h4>
                <p>${f.message}</p>
                <button class="del-btn" onclick="del('${f._id}')">Delete</button>
            `;
            list.appendChild(c);
        });
    } catch (err) {
        console.error('Connection to backend failed:', err);
    }
}

// Target removal function requested on clicking the delete item button
async function del(id) {
    if (confirm('Delete this feedback?')) {
        try {
            await fetch(`${url}/feedback/${id}`, { method: 'DELETE' });
            load(); // Reload feedback interface lists elements layout panel
        } catch (err) {
            console.error('Error executing delete routine:', err);
        }
    }
}