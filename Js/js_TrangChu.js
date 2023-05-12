//slider top
const rightbtn = document.querySelector(".fa-chevron-right");
const leftbtn = document.querySelector(".fa-chevron-left");
let index = 0;
const imgNumber = document.querySelectorAll(".slider-content-left-top img").length;
const numberLi = document.querySelectorAll(".slider-content-left-bottom li");
console.log(rightbtn);


function active() {
  document.querySelector(".slider-content-left-top").style.right = index * 100 + "%";
  let itemactive = document.querySelector(".slider-content-left-bottom li.active");
  itemactive.classList.remove("active");
  numberLi[index].classList.add("active");
}

rightbtn.addEventListener("click", function () {
  index = index + 1;
  if (index > imgNumber - 1) {
    index = 0;
  }
  active();
});

leftbtn.addEventListener("click", function () {
  index = index - 1;
  if (index < 0) {
    index = imgNumber - 1;
  }
  active();
});
//slider bottom

numberLi.forEach((item, index) => {
  item.addEventListener("click", function () {
    let itemactive = document.querySelector(".slider-content-left-bottom li.active");
    itemactive.classList.remove("active");
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%";
    item.classList.add("active");
  });
});

//slider tu dong chay
function imgAuto() {
  index = index + 1;
  if (index > imgNumber - 1) {
    index = 0;
  }
  active();
}
setInterval(imgAuto, 5000)

// Js slider cho điện thoại
window.addEventListener('load', function () {
  const listProductIP = document.querySelectorAll(".list-item_ip")
  console.log(listProductIP);
  const productWidthIP = listProductIP[0].offsetWidth + 6.4;
  const nextBtnIP = document.querySelector(".button-rightip");
  const prevBtnIP = document.querySelector(".button-leftip");
  const boxListIP = document.querySelector(".content-box-list_ip")
  let positionIP = 0;
  let indexIP = 0;
  nextBtnIP.addEventListener('click', function () {
    slideip(1);
  })

  prevBtnIP.addEventListener('click', function () {
    slideip(-1);
  })
  function slideip(vT) {
    if (vT == 1) {
      indexIP++;
      if (indexIP > listProductIP.length - 4) {
        indexIP = listProductIP.length - 4;
        return;
      }
      positionIP = positionIP - productWidthIP;
      boxListIP.style = ` transform: translateX(${positionIP}px);`
    } else if (vT == -1) {
      indexIP--;
      if (indexIP < 0) {
        indexIP = 0;
        return;
      }
      positionIP = positionIP + productWidthIP;
      boxListIP.style = ` transform: translateX(${positionIP}px);`

    }
  }


});


// Js slider cho Tai nghe
window.addEventListener('load', function () {
  const listProduct = document.querySelectorAll(".list-item")
  const productWidth = listProduct[0].offsetWidth + 6.4;
  const nextBtn = document.querySelector(".button-right");
  const prevBtn = document.querySelector(".button-left");
  const boxList = document.querySelector(".content-box-list")
  let position = 0;
  let indexPK = 0;

  nextBtn.addEventListener('click', function () {
    slide(1);
  })

  prevBtn.addEventListener('click', function () {
    slide(-1);
  })
  function slide(vT) {
    if (vT == 1) {
      indexPK++;
      if (indexPK > listProduct.length - 4) {
        indexPK = listProduct.length - 4;
        return;
      }
      position = position - productWidth;
      boxList.style = ` transform: translateX(${position}px);`
    } else if (vT == -1) {
      indexPK--;
      console.log(indexPK);
      if (indexPK < 0) {
        indexPK = 0;
        return;
      }
      position = position + productWidth;
      boxList.style = ` transform: translateX(${position}px);`
    }
  }
});


