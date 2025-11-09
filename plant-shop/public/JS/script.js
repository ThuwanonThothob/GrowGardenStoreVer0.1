// ฐานข้อมูลสินค้า
const products = [
  { id: 1, name: "ต้นลาเวนเดอร์", price: 300, img: "https://dam.thdstatic.com/content/production/nufH994ThXqVvm3KDU7BTw/srF1LNWpWbIkabgv6WOroQ/Original%20file/1af079fa-470d-4741-87a5-ea8e9dcf7634_english_lavender_1.jpeg?im=Resize=(920,575)" },
  { id: 2, name: "ช่อดอกไม้สวย", price: 500, img: "https://images.squarespace-cdn.com/content/v1/64034d816fb22408e4468d08/d22918d4-7201-4616-ab32-0d9449a45ff7/IMG_8042.jpg" },
  { id: 3, name: "ต้นไม้ผสม", price: 400, img: "https://dam.thdstatic.com/content/production/-MS3uSafL4iUuz-8PI5pdw/oGERt72ULRpWogWyzcxtsg/Original%20file/34-favorite-fall-flowers-and-plants-for-your-garden-hero.jpg" },
  { id: 4, name: "ต้นมอนสเตอร่า", price: 350, img: "https://images.unsplash.com/photo-1593484713504-7d2ed0e1e7e2?q=80&w=500" },
  { id: 5, name: "กุหลาบแดง", price: 250, img: "https://images.unsplash.com/photo-1561181286-1b5f7d3b3b0b?q=80&w=500" },
  { id: 6, name: "ต้นไผ่นำโชค", price: 180, img: "https://images.unsplash.com/photo-1593484713504-7d2ed0e1e7e2?q=80&w=500" }
];

// ฟังก์ชันอัปเดตจำนวนตะกร้า
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = cart.length;
  });
}

// หน้า shop - โหลดสินค้า
if (document.getElementById('productsGrid')) {
  const grid = document.getElementById('productsGrid');
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">${p.price} บาท</div>
      <button onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button>
    `;
    grid.appendChild(card);
  });
}

// เพิ่มสินค้าลงตะกร้า
function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} ถูกเพิ่มลงตะกร้าแล้ว!`);
}

// หน้า checkout
if (document.getElementById('cartItems')) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('user'));
  const itemsDiv = document.getElementById('cartItems');
  const userDiv = document.getElementById('userInfo');

  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p style="text-align:center; color:#999;">ตะกร้าว่างเปล่า</p>';
  } else {
    let total = 0;
    cart.forEach(item => {
      total += item.price;
      itemsDiv.innerHTML += `
        <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;">
          <span>${item.name}</span>
          <span>${item.price} บาท</span>
        </div>
      `;
    });
    itemsDiv.innerHTML += `<div style="font-weight:600; margin-top:1rem; text-align:right;">รวม: ${total} บาท</div>`;
  }

  if (user) {
    userDiv.innerHTML = `
      <p><strong>ชื่อ:</strong> ${user.firstName} ${user.lastName}</p>
      <p><strong>ที่อยู่:</strong> ${user.address}, ${user.province}</p>
    `;
  } else {
    userDiv.innerHTML = '<p style="color:red;">กรุณาล็อกอินก่อน</p>';
  }

  document.getElementById('confirmOrder').onclick = () => {
    if (!user) {
      alert('กรุณาล็อกอินก่อน');
      location.href = 'index.html';
      return;
    }
    if (cart.length === 0) {
      alert('ตะกร้าว่างเปล่า');
      return;
    }
    const order = { user, cart, total: cart.reduce((s,i)=>s+i.price,0), date: new Date().toLocaleString() };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.removeItem('cart');
    location.href = 'order-success.html';
  };
}

// หน้าสั่งซื้อสำเร็จ
if (document.getElementById('orderSummary')) {
  const order = JSON.parse(localStorage.getItem('lastOrder'));
  if (order) {
    let items = '';
    order.cart.forEach(i => items += `<li>${i.name} - ${i.price} บาท</li>`);
    document.getElementById('orderSummary').innerHTML = `
      <p><strong>เลขคำสั่งซื้อ:</strong> #${Date.now().toString().slice(-6)}</p>
      <p><strong>ชื่อลูกค้า:</strong> ${order.user.firstName} ${order.user.lastName}</p>
      <p><strong>รวมทั้งหมด:</strong> ${order.total} บาท</p>
      <p><strong>สั่งซื้อเมื่อ:</strong> ${order.date}</p>
      <ul style="margin-top:1rem; text-align:left;">${items}</ul>
    `;
  }
}

// ล็อกอิน
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      gender: document.getElementById('gender').value,
      age: document.getElementById('age').value,
      address: document.getElementById('address').value,
      province: document.getElementById('province').value
    };
    localStorage.setItem('user', JSON.stringify(user));
    location.href = 'home.html';
  };
}

// อัปเดตสถานะล็อกอิน
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
  }
});

// อัปเดตจำนวนตะกร้าเมื่อโหลด
updateCartCount();