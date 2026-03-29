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

// LOAD CONTACTS FROM STORAGE
function getContacts() {
    return JSON.parse(localStorage.getItem("contacts")) || [];
}

function saveContacts(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// VIEW CONTACTS (view-contacts.html)
const table = document.getElementById("contactsTable");

if (table) {
    let contacts = getContacts();
    const searchInput = document.getElementById("searchInput");

    function displayContacts(filteredContacts = contacts) {
        table.innerHTML = `
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Tools</th>
                </tr>
            </thead>
        `;

        if (filteredContacts.length === 0) {
            table.innerHTML += "<tr><td colspan='5'>No contacts found</td></tr>";
            return;
        }

        filteredContacts.forEach((contact, index) => {
            let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.firstName} ${contact.lastName}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="btn btn-details" onclick="viewDetails('${contact.id}')">Details</button>
                    <button class="btn btn-edit" onclick="editContact('${contact.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteContact('${contact.id}')">Delete</button>
                </td>
            </tr>
            `;
            table.innerHTML += row;
        });
    }

    // SEARCH FUNCTION
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            let searchValue = searchInput.value.toLowerCase();

            let filteredContacts = contacts.filter(contact =>
                (`${contact.firstName} ${contact.lastName}`).toLowerCase().includes(searchValue) ||
                contact.phone.toLowerCase().includes(searchValue) ||
                contact.email.toLowerCase().includes(searchValue) ||
                contact.position.toLowerCase().includes(searchValue)
            );

            displayContacts(filteredContacts);
        });
    }

    // BUTTON FUNCTIONS
    window.viewDetails = function (id) {
        let c = contacts.find(contact => contact.id === id);

        alert(
            "ID: " + c.id +
            "\nName: " + c.firstName + " " + c.lastName +
            "\nGender: " + c.gender +
            "\nPhone: " + c.phone +
            "\nEmail: " + c.email +
            "\nAddress: " + c.address +
            "\nDOB: " + c.dob +
            "\nPosition: " + c.position
        );
    };

    window.deleteContact = function (id) {
        if (confirm("Are you sure you want to delete?")) {
            contacts = contacts.filter(contact => contact.id !== id);
            saveContacts(contacts);
            displayContacts();
        }
    };

    window.editContact = function (id) {
        let c = contacts.find(contact => contact.id === id);
        let index = contacts.findIndex(contact => contact.id === id);

        let newFirst = prompt("Edit First Name:", c.firstName);
        let newLast = prompt("Edit Last Name:", c.lastName);
        let newPhone = prompt("Edit Phone:", c.phone);
        let newEmail = prompt("Edit Email:", c.email);

        if (newFirst && newPhone && newEmail) {
            contacts[index].firstName = newFirst;
            contacts[index].lastName = newLast;
            contacts[index].phone = newPhone;
            contacts[index].email = newEmail;

            saveContacts(contacts);
            displayContacts();
        }
    };

    displayContacts();
}