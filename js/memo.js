async function loadMemo() {
    const container = document.getElementById('memo-container');
    container.innerHTML = '<div class="p-6 text-center text-slate-500">Загрузка памятки...</div>';

    try {
        const response = await fetch(`${SCRIPT_URL}?sheet=Памятка`);
        const data = await response.json();

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="p-6 text-center text-slate-500">Памятка пуста</div>';
            return;
        }

        container.innerHTML = data.map(item => `
            <div class="glass-panel p-4 rounded-xl border border-slate-800 space-y-1">
                <h4 class="font-bold text-blue-400 text-sm">${item.title || 'Правило / Раздел'}</h4>
                <p class="text-xs text-slate-300 leading-relaxed">${item.content || item.text || ''}</p>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = '<div class="p-6 text-center text-red-400">Ошибка загрузки памятки</div>';
    }
}
