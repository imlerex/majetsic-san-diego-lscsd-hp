async function loadStats() {
    const container = document.getElementById('stats-container');
    container.innerHTML = '<div class="p-6 text-center text-slate-500">Загрузка статистики...</div>';

    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=Статистика`);
        const data = await response.json();

        if (!data) {
            container.innerHTML = '<div class="p-6 text-center text-slate-500">Данные отсутствуют</div>';
            return;
        }

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="glass-panel p-4 rounded-xl border border-slate-800">
                    <div class="text-xs text-slate-400">Всего сотрудников</div>
                    <div class="text-2xl font-bold text-white mt-1">${data.total_employees || 0}</div>
                </div>
                <div class="glass-panel p-4 rounded-xl border border-slate-800">
                    <div class="text-xs text-slate-400">В отпусках</div>
                    <div class="text-2xl font-bold text-amber-400 mt-1">${data.on_leave || 0}</div>
                </div>
                <div class="glass-panel p-4 rounded-xl border border-slate-800">
                    <div class="text-xs text-slate-400">Выговоров выписано</div>
                    <div class="text-2xl font-bold text-red-400 mt-1">${data.reprimands_count || 0}</div>
                </div>
            </div>
        `;
    } catch (err) {
        container.innerHTML = '<div class="p-6 text-center text-red-400">Ошибка загрузки статистики</div>';
    }
}
