function isHeadOrAss() {
    if (!currentUser) return false;
    const role = (currentUser.role || '').toLowerCase().trim();
    return role === 'head' || role === 'ass';
}

async function hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;
    const errDiv = document.getElementById('login-error');
    errDiv.classList.add('hidden');

    const passHash = await hashPassword(pass);

    const { data, error } = await supabaseClient
        .from('app_users')
        .select('*')
        .eq('username', user)
        .eq('password_hash', passHash)
        .single();

    if (error || !data) {
        errDiv.textContent = 'Неверный логин или пароль!';
        errDiv.classList.remove('hidden');
        return;
    }

    currentUser = data;
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('user-badge').textContent = `${currentUser.username} (${currentUser.role || 'Сотрудник'})`;

    loadEmployees();
}

function handleLogout() {
    currentUser = null;
    document.getElementById('app-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('login-form').reset();
}
