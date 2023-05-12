// JS cho lọc phân loại tai nghe
var imgList = document.querySelectorAll(".item_img");
var container = document.querySelector(".product-list");
var btnList = document.querySelectorAll(".btn");
var containerimg = document.querySelector(".product_img");
var item_product = document.querySelector('.item_product')
var arr = [];
const btnMax = document.querySelector('.price_max')
const btnMin = document.querySelector('.price_min')
imgList.forEach(item => {
    let productInfo = item.closest('.item_product').querySelector('.product_info');
    arr.push({
        src: item.src,
        type: item.getAttribute('type'),
        alt: item.getAttribute('alt'),
        productName: productInfo.querySelector('.name_product').textContent,
        attribute: productInfo.querySelector('.product_attribute ul').innerHTML,
        price: productInfo.querySelector('.price').textContent,
        discountPrice: productInfo.querySelector('.discount_price').textContent,
        vote: productInfo.querySelector('.product_vote').innerHTML,
        compare: productInfo.querySelector('.product_compare span').textContent
    });
});
var array = []
btnList.forEach(btn => {
    btn.addEventListener('click', e => {
        let type = e.currentTarget.getAttribute('type');
        let filterData = arr.filter(food => {
            if (food.type == type) {
                array.push(food)
                btnMax.addEventListener('click', e => {
                    array.sort((a, b) => {
                        let priceA = parseInt(a.price.replace(/\.|\đ/g, ''));
                        let priceB = parseInt(b.price.replace(/\.|\đ/g, ''));
                        return priceB - priceA;
                    });
                    render(array);
                });
                return food.type == type;
            }
            
        });
        render(filterData);
    });
});

function render(list) {
    container.innerHTML = '';
    list.forEach(item => {
        let itemProduct = document.createElement('div');
        itemProduct.classList.add('item_product');

        container.append(itemProduct);
        let productImg = document.createElement('div');
        productImg.classList.add('product_img');
        itemProduct.append(productImg)

        let imgElement = document.createElement('img');
        imgElement.classList.add('item_img');
        imgElement.src = item.src;
        imgElement.setAttribute('type', item.type);
        productImg.append(imgElement)

        let productInfo = document.createElement('div');
        productInfo.classList.add('product_info');
        itemProduct.append(productInfo)

        let productName = document.createElement('h3');
        productName.classList.add('name_product');
        productName.textContent = item.productName;
        productInfo.append(productName);

        let productAttribute = document.createElement('div');
        productAttribute.classList.add('product_attribute');

        let attributeList = document.createElement('ul');
        attributeList.innerHTML = item.attribute;
        productAttribute.append(attributeList);
        productInfo.append(productAttribute);

        let productPrice = document.createElement('div');
        productPrice.classList.add('product_price');

        let price = document.createElement('p');
        price.classList.add('price');
        price.textContent = item.price;
        productPrice.append(price);

        let discountPrice = document.createElement('p');
        discountPrice.classList.add('discount_price');
        discountPrice.textContent = item.discountPrice;
        productPrice.append(discountPrice);
        productInfo.append(productPrice);

        let productVote = document.createElement('div');
        productVote.classList.add('product_vote');
        productVote.innerHTML = item.vote;
        productInfo.append(productVote);

        let productCompare = document.createElement('div');
        productCompare.classList.add('product_compare');

        let compareIcon = document.createElement('i');
        compareIcon.classList.add('fa-thin', 'fa-circle-plus');
        productCompare.append(compareIcon);

        let compareText = document.createElement('span');
        compareText.textContent = item.compare;
        productCompare.append(compareText);

        productInfo.append(productCompare);
    });
}

//sort giá cao
btnMax.addEventListener('click', e => {
    arr.sort((a, b) => {
        let priceA = parseInt(a.price.replace(/\.|\đ/g, ''));
        let priceB = parseInt(b.price.replace(/\.|\đ/g, ''));
        return priceB - priceA;
    });
    render(arr);
});
//sort giá thấp
btnMin.addEventListener('click', e => {
    arr.sort((a, b) => {
        let priceA = parseInt(a.price.replace(/\.|\đ/g, ''));
        let priceB = parseInt(b.price.replace(/\.|\đ/g, ''));
        return priceA - priceB;
    });
    render(arr);
});