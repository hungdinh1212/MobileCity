const btnMax = document.querySelector('.price_max')
const btnMin = document.querySelector('.price_min')
var btnList = document.querySelectorAll(".btn");
function renderItem(item) {
  return `<div class="item_product" type="${item.type}">
  <div class="product_img">
    <img class="item_img" src="${item.image}" >
  </div>
  <div class="product_info">
    <h3 class="name_product">${item.title}</h3>
    <div class="product_attribute">
      <ul>
        <li>
          <i class="fa fa-microchip" aria-hidden="true"></i>
          ${item.cpu}
        </li>
      </ul>
    </div>
    <div class="product_price">
      <p class="price">
        ${item.price}
        <sup>đ</sup>
      </p>
      <p class="discount_price">
        ${item.discount} <sup>đ</sup>
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
      <i class="fa-thin fa-circle-plus"></i>
      <span>So sánh</span>
    </div>
  </div>
</div>`
}


fetch('../Json/ListPhuKien.json')
  .then(response => response.json())
  .then(item_product => {
    localStorage.setItem('item_product', JSON.stringify(item_product));
    const productList = document.querySelector(".product-list");
    const output = item_product.map(item => {
      return renderItem(item)
    }
    ).join('');
    productList.innerHTML = output;

    const brands = Array.from(btnList);
    brands.forEach(brand => {
      brand.addEventListener('click', () => {

        const selectBrand = brand.getAttribute('type');
        console.log(selectBrand);


        const filteritem = item_product.filter(item => item.type === selectBrand)
        const filterOut = filteritem.map(item => {
          return renderItem(item)
        }).join('');
        productList.innerHTML = filterOut
      })

    })


    //sort giá cao
    btnMax.addEventListener('click', e => {
      item_product.sort((a, b) => {
        let priceA = parseInt(a.price.replace(/\.|\đ/g, ''));
        let priceB = parseInt(b.price.replace(/\.|\đ/g, ''));
        return priceB - priceA;
      });
      const out = item_product.map(it => {
        return renderItem(it);
      }).join('');
      productList.innerHTML = out

    });
    localStorage.setItem('item_product', JSON.stringify(item_product));

    //sort giá thấp
    btnMin.addEventListener('click', e => {
      item_product.sort((a, b) => {
        let priceA = parseInt(a.price.replace(/\.|\đ/g, ''));
        let priceB = parseInt(b.price.replace(/\.|\đ/g, ''));
        return priceA - priceB;
      });
      const out = item_product.map(it => {
        return renderItem(it);
      }).join('');
      productList.innerHTML = out
    });
    localStorage.setItem('item_product', JSON.stringify(item_product));
});




fetch('../Json/ListPhuKien.json')
  .then(response => response.json())
  .then(item_product => {
    localStorage.setItem('item_product', JSON.stringify(item_product));

    // Lấy danh sách sản phẩm trên trang
    const productList = document.querySelector(".product-list");
    const products = productList.querySelectorAll(".item_product");
    console.log(products);
    // Thêm event listener cho từng sản phẩm
    products.forEach((product, index) => {
      product.addEventListener("click", () => {
        // Lấy thông tin sản phẩm được click
        const selectedItem = item_product[index];
        
        // Lưu thông tin sản phẩm vào local storage
        localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
        // Chuyển đến trang chi tiết sản phẩm
        window.location.href = "../html/ThongTinSanPham.html";
      });
    });
  });



