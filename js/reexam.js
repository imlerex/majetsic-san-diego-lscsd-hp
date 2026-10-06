async function loadReexam() {
    const tbody = document.getElementById('reexam-tbody');
    tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-500">Загрузка данных о переаттестациях...</td></tr>';
    
    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=Переаттестация`);
        const data = await response.json();

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-slate-500">Записи не найдены</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(row => `
            <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3.5 text-slate-400 font-mono text-xs">${row.row_num || ''}</td>
                <td class="p-3.5 font-semibold text-white">${row.full_name || ''}</td>
                <td class="p-3.5 text-slate-400 font-mono text-xs">${row.static_uid || ''}</td>
                <td class="p-3.5 text-slate-300">${row.position || ''}</td>
                <td class="p-3.5 text-slate-300">${row.exam_date || ''}</td>
                <td class="p-3.5"><span class="${row.result === 'Сдал' ? 'text-emerald-400' : 'text-red-400'} font-semibold">${row.result || ''}</span></td>
                <td class="p-3.5 text-slate-300">${row.points || 0}</td>
                <td class="p-3.5 text-slate-400">${row.note || ''}</td>
            </tr>
        `).join('');
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-red-400">Ошибка загрузки</td></tr>';
    }
}
