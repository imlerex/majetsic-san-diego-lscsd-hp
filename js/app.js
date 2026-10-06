function switchTab(tabName, event) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-500', 'text-blue-400', 'border-purple-500', 'text-purple-400');
        btn.classList.add('border-transparent', 'text-slate-400');
    });

    const targetContent = document.getElementById(`tab-${tabName}`);
    if (targetContent) targetContent.classList.add('active');
    
    const targetBtn = event ? event.currentTarget : document.querySelector(`[onclick*="switchTab('${tabName}')"]`);
    if (targetBtn) {
        targetBtn.classList.remove('border-transparent', 'text-slate-400');
        targetBtn.classList.add(tabName === 'admin' ? 'border-purple-500' : 'border-blue-500');
    }

    // Вызовы функций загрузки в зависимости от вкладки
    switch (tabName) {
        case 'employees': loadEmployees(); break;
        case 'reexamination': loadReexam(); break;
        case 'top': loadTopEmployees(); break;
        case 'weekly': loadWeekly(); break;
        case 'stats': loadStats(); break;
        case 'memo': loadMemo(); break;
        case 'limits': loadLimits(); break;
    }
}
