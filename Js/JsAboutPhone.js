fetch('../Json/DataPhone.json')
  .then(response => response.json())
  .then(item_product => {
    localStorage.setItem('item_product', JSON.stringify(item_product));
    const productList = document.querySelector(".product-list");
    const output = item_product.map(item => `
      <div class="item_product"> 
        <div class="product_img">
          <img src="${item.image}">
        </div>
        <div class="product_info">
            <h3 class="name_product">${item.title}</h3>
          <div class="product_attribute">
            <ul>
              <li>
                <i class="fa fa-microchip" aria-hidden="true"></i>
                ${item.CPU}
              </li>
              <li>
                <i class="fa fa-mobile" aria-hidden="true"></i>
                ${item.screen}
              </li>
              <li>
              <i class="fa-solid fa-memory"></i>
                ${item.memory}
              </li>
            </ul>
          </div>
          <div class="product_price">
            <p class="price">
              ${item.price}
              <sup>đ</sup>
            </p>
          </div>
          <div class="product_vote">
            <i class="fa fa-star star-normal" aria-hidden="true"></i>
            <i class="fa fa-star star-normal" aria-hidden="true"></i>
            <i class="fa fa-star star-normal" aria-hidden="true"></i>
            <i class="fa fa-star star-normal" aria-hidden="true"></i>
            <i class="fa fa-star star-normal" aria-hidden="true"></i>
          </div>
          <div class="product_compare">
          <i class="fa-solid fa-circle-plus"></i>
            <span>So sánh</span>
          </div>
        </div> 
      </div>
    `).join('');
    productList.innerHTML = output;
    localStorage.setItem('item_product', JSON.stringify(item_product));
  });



// Lấy danh sách sản phẩm từ file JSON
fetch('../Json/DataPhone.json')
  .then(response => response.json())
  .then(item_product => {
    localStorage.setItem('item_product', JSON.stringify(item_product));

    // Lấy danh sách sản phẩm trên trang
    const productList = document.querySelector(".product-list");
    const products = productList.querySelectorAll(".item_product");

    // Thêm event listener cho từng sản phẩm
    products.forEach((product, index) => {
      product.addEventListener("click", () => {
        // Lấy thông tin sản phẩm được click
        const selectedItem = item_product[index];

        // Lưu thông tin sản phẩm vào local storage
        localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
        // Chuyển đến trang chi tiết sản phẩm
        window.location.href = "../html/PhoneDetails.html";
      });
    });
  });
// Lấy thông tin sản phẩm từ local storage
document.addEventListener("DOMContentLoaded", function () {
  const selectedItem = JSON.parse(localStorage.getItem("selectedItem"));

  // Hiển thị thông tin sản phẩm lên trang
  const productImg = $(".product_img img");
  const productName = $('.name_product');
  const price = $(".price");
  const tim = $(".tim");
  const den = $(".den");
  const trang = $(".trang");
  const xanh = $(".xanh");
  const red = $(".do");
  const title = $("title");
  const breadcum = $(".brphone");
  tim.attr("src", selectedItem.colortim);
  den.attr("src", selectedItem.colorden);
  trang.attr("src", selectedItem.colortrang);
  xanh.attr("src", selectedItem.colorxanh);
  red.attr("src", selectedItem.colordo);
  title.text(selectedItem.title);
  breadcum.text(selectedItem.title);
  productImg.attr("src", selectedItem.image);
  productName.text(selectedItem.title);
  price.text(selectedItem.price);
});




const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart() {
  // Lấy thông tin sản phẩm
  const priceText = document.querySelector('.price').textContent;
  const product = {
    image: document.querySelector('.product_img img').getAttribute('src'),
    title: document.querySelector('.name_product').textContent,

    price: parseFloat(priceText.replace(/[^\d\.]/g, '')),

  };
  const existingItemIndex = cartItems.findIndex(item => item.title === product.title);

  if (existingItemIndex !== -1) {
    // Nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng sản phẩm
    cartItems[existingItemIndex].quantity++;
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng thì thêm vào mảng
    product.quantity = 1;
    cartItems.push(product);
  }
  // Lưu danh sách sản phẩm vào local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Thêm sản phẩm vào giỏ hàng thành công!');
  // Cập nhật lại giỏ hàng trên giao diện
  updateCartUI();
}
function updateCartUI() {
  const cartList = document.getElementById('cart-list');
  let cartItemsUI = '';

  // Hiển thị danh sách sản phẩm trong giỏ hàng
  cartItems.forEach(item => {
    cartItemsUI += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="item-info">
          <h3>${item.title}</h3>
          <p>${item.price}</p>
          <div class="quantity">
            <button class="quantity-btn minus" data-index="${cartItems.indexOf(item)}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-index="${cartItems.indexOf(item)}">+</button>
          </div>
          <button class="btn btn-danger delete-item" data-index="${cartItems.indexOf(item)}">Xóa</button>
        </div>
      </div>
    `;
  });


  // Hiển thị tổng số lượng và tổng giá trị đơn hàng
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotalUI = `
      <p>Tổng số lượng: ${cartQuantity}</p>
      <p>Tổng giá trị đơn hàng: ${cartTotal}</p>
    `;

  // Hiển thị danh sách sản phẩm và tổng giá trị đơn hàng trong offcanvas bootstrap
  const cartOffcanvas = document.querySelector('#cart-offcanvas .offcanvas-body');
  cartOffcanvas.innerHTML = cartItemsUI + cartTotalUI;
}
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-item')) {
    const index = event.target.dataset.index;
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
  }
});

const decreaseButtons = document.querySelectorAll('.quantity-btn .minus');
const increaseButtons = document.querySelectorAll('.quantity-btn .plus');

// Thêm xử lý sự kiện cho các nút
decreaseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = button.dataset.index;
    console.log(`Decreasing item at index ${index}`);
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      cartItems.splice(index, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
  });
});

increaseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = button.dataset.index;
    console.log(`Increasing item at index ${index}`);
    cartItems[index].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
  });
});

// Hiển thị số lượng thành tiền
function updateCartQuantity() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartQuantity = document.querySelector('.cart-quantity');
  cartQuantity.textContent = totalItems;
  updateCartUI();
}


// Hàm tìm kiếm sản phẩm bằng button

function searchByBrand(brand) {
  // Lấy danh sách sản phẩm và lọc theo thương hiệu
  const products = document.querySelectorAll('.item_product');
  products.forEach(product => {
    if (product.querySelector('.name_product').textContent.includes(brand)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
} ``

// Thay đổi hình ảnh khi nhấp vô màu sắc điện thoại
const colorItems = document.querySelectorAll('.item-color-phone .image img');

colorItems.forEach(item => {
  item.addEventListener('click', () => {
    const imageSrc = item.src;
    const productImage = document.querySelector('.product_img img');
    productImage.src = imageSrc;
  });
});





























