const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYSO5D_VrrpDPY5AsEG-xNif7jeekD6wzWJHaI6ZqRs6ynJqp-Xb1yMmwNTpj49Zr7/exec';
const SUPABASE_URL = 'https://cagrtftmurazuyerbnrr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZ3J0ZnRtdXJhenV5ZXJibnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODcxMzcsImV4cCI6MjEwNjg2MzEzN30.YY4nuE4PXJTcwwFhQaBZc1gTdPh14yn-FqY9l_xloP0';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let loadedEmployeesData = [];
