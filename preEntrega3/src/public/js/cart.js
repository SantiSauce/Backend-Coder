
 /* const deleteProduct = async (cid, pid) => {
    try {
      const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        alert("Producto eliminado correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };*/
  /*deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.value;
      
      deleteProduct(cid, pid);
      location.reload();
    });
  });*/
  
  const cid = document.getElementById("purchase__btn").value;
  const purchaseBtn = document.getElementById("purchase__btn");
  
  purchaseBtn.addEventListener("click", () => {
    purchaseCart(cid);
  });
  
  const purchaseCart = async (cid) => {
    try {
      const response = await fetch(`/api/carts/${cid}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }); 
  
      const result = await response.json();
  
      console.log(result);
  
      if (response.status === 200) {
        alert(`Compra realizada con exito con el ticket ${result.payload.code}`);
      }
    } catch (error) {
      console.log(error);
    }
  };


 /* let products = document.getElementsByClassName("product");

  function sum() {
  let sum = document.getElementById("tot");
  let arr = document.getElementsByClassName("price");
  sum.innerText = 0;
  for (x of arr) {
    let txt = x.innerText;
    sum.innerText =
      Number(sum.innerText) + Number(txt.substring(0, txt.length - 1));
  }
}
  sum();

  for (let i = 0; i < products.length; i++) {
    let elem = products[i];
    let pu = elem.querySelector(".pu").innerText;
    elem.addEventListener("click", e => {
      switch (e.target.className) {
        case "fas fa-heart":
        case "fas fa-heart red":
          e.target.classList.toggle("red");
        break;
        case "remove":
          elem.remove();
        break;
        case "plus":
          elem.querySelector(".qt").innerText++;
          elem.querySelector(".price").innerText =
          pu * elem.querySelector(".qt").innerText + "$";
          sum();
        break;
        case "minus":
          if (elem.querySelector(".qt").innerText > 0) {
            elem.querySelector(".qt").innerText--;
            elem.querySelector(".price").innerText =
            pu * elem.querySelector(".qt").innerText + "$";
          sum();
        }
        break;
    }
  });
}
*/