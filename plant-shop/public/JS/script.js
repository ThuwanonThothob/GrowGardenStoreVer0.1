// ===============================================
//          SCRIPT.JS - เวอร์ชันสมบูรณ์สุด + ประวัติคำสั่งซื้อ
// ===============================================

// === ฐานข้อมูลสินค้า ===
const products = [
  { id: 1, name: "ต้นลาเวนเดอร์", price: 300, img: "https://images.unsplash.com/photo-1593486719159-3c6c2d7b8b6c?w=800", gallery: ["https://images.unsplash.com/photo-1593486719159-3c6c2d7b8b6c?w=800","https://images.unsplash.com/photo-1583258293977-93b1d1d6b0b6?w=800","https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?w=800"], desc: "หอมสดชื่น ช่วยผ่อนคลาย", benefit: "ลดความเครียด ช่วยให้นอนหลับดี ไล่แมลง", care: "รดน้ำ 2-3 วัน/ครั้ง ชอบแดดอ่อน ระบายน้ำดี", season: "ปลูกได้ตลอดปี", location: "ในร่ม หน้าต่าง ระเบียง", category: "ในร่ม" },
  { id: 2, name: "ช่อดอกไม้สวย", price: 500, img: "https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?w=800", gallery: ["https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?w=800","https://images.unsplash.com/photo-1587302164676-8e9c04d7e0b6?w=800","https://images.unsplash.com/photo-1593486719159-3c6c2d7b8b6c?w=800"], desc: "จัดดอกไม้สดใหม่ทุกวัน", benefit: "ตกแต่งบ้าน วันเกิด ของขวัญ", care: "เปลี่ยนน้ำทุกวัน ตัดก้านเฉียง", season: "ตลอดปี", location: "โต๊ะอาหาร ห้องนั่งเล่น", category: "ดอกไม้" },
  { id: 3, name: "ต้นมอนสเตอร่า", price: 350, img: "https://images.unsplash.com/photo-1593484713504-7d2ed0e1e7e2?w=800", gallery: ["https://images.unsplash.com/photo-1593484713504-7d2ed0e1e7e2?w=800","https://images.unsplash.com/photo-1600414833392-7a2e9a0d2b7a?w=800","https://images.unsplash.com/photo-1583258293977-93b1d1d6b0b6?w=800"], desc: "ทนทาน ดูแลง่าย", benefit: "ฟอกอากาศ ดูดสารพิษ", care: "รดน้ำเมื่อดินแห้ง ชอบแสงรำไร", season: "ในร่ม ตลอดปี", location: "มุมห้อง มุมโต๊ะทำงาน", category: "ในร่ม" },
  { id: 4, name: "ต้นไผ่นำโชค", price: 180, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", gallery: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800","https://images.unsplash.com/photo-1600585154525-2b5b2c2b2b2b?w=800","https://images.unsplash.com/photo-1600585154363-2b5b2c2b2b2b?w=800"], desc: "เรียกทรัพย์ ปลูกในบ้านได้", benefit: "เสริมโชคลาภ ฮวงจุ้ย", care: "เปลี่ยนน้ำทุก 7 วัน ชอบแสงรำไร", season: "ในร่ม ตลอดปี", location: "โต๊ะทำงาน หน้าประตู", category: "เสริมโชค" },
  { id: 5, name: "กุหลาบแดง", price: 250, img: "https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?w=800", gallery: ["https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?w=800","https://images.unsplash.com/photo-1587302164676-8e9c04d7e0b6?w=800","https://images.unsplash.com/photo-1593486719159-3c6c2d7b8b6c?w=800"], desc: "สื่อถึงความรัก", benefit: "แสดงความรัก ของขวัญวันวาเลนไทน์", care: "ตัดดอกเก่า รดน้ำเช้า-เย็น", season: "ฤดูหนาว", location: "ระเบียง หน้าต่าง", category: "ดอกไม้" },
  { id: 6, name: "ต้นไม้ผสม", price: 400, img: "https://images.unsplash.com/photo-1587302164676-8e9c04d7e0b6?w=800", gallery: ["https://images.unsplash.com/photo-1587302164676-8e9c04d7e0b6?w=800","https://images.unsplash.com/photo-1593486719159-3c6c2d7b8b6c?w=800","https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?w=800"], desc: "ตกแต่งสวนได้หลากหลาย", benefit: "เพิ่มความเขียวขจี ฟอกอากาศ", care: "รดน้ำวันละครั้ง ใส่ปุ๋ยเดือนละครั้ง", season: "ฤดูฝน-ฤดูหนาว", location: "สวน ระเบียง", category: "กลางแจ้ง" }
];

// === อัปเดตจำนวนตะกร้า ===
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = totalQty;
    el.classList.remove('cart-bounce');
    setTimeout(() => el.classList.add('cart-bounce'), 10);
  });
}

// === Toast ===
function showToast(message) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// === เพิ่มลงตะกร้า ===
function addToCartFromModal() {
  const id = window.currentProductId;
  if (!id) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);
  const product = products.find(p => p.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} ถูกเพิ่มลงตะกร้า!`);
  document.getElementById('productModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// === หน้า Shop ===
if (document.getElementById('productsGrid')) {
  const grid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  function renderProducts(filtered = products) {
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = '<p style="text-align:center; color:#999; grid-column:1/-1; padding:3rem;">ไม่พบสินค้า</p>';
      return;
    }
    filtered.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.onclick = () => openModal(p.id);
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="content">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="price">${p.price} บาท</div>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const filtered = products.filter(p => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchCat = cat === 'all' || p.category === cat;
      return matchName && matchCat;
    });
    renderProducts(filtered);
  }

  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  renderProducts();
}

// === Modal สินค้า ===
function openModal(id) {
  window.currentProductId = id;
  const p = products.find(x => x.id === id);
  document.getElementById('mainImg').src = p.gallery[0];
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalBenefit').textContent = p.benefit;
  document.getElementById('modalCare').textContent = p.care;
  document.getElementById('modalSeason').textContent = p.season;
  document.getElementById('modalLocation').textContent = p.location;
  document.getElementById('modalPrice').textContent = `${p.price} บาท`;

  const thumbs = document.getElementById('thumbnails');
  thumbs.innerHTML = '';
  p.gallery.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'thumb';
    if (i === 0) img.classList.add('active');
    img.onclick = () => {
      document.getElementById('mainImg').src = src;
      thumbs.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      img.classList.add('active');
    };
    thumbs.appendChild(img);
  });

  document.getElementById('productModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

document.querySelector('.close')?.addEventListener('click', () => {
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('productModal');
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('productModal');
    if (modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

// === Checkout ===
if (document.getElementById('cartItems')) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemsDiv = document.getElementById('cartItems');
  const totalSummary = document.getElementById('totalSummary');
  const userInfo = document.getElementById('userInfo');

  function renderCart() {
    itemsDiv.innerHTML = '';
    if (cart.length === 0) {
      itemsDiv.innerHTML = '<p style="text-align:center: center; color:#999; padding:2rem;">ตะกร้าว่างเปล่า</p>';
      totalSummary.style.display = 'none';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; flex:1;">
          <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; border-radius:8px;">
          <span style="font-weight:500;">${item.name}</span>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="decQty(${index})">-</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn" onclick="incQty(${index})">+</button>
        </div>
        <span style="font-weight: 600; color: #2e7d32; min-width: 80px; text-align: right;">${itemTotal} บาท</span>
        <button onclick="removeFromCart(${index})" style="background:#e53935; color:white; border:none; padding:6px 12px; border-radius:8px; font-size:0.9rem; margin-left:10px;">ลบ</button>
      `;
      itemsDiv.appendChild(div);
    });

    const shipping = 50;
    const tax = total * 0.07;
    const grandTotal = total + shipping + tax;

    totalSummary.style.display = 'block';
    totalSummary.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>ราคาสินค้า:</span>
        <span>${total.toFixed(2)} บาท</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>ค่าจัดส่ง:</span>
        <span>${shipping} บาท</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <span>ภาษี 7%:</span>
        <span>${tax.toFixed(2)} บาท</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 700; color: #2e7d32;">
        <span>ยอดรวมทั้งสิ้น:</span>
        <span>${grandTotal.toFixed(2)} บาท</span>
      </div>
    `;

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      userInfo.innerHTML = `
        <p><strong>ชื่อ:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>ที่อยู่:</strong> ${user.address}, ${user.province}</p>
      `;
    }
  }

  window.incQty = (i) => { cart[i].qty++; localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); renderCart(); };
  window.decQty = (i) => { 
    if (cart[i].qty > 1) { cart[i].qty--; } else { removeFromCart(i); }
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount(); 
    renderCart(); 
  };
  window.removeFromCart = (i) => { 
    cart.splice(i, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount(); 
    renderCart(); 
  };

  document.getElementById('confirmOrder').onclick = () => {
    if (cart.length === 0) return alert('ตะกร้าว่างเปล่า');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('กรุณาสมัครสมาชิกก่อน'), location.href = 'index.html';

    const btn = document.getElementById('confirmOrder');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังดำเนินการ...';

    setTimeout(() => {
      const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const grandTotal = total + 50 + (total * 0.07);
      const order = {
        id: Date.now().toString().slice(-6),
        user,
        cart: [...cart],
        total: grandTotal,
        date: new Date().toLocaleString('th-TH')
      };

      // บันทึกประวัติคำสั่งซื้อ
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      localStorage.removeItem('cart');
      updateCartCount();
      location.href = 'order-success.html';
    }, 1200);
  };

  renderCart();
}

// === Order Success ===
if (document.getElementById('orderSummary')) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const lastOrder = orders[orders.length - 1];
  if (lastOrder) {
    let items = '';
    lastOrder.cart.forEach(i => items += `<li>${i.name} (x${i.qty}) - ${i.price * i.qty} บาท</li>`);
    document.getElementById('orderSummary').innerHTML = `
      <p><strong>เลขคำสั่งซื้อ:</strong> #${lastOrder.id}</p>
      <p><strong>ชื่อลูกค้า:</strong> ${lastOrder.user.firstName} ${lastOrder.user.lastName}</p>
      <p><strong>รวมทั้งหมด:</strong> ${lastOrder.total.toFixed(2)} บาท</p>
      <p><strong>สั่งซื้อเมื่อ:</strong> ${lastOrder.date}</p>
      <ul style="margin-top:1rem; text-align:left;">${items}</ul>
    `;
  }
}

// === หน้า orders.html ===
if (document.getElementById('ordersList')) {
  const ordersList = document.getElementById('ordersList');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div style="text-align:center; padding: 3rem; color: #999;">
        <i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;"></i>
        <p style="font-size: 1.2rem;">ยังไม่มีคำสั่งซื้อ</p>
        <a href="shop.html" style="color: #2e7d32; text-decoration: underline;">ไปช้อปปิ้งเลย!</a>
      </div>
    `;
  } else {
    orders.reverse().forEach(order => {
      const div = document.createElement('div');
      div.className = 'order-card';
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <strong>คำสั่งซื้อ #${order.id}</strong><br>
            <small>${order.date}</small>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 600; color: #2e7d32;">${order.total.toFixed(2)} บาท</div>
            <button onclick="openOrderModal('${order.id}')" style="margin-top: 0.5rem; background: #2e7d32; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 0.9rem;">
              ดูรายละเอียด
            </button>
          </div>
        </div>
      `;
      ordersList.appendChild(div);
    });
  }

  window.openOrderModal = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('modalOrderId').textContent = `คำสั่งซื้อ #${order.id}`;
    document.getElementById('modalDate').textContent = order.date;
    document.getElementById('modalName').textContent = `${order.user.firstName} ${order.user.lastName}`;
    document.getElementById('modalAddress').textContent = `${order.user.address}, ${order.user.province}`;

    const itemsDiv = document.getElementById('modalItems');
    itemsDiv.innerHTML = '';
    order.cart.forEach(item => {
      itemsDiv.innerHTML += `
        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
          <span>${item.name} (x${item.qty})</span>
          <span>${(item.price * item.qty).toFixed(2)} บาท</span>
        </div>
      `;
    });

    document.getElementById('modalTotal').textContent = order.total.toFixed(2);
    document.getElementById('orderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  document.querySelector('#orderModal .close').onclick = () => {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  window.onclick = (e) => {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };
}

// === สมัครสมาชิก ===
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const age = parseInt(document.getElementById('age').value);
    if (isNaN(age) || age < 1 || age > 120) return alert('กรุณาใส่อายุให้ถูกต้อง');
    const user = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      gender: document.getElementById('gender').value,
      age: age,
      address: document.getElementById('address').value,
      province: document.getElementById('province').value
    };
    localStorage.setItem('user', JSON.stringify(user));
    location.href = 'home.html';
  };
}

// === สถานะล็อกอิน ===
document.querySelectorAll('#loginLink').forEach(link => {
  const user = localStorage.getItem('user');
  if (user) {
    link.textContent = 'LOGOUT';
    link.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      location.href = 'index.html';
    };
  } else {
    link.href = 'index.html';
    link.textContent = 'สมัคร/ล็อกอิน';
  }
});

// === เริ่มต้น ===
updateCartCount();