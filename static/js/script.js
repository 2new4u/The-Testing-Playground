document.addEventListener('DOMContentLoaded', () => {

    const submitBtn = document.getElementById('submit-btn');

    if (submitBtn) {
        submitBtn.removeAttribute('onclick');

        submitBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const inputField = document.getElementById('form-input').value;
            const checkInput = document.querySelector('input[name="form-check"]:checked');
            const check = checkInput ? checkInput.value : null;
            const isToggleChecked = document.getElementById('toggle-switch').checked;
            const experience = document.getElementById('experience-select').value;

            const formData = {
                inputField: inputField, check: check, toggle: isToggleChecked, experience: experience
            };

            try {
                const responseSubmit = await fetch('/api/submit', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify(formData)
                });
                const resultSubmit = await responseSubmit.json();
                console.log("Response:", resultSubmit);

                const fileInput = document.getElementById('file-upload');
                if (fileInput.files.length > 0) {
                    const fileData = new FormData();
                    fileData.append('file', fileInput.files[0]);

                    const responseUpload = await fetch('/api/upload', {
                        method: 'POST', body: fileData
                    });
                    const resultUpload = await responseUpload.json();
                    console.log("Response:", resultUpload);
                }

                alert(`Success!: ${resultSubmit.mensagem}`);

                document.getElementById('user-input').value = '';

            } catch (error) {
                console.error("Error:", error);
                alert("Error!");
            }
        });
    }
    setTimeout(() => {
        const zone = document.getElementById('delayed-zone');
        if (zone) {
            const btn = document.createElement('button');
            btn.id = 'ghost-button';
            btn.className = 'btn btn-danger btn-sm w-100 anim-fade-in';
            btn.innerText = 'I am here!';
            zone.appendChild(btn);
        }
    }, 5000);

    const loadBtn = document.getElementById('load-data-btn');
    const spinner = document.getElementById('spinner');
    const list = document.getElementById('server-list');

    if (loadBtn) {
        loadBtn.addEventListener('click', async () => {
            spinner.classList.remove('d-none');
            list.innerHTML = '';

            try {
                const res = await fetch('/api/slow-data');
                const data = await res.json();

                spinner.classList.add('d-none');
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item py-1 small';
                    li.innerText = item;
                    list.appendChild(li);
                });
            } catch (err) {
                spinner.classList.add('d-none');
                list.innerHTML = '<li class="list-group-item text-danger">Error loading data.</li>';
            }
        });
    }

    // --- 3. Drag and Drop ---
    const source = document.getElementById('drag-source');
    const target = document.getElementById('drop-target');

    if (source && target) {
        source.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', 'done'));
        target.addEventListener('dragover', (e) => e.preventDefault());
        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.innerText = "Success!";
            target.classList.replace('border-secondary', 'border-success');
            target.classList.replace('text-muted', 'text-success');
            target.classList.add('fw-bold');
        });
    }

    const host = document.querySelector('#shadow-host');
    if (host) {
        const root = host.attachShadow({mode: 'open'});
        root.innerHTML = `<button id="shadow-btn" style="background: #6c757d; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">Hidden in Shadow DOM</button>`;

        root.querySelector('#shadow-btn').addEventListener('click', function () {
            this.innerText = "Foud!";
            this.style.background = "#198754";
        });
    }

    const tableData = {
        1: [{id: 1, u: "Test A 1", r: "Test A 2", s: "Test A 3"}, {id: 2, u: "Test B 1", r: "Test B 2", s: "Test B 3"}],
        2: [{id: 3, u: "Test C 1", r: "Test C 2", s: "Test C 3"}, {id: 4, u: "Test D 1", r: "Test D 2", s: "Test D 3"}]
    };

    window.updateTable = (page) => {
        const tbody = document.getElementById('table-body');
        if (tbody) {
            tbody.innerHTML = tableData[page].map(row => `
                <tr><td>${row.id}</td><td>${row.u}</td><td>${row.r}</td><td>${row.s}</td></tr>
            `).join('');

            document.querySelectorAll('.page-item').forEach(el => el.classList.remove('active'));
            document.getElementById(`page-${page}`).classList.add('active');
        }
    };

    const pagination = document.getElementById('table-pagination');
    if (pagination) {
        pagination.innerHTML = `
            <li class="page-item" id="page-1"><a class="page-link" href="javascript:updateTable(1)">1</a></li>
            <li class="page-item" id="page-2"><a class="page-link" href="javascript:updateTable(2)">2</a></li>
        `;
        updateTable(1);
    }
});