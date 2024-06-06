const price = document.getElementById("price");
const dish = document.getElementById("dish");
const table = document.querySelector(".chooseTable");
const serverURL =
  "https://crudcrud.com/api/7e3bcdbc0aa0405ea485bf29a4e4b1b1/RestaurantOrders";

function handleOrder(event) {
  event.preventDefault();
  const orderDetails = {
    dishPrice: price.value,
    dishType: dish.value,
    tableNumber: table.value,
  };
  axios
    .post(serverURL, orderDetails)
    .then((result) => {
      displayOrderDetails(result.data);
    })
    .catch((err) => {
      console.error("Order placing failed", err);
    });

  //clearing input fields
  price.value = "";
  dish.value = "";
}

//function to display order details on dashboard
function displayOrderDetails(orderDetails) {
  const li = document.createElement("li");
  const tableNumber = orderDetails.tableNumber;
  li.dataset.tableNumber = tableNumber;

  li.appendChild(
    document.createTextNode(
      `${orderDetails.dishPrice} - ${orderDetails.tableNumber} - ${orderDetails.dishType}  `
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete Order";
  deleteBtn.className = "delete_btn btn btn-outline-danger btn-sm";
  li.appendChild(deleteBtn);

  //displaying the orders in their respective tables
  if (orderDetails.tableNumber === "table1") {
    const ul1 = document.getElementById("ul1");
    ul1.appendChild(li);
  }
  if (orderDetails.tableNumber === "table2") {
    const ul2 = document.getElementById("ul2");
    ul2.appendChild(li);
  }
  if (orderDetails.tableNumber === "table3") {
    const ul3 = document.getElementById("ul3");
    ul3.appendChild(li);
  }

  //delete functionality
  deleteBtn.addEventListener("click", (event) => {
    axios
      .delete(`${serverURL}/${orderDetails._id}`)
      .then((result) => {
        const clickedLi = event.target.parentElement;
        const clickedTableNumber = clickedLi.dataset.tableNumber;
        if (clickedTableNumber === "table1") {
          const ul1 = document.getElementById("ul1");
          ul1.removeChild(event.target.parentElement);
        }
        if (clickedTableNumber === "table2") {
          const ul2 = document.getElementById("ul2");
          ul2.removeChild(event.target.parentElement);
        }
        if (clickedTableNumber === "table3") {
          const ul3 = document.getElementById("ul3");
          ul3.removeChild(event.target.parentElement);
        }
      })
      .catch((err) => {
        console.error("deletion failed", err);
      });
  });
}

//function to display data on page reload
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(serverURL)
    .then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        displayOrderDetails(result.data[i]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});
