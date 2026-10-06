async function loadEmployees() {
    const tbody = document.getElementById('employees-tbody');
    tbody.innerHTML = '<tr><td colspan="15" class="p-6 text-center text-slate-500">Загрузка личного состава...</td></tr>';
    
    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=Личный состав`);
        loadedEmployeesData = await response.json();

        if (!loadedEmployeesData || loadedEmployeesData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="15" class="p-6 text-center text-slate-500">Таблица пуста</td></tr>';
            return;
        }

        tbody.innerHTML = loadedEmployeesData.map(row => `
            <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3 text-slate-400 font-mono">${row.row_num || ''}</td>
                <td class="p-3 font-semibold text-white">${row.full_name || ''}</td>
                <td class="p-3 text-blue-400 font-mono">${row.static_uid || ''}</td>
                <td class="p-3 text-slate-300">${row.position || ''}</td>
                <td class="p-3 text-slate-300">${row.rank || ''}</td>
                <td class="p-3"><span class="bg-slate-800 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded">${row.category || ''}</span></td>
                <td class="p-3 text-red-400 font-bold">${row.reprimands || 0}</td>
                <td class="p-3 text-amber-400 font-bold">${row.warnings || 0}</td>
                <td class="p-3 text-slate-300">${row.discord || ''}</td>
                <td class="p-3 text-slate-300">${row.ic_leave || ''}</td>
                <td class="p-3 text-slate-300">${row.ooc_leave || ''}</td>
                <td class="p-3 text-slate-300">${row.activity || ''}</td>
                <td class="p-3 text-slate-300">${row.weekly_report || ''}</td>
                <td class="p-3 text-emerald-400 font-bold">${row.points || 0}</td>
                <td class="p-3 text-right">
                    <button onclick="openModal('update', ${row.rowIndex})" class="text-slate-400 hover:text-blue-400 p-1 transition">✏️</button>
                    <button onclick="handleDeleteEmployee(${row.rowIndex}, '${row.full_name}')" class="text-slate-400 hover:text-red-400 p-1 transition ml-1">🗑️</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="15" class="p-6 text-center text-red-400">Ошибка загрузки данных из Google Таблицы</td></tr>';
    }
}
