// DASHBOARD COUNTS (index.html)
const contactCountEl = document.getElementById("contactCount");
const positionCountEl = document.getElementById("positionCount");

if (contactCountEl && positionCountEl) {
    const contacts = getContacts();

    // Contacts count
    contactCountEl.textContent = contacts.length;

    // Unique positions
    const uniquePositions = new Set(
        contacts.map(c => c.position).filter(p => p)
    );

    positionCountEl.textContent = uniquePositions.size;
}

// ADD NEW CONTACT (new-contact.html)
const form = document.getElementById("newContactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let contact = {
            id: document.getElementById("idNumber").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            gender: document.querySelector("input[name='gender']:checked").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            dob: document.getElementById("dob").value,
            position: document.getElementById("position").value
        };

        let contacts = getContacts();
        contacts.push(contact);
        saveContacts(contacts);

        alert("Contact Saved Successfully!");
        window.location.href = "view-contacts.html";
    });
}