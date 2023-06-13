const api_key = "ed90d89933a810b1c6aa6fd3";
const api_url = "https://v6.exchangerate-api.com/v6/" + api_key;

const currency_one = document.querySelector("#currency_one");
const currency_two = document.querySelector("#currency_two");
const list_one = document.querySelector("#list_one");
const list_two = document.querySelector("#list_two");
const amount = document.querySelector("#amount");
const calculate = document.querySelector("#calculate");
const result = document.querySelector("#result");

async function currency() {
  try {
    const response = await fetch(api_url + "/codes");
    const data = await response.json();
    const items = data.supported_codes;

    let options;
    for (let item of items) {
      options += `
     <option  value="${item[0]}"selected>${item[1]}</option>
     `;
      list_one.innerHTML = options;
      list_two.innerHTML = options;
    }
  } catch (error) {}

  calculate.addEventListener("click", async () => {
    const from_where = currency_one.value;
    const where = currency_two.value;
    const totalAmount = amount.value;
    try {
      const response2 = await fetch(api_url + "/latest/" + from_where);
      const data = await response2.json();
      const totalResult = (data.conversion_rates[where] * totalAmount).toFixed(1);
      result.innerHTML = `
       <div class="card border-primary">
      <div class="card-body text-center" style="font-size: 30px">
      ${totalAmount} ${from_where} = ${totalResult} ${where}
      </div>
    </div> 
      `;
    } catch (error) {}
  });
}
currency();
