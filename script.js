(() => {
  'use strict';

  const STORAGE_KEY = 'cse122-kh-2551060706-customers-v1';
  const initialCustomers = [
    { id: 'KH-001', name: 'Công ty TNHH Ánh Dương', contact: 'Nguyễn Minh An', email: 'an@anhduong.vn', phone: '0901 234 567', tax: '0312345678', debt: 12500000, status: 'Đang hoạt động', address: 'Quận 1, TP. Hồ Chí Minh' },
    { id: 'KH-002', name: 'Công ty Cổ phần Minh Phát', contact: 'Trần Gia Huy', email: 'huy@minhphat.vn', phone: '0912 345 678', tax: '0318765432', debt: 0, status: 'Đang hoạt động', address: 'Quận 3, TP. Hồ Chí Minh' },
    { id: 'KH-003', name: 'Hộ kinh doanh Sao Mai', contact: 'Lê Thu Hà', email: 'ha@saomai.vn', phone: '0987 654 321', tax: '8543210987', debt: 7800000, status: 'Cần theo dõi', address: 'Thủ Đức, TP. Hồ Chí Minh' }
  ];
  const $ = (selector) => document.querySelector(selector);
  const form = $('#customer-form');
  const dialog = $('#customer-dialog');
  const money = (value) => `${new Intl.NumberFormat('vi-VN').format(value || 0)} ₫`;
  let customers = loadCustomers();
  let noticeTimer;

  function loadCustomers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === null ? initialCustomers : JSON.parse(saved);
    } catch {
      return initialCustomers;
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function render() {
    const query = $('#search').value.trim().toLocaleLowerCase('vi');
    const status = $('#status-filter').value;
    const shown = customers.filter((customer) => [customer.name, customer.contact, customer.email, customer.phone, customer.tax].join(' ').toLocaleLowerCase('vi').includes(query) && (status === 'all' || customer.status === status));
    $('#total-count').textContent = customers.length;
    $('#active-count').textContent = customers.filter((customer) => customer.status === 'Đang hoạt động').length;
    $('#total-debt').textContent = money(customers.reduce((sum, customer) => sum + Number(customer.debt || 0), 0));
    $('#result-count').textContent = `${shown.length} khách hàng${query ? ' phù hợp' : ''}`;
    $('#empty-state').hidden = shown.length > 0;
    $('#customer-rows').innerHTML = shown.map((customer) => {
      const initials = customer.name.trim().split(/\s+/).slice(-2).map((part) => part[0]).join('').toLocaleUpperCase('vi');
      const badgeClass = customer.status === 'Đang hoạt động' ? '' : customer.status === 'Cần theo dõi' ? ' follow' : ' inactive';
      return `<tr>
        <td><div class="customer-cell"><span class="avatar">${escapeHtml(initials)}</span><span><strong>${escapeHtml(customer.name)}</strong><small>${escapeHtml(customer.id)}</small></span></div></td>
        <td>${escapeHtml(customer.contact || '—')}</td><td>${escapeHtml(customer.email || '—')}</td><td>${escapeHtml(customer.phone || '—')}</td>
        <td class="money">${money(Number(customer.debt))}</td><td><span class="badge${badgeClass}">${escapeHtml(customer.status)}</span></td>
        <td><div class="row-actions"><button type="button" data-edit="${escapeHtml(customer.id)}" aria-label="Sửa ${escapeHtml(customer.name)}">Sửa</button><button class="delete" type="button" data-delete="${escapeHtml(customer.id)}" aria-label="Xóa ${escapeHtml(customer.name)}">Xóa</button></div></td>
      </tr>`;
    }).join('');
  }

  function announce(message) {
    $('#notice').textContent = message;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => { $('#notice').textContent = ''; }, 3500);
  }

  function openForm(customer) {
    form.reset();
    $('#form-error').textContent = '';
    $('#customer-id').value = customer?.id || '';
    $('#dialog-title').textContent = customer ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng';
    if (customer) {
      for (const key of ['name', 'contact', 'email', 'phone', 'tax', 'debt', 'status', 'address']) form.elements[key].value = customer[key] ?? '';
    } else {
      form.elements.debt.value = '0';
      form.elements.status.value = 'Đang hoạt động';
    }
    dialog.showModal();
    form.elements.name.focus();
  }

  $('#add-customer').addEventListener('click', () => openForm());
  $('#empty-add').addEventListener('click', () => openForm());
  $('#close-dialog').addEventListener('click', () => dialog.close());
  $('#cancel-dialog').addEventListener('click', () => dialog.close());
  $('#search').addEventListener('input', render);
  $('#status-filter').addEventListener('change', render);

  $('#customer-rows').addEventListener('click', (event) => {
    const editId = event.target.closest('[data-edit]')?.dataset.edit;
    const deleteId = event.target.closest('[data-delete]')?.dataset.delete;
    if (editId) {
      const customer = customers.find((item) => item.id === editId);
      if (customer) openForm(customer);
    }
    if (deleteId) {
      const customer = customers.find((item) => item.id === deleteId);
      if (!customer || !window.confirm(`Xóa khách hàng “${customer.name}” khỏi danh sách trên thiết bị này?`)) return;
      customers = customers.filter((item) => item.id !== deleteId);
      persist();
      render();
      announce('Đã xóa khách hàng.');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const id = $('#customer-id').value;
    const rawDebt = String(data.get('debt') || '0').replace(/[^\d-]/g, '');
    const debt = Number(rawDebt);
    if (!Number.isFinite(debt) || debt < 0) {
      $('#form-error').textContent = 'Công nợ phải là số không âm.';
      return;
    }
    const customer = {
      id: id || `KH-${String(Date.now()).slice(-7)}`,
      name: String(data.get('name')).trim(), contact: String(data.get('contact')).trim(),
      email: String(data.get('email')).trim(), phone: String(data.get('phone')).trim(),
      tax: String(data.get('tax')).trim(), debt, status: String(data.get('status')),
      address: String(data.get('address')).trim()
    };
    if (id) customers = customers.map((item) => item.id === id ? customer : item);
    else customers.unshift(customer);
    persist();
    dialog.close();
    render();
    announce(id ? 'Đã cập nhật thông tin khách hàng.' : 'Đã thêm khách hàng.');
  });

  render();
})();
