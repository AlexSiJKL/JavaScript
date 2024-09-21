//v.02 Add a "click" for change default sorting asc

document.addEventListener("DOMContentLoaded", function() {
    const nameHeader = document.querySelector('.table_th[data-type="name"]');
    if (nameHeader) {
        nameHeader.classList.remove('not_active');
        nameHeader.classList.add('active_asc');
        sortTable('name', 'asc');
    }
});

//v.01

const table_th = document.querySelectorAll('.table_th');
const table = document.querySelector('.table');

// Click on th
table_th.forEach((th) => {
    th.addEventListener('click', () => {
        // Other th class remove
        table_th.forEach((other_table_th) => {
            if (other_table_th !== th) {
                other_table_th.classList.remove('active_asc', 'active_desc');
                other_table_th.classList.add('not_active');
            }
        });

        // Active th class swich
        if (th.classList.contains('not_active')) {
            th.classList.remove('not_active');
            th.classList.add('active_asc');
            sortTable(th.dataset.type, 'asc');
        } else if (th.classList.contains('active_asc')) {
            th.classList.remove('active_asc');
            th.classList.add('active_desc');
            sortTable(th.dataset.type, 'desc');
        } else {
            th.classList.remove('active_desc');
            th.classList.add('active_asc');
            sortTable(th.dataset.type, 'asc');
        }
    });
});

// sorting
function sortTable(type, order) {
    // Array
    const names = Array.from(document.querySelectorAll('.table_td_name'));
    const points = Array.from(document.querySelectorAll('.table_td_points'));

    const data = [];
    for (let i = 0; i < names.length; i++) {
        data.push({
            name: names[i].textContent,
            points: parseInt(points[i].textContent, 10), // parse INT 10 decimal
            nameElem: names[i],   // save element`s link to array
            pointsElem: points[i] // save element`s link to array
        });
    }

    // data sorting
    data.sort((a, b) => {
        if (type === 'name') {
            return order === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (type === 'points') {
            return order === 'asc'
                ? a.points - b.points
                : b.points - a.points;
        }
        return 0;
    });

    // saving th
    const headers = Array.from(document.querySelectorAll('.table_th'));

    // table erasing
    table.innerHTML = '';

    // add th
    headers.forEach(header => table.appendChild(header));

    // DOM rebuild
    data.forEach(item => {
        table.appendChild(item.nameElem);
        table.appendChild(item.pointsElem);
    });
}