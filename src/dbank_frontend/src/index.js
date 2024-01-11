import { inputBox } from "@dfinity/candid";
import {dbank_backend} from "../../declarations/dbank_backend";

window.addEventListener("load", async function(){
  console.log("hola");
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount *100) /100;
})

document.querySelector("form").addEventListener("submit", async(event)=>{
  event.preventDefault();
  //console.log("submitted");
  const button = event.target.querySelector("#submit-btn");

  const InputAmount = parseFloat( document.getElementById("input-amount").value);
  const outputAmount = parseFloat( document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(InputAmount){
    await dbank_backend.topUp(InputAmount);
  }  

  if(outputAmount){
    await dbank_backend.withdrawl(outputAmount);
  }

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount *100) /100;

  document.getElementById("input-amount").value= "";
  document.getElementById("withdrawal-amount").value= "";
  button.removeAttribute("disabled");
})