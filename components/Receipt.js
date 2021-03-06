const Receipt = (data, branch, total, deposit = 0) => {
   const length =
      (new Date(data.endDate) - new Date(data.startDate)) /
      (24 * 60 * 60 * 1000);

   const tableRow = data.room.map((r) => {
      return `<tr>
      <td>${r.number}</td>
      <td>${length}</td>
      <td>${r.price}</td>
      <td>${r.price * length}</td>
    </tr>`;
   });

   return `
    <html>
        <head>
            <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
            <style>
            body {
                height:78vh;
                font-size: 0.7em;
            }

            img {
                display:block;
            }

            p {
                margin: 0;
                margin-bottom:5px;
            }

            .container {
                padding:70px 50px;
                border-top: 10px solid #E45042;
                border-bottom: 10px solid #E45042;
                height: 100%;
            }

            .logo-container {
                display: flex;
                justify-content: space-between;
                margin-bottom:10px;
            }

            .logo-container h1 {
                font-size: 2em;
                color:#E45042
            }
        
            .info-container {
                display: flex;
                justify-content: space-between;
            }

            .table-container {
                margin-top: 20px;
            }
        
            #invoice {
                font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;
                font-size: 0.7em
            }
        
            #invoice td,
            #invoice th {
                border: 1px solid #ddd;
                padding: 3px;
            }
        
            #invoice tr:nth-child(even) {
                background-color: #f2f2f2;
            }
        
            #invoice tr:hover {
                background-color: #ddd;
            }
        
            #invoice th {
                padding-top: 2px;
                padding-bottom: 2px;
                text-align: left;
                background-color: #E45042;
                color: white;
            }
        
            .signature {
                padding: 30px 40px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        
            .cashier h3,
            .customer h3 {
                font-size: 0.9em;
            }
            </style>
        </head>
        <body>
            <div class="container" >
            <header>
                <div class="logo-container">
                    <h1>INVOICE</h1>
                    <img src='https://i.imgur.com/l5pQqC4.jpg' width="100" height="100" />
                </div>
                <div class="info-container">
                    <div>
                    <h2 style="border-bottom: 1px solid rgb(109, 101, 101); margin-top: 0;font-size:1em">
                        Bill to
                    </h2>
                    <p>Guest Name: <strong>${data.customer.name}</strong></p>
                    <p>Contact Number: <strong>${
                       data.customer.phoneNumber
                    }</strong></p>
                    </div>
                    <div style="text-align: right">
                    <p>Date : ${new Date().toLocaleDateString()}</p>
                    <p>${branch.name}</p>
                    <p>${branch.address}</p>
                    <p>012 234987</p>
                    </div>
                </div>
            </header>

            <div class="table-container">
                <table id="invoice">
                <tr>
                    <th>Room Number</th>
                    <th>Length</th>
                    <th>Price per Night</th>
                    <th>Total ($)</th>
                </tr>
            
                ${tableRow}

                <tr>
                    <td></td>
                    <td></td>
                    <td>
                    <strong>Subtotal</strong>
                    </td>
                    <td>
                    <strong>${total}</strong>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td>
                    <strong>Deposited</strong>
                    </td>
                    <td>
                    <strong>${deposit}</strong>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>
                    <td>
                    <strong>Total</strong>
                    </td>
                    <td>
                    <strong>${total - deposit}</strong>
                    </td>
                </tr>
                </table>
            </div>

            <div class="signature">
                <div class="customer">
                    <h3>Customer's Signature</h3>
                </div>
                <div class="cashier">
                    <h3>Cashier's Signature</h3>
                </div>
            </div>

            </div>
        </body>
    </html>`;
};

export default Receipt;
