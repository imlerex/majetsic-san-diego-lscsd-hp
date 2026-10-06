async function loadLimits() {
    const tbody = document.getElementById('limits-tbody');
    tbody.innerHTML = '<tr><td colspan="4" class="p-6 text-center text-slate-500">Загрузка штатных лимитов...</td></tr>';
    
    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=Штатные лимиты`);
        const data = await response.json();

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="p-6 text-center text-slate-500">Записи не найдены</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(row => `
            <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3.5 font-semibold text-white">${row.rank || row.position || ''}</td>
                <td class="p-3.5 text-slate-300">${row.max_limit || 0}</td>
                <td class="p-3.5 text-blue-400 font-bold">${row.current_count || 0}</td>
                <td class="p-3.5 text-emerald-400 font-bold">${row.free_slots || 0}</td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="4" class="p-6 text-center text-red-400">Ошибка загрузки</td></tr>';
    }
}
