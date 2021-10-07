$(document).ready(() => {
    
    const dateVal = new Date(Date.now());
    const dateConvert = function () {
      if (dateVal.getDate() < 10) {
        return `0${dateVal.getDate()}`;
      } else {
        return dateVal.getDate();
      }
    };
    const dateToday = `${dateVal.getFullYear()}-${
      dateVal.getMonth() + 1
    }-${dateConvert()}`;
    $("#Date").val(dateToday);
  
  
    var unitPrice = 0;
    var itemNo = 0;
    var itemQty = 0;
  
    $("[name=item1]").on("change", () => {
      const item = $("[name=item1]").val();
      var id = $(`#item1 option[value="${item}"]`).data("id");
      const val = itemData.find(({ Description }) => Description === item);
  
      unitPrice = Math.trunc(val.UnitPrice);
      itemNo = val.itemNo;
      itemQty = $("#quantity").val();
      $("#unitprice").val(unitPrice);
      $("#itemDetail").empty()
        .append(` <h4 class="animate__animated animate__slideInLeft">${
        val.Description
      }</h4>
                            <li class="list-group-item animate__animated animate__slideInLeft"><strong>Price: ${new Intl.NumberFormat().format(
                              Math.trunc(val.UnitPrice)
                            )}</strong> </li> 
                            <li class="list-group-item animate__animated animate__slideInLeft">CMB247: ${Math.trunc(
                              val.CMB247
                            )}</li> 
                            <li class="list-group-item animate__animated animate__slideInLeft">STORES CMB: ${Math.trunc(
                              val.STORESCMB
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">KDY: ${Math.trunc(
                              val.KDY
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">KUG: ${Math.trunc(
                              val.KUG
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">ANP: ${Math.trunc(
                              val.ANP
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">ANP: ${Math.trunc(
                              val.NEG
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">CMB281: ${Math.trunc(
                              val.CMB281
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">MTR: ${Math.trunc(
                              val.MTR
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">BAT: ${Math.trunc(
                              val.BAT
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">HO: ${Math.trunc(
                              val.HO
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">STOCMB12: ${Math.trunc(
                              val.STOCMB12
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">STORES: ${Math.trunc(
                              val.STORES
                            )}</li>
                            <li class="list-group-item animate__animated animate__slideInLeft">Application: ${
                              val.Application
                            }</li>
                            `);
    });
  
    $("#quantity").on("change", () => {
      itemQty = $("#quantity").val();
      $("#totalamount").val(itemQty * parseInt(unitPrice));
    });
  
    $("#unitprice").on("change", () => {
      unitPrice = $("#unitprice").val();
      $("#totalamount").val(itemQty * parseInt(unitPrice));
    });
  
    $("#addBtn").click(() => {
      const item = $("[name=item1]").val();
      const quantity = $("[name=quantity]").val();
      $("#orderList").append(`
         <div class="row g-3 mt-2">
         <div class="col-md-3">
             <div class="form-group">
                 <input type="text" class="form-control" id="Description" name="Description" readonly value="${item}" required>
             </div>
         </div> 
         <div class="col-md-3">
             <div class="form-group">
                 <input type="number" class="form-control" id="Quantity" name="Quantity" readonly value="${quantity}" required>
             </div>
         </div>
         <div class="col-md-3">
            <div class="form-group">
                  <input type="number" class="form-control" id="UnitPrice" name="UnitPrice" readonly value="${unitPrice}" >
            </div>
          </div>
          <div class="col-md-3">
              <div class="form-group">
                  <input type="number" class="form-control" id="Total" name="Total" readonly value="${
                    unitPrice * quantity
                  }">
              </div>
          </div>
         </div>
         <hr>
         `);
      $("[name=item1]").val("");
      $("[name=quantity]").val("");
      $("[name=unitprice]").val("");
      $("[name=totalamount]").val("");
    });
  
    // $("[name=quantity]").focusout(() => {
    //     const item = $("[name=item1]").val()
    //     const quantity = $("[name=quantity]").val()
    //     $("#orderList").append(`
    //     <div class="row mt-2">
    //     <div class="col-4">
    //         <div class="form-group">
    //          <span class="btn btn-danger">   <input type="text" class="form-control" id="description" name="description" readonly value="${item}">
    //         </div>
    //     </div>
    //     <div class="col-4">
    //         <div class="form-group">
    //             <input type="number" class="form-control" id="quantityAdd" name="quantityAdd" readonly value="${quantity}">
    //         </div>
    //     </div>
    //     </div>
    //     `)
    // })
    // $("[name=item1]").on("change", () => {
    //   const item = $("[name=item1]").val();
    //   var id = $(`#item1 option[value="${item}"]`).data("id");
    //   const schRsl = itemData.find((({ Description }) => Description === item));
    //   console.log(schRsl);
  
    //   $.getJSON(`http://localhost:3000/stock/view/${id}`, (data) => {
    //     $.each(data, (key, val) => {
    //       unitPrice = Math.trunc(val.UnitPrice);
    //       itemNo = val.itemNo;
    //       itemQty = $("#quantity").val();
    //       $("#unitprice").val(unitPrice);
    //       $("#itemDetail").empty()
    //         .append(` <h4 class="animate__animated animate__slideInLeft">${
    //         val.Description
    //       }</h4>
    //                         <li class="list-group-item animate__animated animate__slideInLeft"><strong>Price: ${new Intl.NumberFormat().format(
    //                           Math.trunc(val.UnitPrice)
    //                         )}</strong> </li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">CMB247: ${Math.trunc(
    //                           val.CMB247
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">STORES CMB: ${Math.trunc(
    //                           val.STORESCMB
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">KDY: ${Math.trunc(
    //                           val.KDY
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">KUG: ${Math.trunc(
    //                           val.KUG
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">ANP: ${Math.trunc(
    //                           val.ANP
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">ANP: ${Math.trunc(
    //                           val.NEG
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">CMB281: ${Math.trunc(
    //                           val.CMB281
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">MTR: ${Math.trunc(
    //                           val.MTR
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">BAT: ${Math.trunc(
    //                           val.BAT
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">HO: ${Math.trunc(
    //                           val.HO
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">STOCMB12: ${Math.trunc(
    //                           val.STOCMB12
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">STORES: ${Math.trunc(
    //                           val.STORES
    //                         )}</li>
    //                         <li class="list-group-item animate__animated animate__slideInLeft">Application: ${
    //                           val.Application
    //                         }</li>
    //                         `);
    //     });
    //   });
    // });
  });
  