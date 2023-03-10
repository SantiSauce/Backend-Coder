



  const cid = document.getElementById("purchase__btn").value;
  const pid = document.getElementById("plus").value

  const purchaseBtn = document.getElementById("purchase__btn");
  const plusBtn = document.getElementById("plus")
  
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
        alert(`Compra realizada con exito`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  plusBtn.addEventListener("click", () => {
  adProductToCart(cid, pid)
    
  })
  const adProductToCart = async(cid, pid) => { 
  try {
    const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }); 

  } catch (error) {
    console.log(error);
  }
  }

