// Загрузка всех данных при старте
document.addEventListener('DOMContentLoaded', () => {
    loadTab('Личный состав', renderEmployees);
});

// Управлением переключением вкладок
async function switchTab(tabName, event) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'border-blue-500', 'text-blue-400'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    if (event) {
        event.target.classList.add('active', 'border-blue-500', 'text-blue-400');
    }

    const tabMap = {
        'employees': { name: 'Личный состав', render: renderEmployees },
        'reexamination': { name: 'Переаттестация', render: renderReexam },
        'top': { name: 'Лучшие сотрудники', render: renderTop },
        'weekly': { name: 'Еженедельная отчётность', render: renderWeekly },
        'stats': { name: 'Статистика', render: renderStats },
        'memo': { name: 'Памятка', render: null },
        'limits': { name: 'Штатные лимиты', render: renderLimits }
    };

    const target = tabMap[tabName];
    if (target) {
        document.getElementById(`tab-${tabName}`).classList.add('active');
        if (target.render) {
            await loadTab(target.name, target.render);
        }
    }
}

// Запрос данных с Apps Script
async function loadTab(sheetName, renderFn) {
    try {
        const response = await fetch(`${CONFIG.GAS_URL}?sheet=${encodeURIComponent(sheetName)}`);
        const data = await response.json();
        renderFn(data);
    } catch (err) {
        console.error(`Ошибка загрузки листа ${sheetName}:`, err);
    }
}

// Рендер Личного состава
function renderEmployees(data) {
    const tbody = document.getElementById('employees-tbody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/40">
            <td class="p-3 font-mono text-slate-400">${item.row_num}</td>
            <td class="p-3 font-bold text-white">${item.full_name}</td>
            <td class="p-3 font-mono text-blue-400">${item.static_uid}</td>
            <td class="p-3 text-slate-300">${item.position}</td>
            <td class="p-3 text-slate-300">${item.rank}</td>
            <td class="p-3 text-slate-400">${item.category}</td>
            <td class="p-3 text-red-400 font-bold">${item.reprimands}</td>
            <td class="p-3 text-yellow-400 font-bold">${item.warnings}</td>
            <td class="p-3 text-slate-300">${item.discord}</td>
            <td class="p-3 text-slate-400">${item.ic_leave}</td>
            <td class="p-3 text-slate-400">${item.ooc_leave}</td>
            <td class="p-3 font-semibold ${item.activity === 'Активен' ? 'text-green-400' : 'text-slate-500'}">${item.activity}</td>
            <td class="p-3 text-slate-300">${item.weekly_report}</td>
            <td class="p-3 font-bold text-blue-400">${item.points}</td>
            <td class="p-3 text-right">
                <button class="text-xs text-blue-400 hover:underline">Редактировать</button>
            </td>
        </tr>
    `).join('');
}

// Рендер Переаттестации
function renderReexam(data) {
    const tbody = document.getElementById('reexam-tbody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/40">
            <td class="p-3.5 font-mono text-slate-400">${item.row_num}</td>
            <td class="p-3.5 font-bold text-white">${item.full_name}</td>
            <td class="p-3.5 font-mono text-blue-400">${item.static_uid}</td>
            <td class="p-3.5 text-slate-300">${item.position}</td>
            <td class="p-3.5 text-slate-400">${item.date}</td>
            <td class="p-3.5 font-semibold ${item.result === 'Сдал' ? 'text-green-400' : 'text-red-400'}">${item.result}</td>
            <td class="p-3.5 font-bold text-blue-400">${item.points}</td>
            <td class="p-3.5 text-slate-400">${item.note}</td>
            <td class="p-3.5 text-right">
                <button class="text-xs text-blue-400 hover:underline">Изменить</button>
            </td>
        </tr>
    `).join('');
}

// Рендер Еженедельной отчётности
function renderWeekly(data) {
    const tbody = document.getElementById('weekly-tbody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/40">
            <td class="p-3.5 font-mono text-slate-400">${item.row_num}</td>
            <td class="p-3.5 font-bold text-white">${item.full_name}</td>
            <td class="p-3.5 font-mono text-blue-400">${item.static_uid}</td>
            <td class="p-3.5 text-slate-300">${item.week}</td>
            <td class="p-3.5 font-bold text-blue-400">${item.points}</td>
            <td class="p-3.5 text-slate-300">${item.report}</td>
            <td class="p-3.5 text-slate-400">${item.ic_leave}</td>
            <td class="p-3.5 text-slate-400">${item.ooc_leave}</td>
            <td class="p-3.5 font-semibold ${item.online === 'Да' ? 'text-green-400' : 'text-slate-500'}">${item.online}</td>
            <td class="p-3.5 font-bold text-slate-200">${item.total}</td>
        </tr>
    `).join('');
}

// Рендер Лучших сотрудников
function renderTop(data) {
    const tbody = document.getElementById('top-tbody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/40">
            <td class="p-3.5 font-bold text-yellow-400">#${item.place}</td>
            <td class="p-3.5 font-bold text-white">${item.full_name}</td>
            <td class="p-3.5 font-mono text-blue-400">${item.static_uid}</td>
            <td class="p-3.5 text-slate-300">${item.position}</td>
            <td class="p-3.5 font-bold text-blue-400">${item.points}</td>
            <td class="p-3.5 text-slate-300">${item.tasks_completed}</td>
            <td class="p-3.5 text-slate-400">${item.activity}</td>
            <td class="p-3.5 font-bold text-green-400">${item.total}</td>
        </tr>
    `).join('');
}

// Рендер Статистики
function renderStats(data) {
    const tbody = document.getElementById('stats-tbody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/40">
            <td class="p-3.5 font-medium text-slate-300">${item.metric}</td>
            <td class="p-3.5 font-bold text-blue-400 text-right">${item.value}</td>
        </tr>
    `).join('');
}

// Рендер Штатных лимитов
function renderLimits(data) {
    const tbody = document.getElementById('limits-tbody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr class="hover:bg-slate-800/40">
            <td class="p-3.5 font-bold text-white">${item.role_position}</td>
            <td class="p-3.5 text-center text-slate-300 font-mono">${item.max_limit}</td>
            <td class="p-3.5 text-center text-yellow-400 font-mono font-bold">${item.occupied}</td>
            <td class="p-3.5 text-center text-green-400 font-mono font-bold">${item.vacant}</td>
        </tr>
    `).join('');
}
