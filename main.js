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

    function displayContacts() {
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

        if (contacts.length === 0) {
            table.innerHTML += "<tr><td colspan='5'>No contacts found</td></tr>";
            return;
        }

        contacts.forEach((contact, index) => {
            let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.firstName} ${contact.lastName}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <button class="btn btn-details" onclick="viewDetails(${index})">Details</button>
                    <button class="btn btn-edit" onclick="editContact(${index})">Edit</button>
                    <button class="btn btn-delete" onclick="deleteContact(${index})">Delete</button>
                </td>
            </tr>
            `;
            table.innerHTML += row;
        });
    }

    // BUTTON FUNCTIONS
    window.viewDetails = function (index) {
        let c = contacts[index];

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

    window.deleteContact = function (index) {
        if (confirm("Are you sure you want to delete?")) {
            contacts.splice(index, 1);
            saveContacts(contacts);
            displayContacts();
        }
    };

    window.editContact = function (index) {
        let c = contacts[index];

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