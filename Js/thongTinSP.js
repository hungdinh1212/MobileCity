const  button_XemThem = document.querySelector(".more-cate__button")
console.log(button_XemThem);
const info_Product = document.querySelector('.desc-cate__content')
let flag = true;
button_XemThem.onclick = function(){
    if(flag)
    {
        info_Product.style.height = '3300px';
        info_Product.style.animation = 'example 2s ease 0s 1 normal forwards running';
        return flag = false;
    }else
    {
        info_Product.style.height = '';
        return flag = true;
    }
}
