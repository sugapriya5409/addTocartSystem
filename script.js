var showbtn=document.getElementById("cart-icon")
var showcart=document.querySelector(".cart-active")
var cart=document.querySelector(".cart")
var closebtn=document.querySelector("#cart-close")

showbtn.addEventListener("click",()=>{
    cart.classList.toggle('cart-active')
    
})


closebtn.addEventListener("click",()=>{
    cart.classList.remove("cart-active")
})


document.addEventListener("DOMContentLoaded",loadFood)

function loadFood(){
loadContent()
}

function loadContent(){
       
    var delbtn=document.querySelectorAll(".cart-remove")
    delbtn.forEach((btn=>{
        btn.addEventListener("click",removeCart)
    }))

    var quantity=document.querySelectorAll(".cart-quantity")
    quantity.forEach((qty=>{
        qty.addEventListener("click",changeQty)
 } ))

 var addcartbtn=document.querySelectorAll("#add-cart")
 addcartbtn.forEach((cartbtn=>{
    cartbtn.addEventListener("click",addTocart)
 }))


 updateTotal()
    


}

function removeCart(){
          if(confirm("Are you sure to delete")){
           var cartfoodtitle=this.parentElement.querySelector(".cart-food-title").innerHTML
          
           itemlist=itemlist.filter(arraydelete=>{arraydelete.title!=cartfoodtitle})
     
            this.parentElement.remove()
            loadContent()
          }

        }
 


 

function changeQty(){
  
            if(isNaN(this.value) || this.value<1){
                this.value=1
           
            }
            loadContent()
        }


    

        var itemlist = [];

        function addTocart() {
            var cartadd = this.parentElement;
            var foodTitle = cartadd.querySelector(".food-title").innerHTML;
            var foodPrice = cartadd.querySelector(".food-price").innerHTML;
            var foodImg = cartadd.querySelector(".food-image").src;
        
            var newelements = { foodTitle, foodImg, foodPrice };
        
            // Check if the item is already in the cart
            if (itemlist.find((items) => items.foodTitle == newelements.foodTitle)) {
                alert("Item already in cart");
                return
            } else {
                itemlist.push(newelements);
            }
        
                var newproduct = createCart(foodTitle, foodImg, foodPrice);
                var element = document.createElement("div");
                element.innerHTML = newproduct;
                var cartBasket = document.querySelector(".cart-content");
                cartBasket.append(element);
                loadContent();
            
        }
        


   function createCart(foodTitle,foodImg,foodPrice){
    return ` <div class="cart-box">
                        <img src="${foodImg}" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-food-title">${foodTitle}</div>
                            <div class="price-box">
                                <div class="cart-price">${foodPrice}</div>
                                <div class="cart-amount">${foodPrice}</div>
                            </div>
                            <input type="number" value="1" 
                            class="cart-quantity">
                        </div>
                        <ion-icon name="trash" class="cart-remove"></ion-icon>


                    </div>`

   }
    
  
function updateTotal(){
    var cart_Items=document.querySelectorAll(".cart-box")
    var total_amt=document.querySelector(".total-price")
     var total=0
     cart_Items.forEach(product=>{
        var priceElement=product.querySelector(".cart-price")
        var price=parseFloat(priceElement.innerHTML.replace("Rs.",""))
        var qty=product.querySelector(".cart-quantity").value
        
        total+=price*qty
        product.querySelector(".cart-amount").innerText="Rs."+(price*qty)
              
     })
     total_amt.innerHTML="Rs."+total


    //show cart quantity
    var cartCount=document.querySelector(".cart-count")
    var count=cart_Items.length
    cartCount.innerHTML=count

    if(count==0){
        cartCount.style.display='none'
    }
    else{
        cartCount.style.display=''
    }


}


// Add a "Place Order" button event listener
document.querySelector(".btn-buy").addEventListener("click", placeOrder);

function placeOrder() {
    var cartarray=document.querySelectorAll(".cart-box")
    if (cartarray.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Display a confirmation message
    if (confirm("Are you sure you want to place the order?")) {
        // For this example, we're just clearing the cart and displaying a confirmation message
        cartarray = []; // Clear the itemlist array
        document.querySelector(".cart-content").innerHTML = ""; // Clear the cart display
        updateTotal(); // Update the total amount and cart count
        alert("Thank you for your order! Your order has been placed successfully.");
    }
}
