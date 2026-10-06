async function loadTopEmployees() {
    const container = document.getElementById('top-employees-container');
    container.innerHTML = '<div class="p-6 text-center text-slate-500">Загрузка лучших сотрудников...</div>';

    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=Лучшие сотрудники`);
        const data = await response.json();

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="p-6 text-center text-slate-500">Список пуст</div>';
            return;
        }

        container.innerHTML = data.map((item, index) => `
            <div class="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <span class="text-lg font-bold ${index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : 'text-amber-700'}">#${index + 1}</span>
                    <div>
                        <div class="font-semibold text-white">${item.full_name || item.name || 'Сотрудник'}</div>
                        <div class="text-xs text-slate-400">${item.position || 'Должность'}</div>
                    </div>
                </div>
                <div class="text-emerald-400 font-bold">${item.points || 0} баллов</div>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<div class="p-6 text-center text-red-400">Ошибка загрузки</div>';
    }
}
