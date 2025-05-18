function createform(){
    let form=document.createElement('form');

    let prsnlbl = document.createElement('label');
    prsnlbl.innerText = `Enter number of persons`;
    prsnlbl.setAttribute('for','num');
    form.appendChild(prsnlbl);

    let num = document.createElement('input');
    num.id='num';
    num.placeholder = 'Enter number of people';
    num.name = 'num';
    num.type = 'number';
    form.appendChild(num);

    let dateLbl = document.createElement('label');
    dateLbl.innerText = `Start date`;
    dateLbl.setAttribute('for','date');
    form.appendChild(dateLbl);

    let date = document.createElement('input');
    date.type = 'date';
    date.id='date';
    date.name = 'date';
    form.appendChild(date);

    let btn = document.createElement('button');
    btn.type = 'submit';
    btn.innerText = 'Submit';
    form.appendChild(btn);

    let cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';  // submit nahi hona chahiye
    cancelBtn.innerText = 'Cancel';
    cancelBtn.style.marginLeft = '10px';
    cancelBtn.addEventListener('click', () => {
        form.parentElement.remove();  // form ka parent (bg) remove kar de
    });
    form.appendChild(cancelBtn);

    return form;  // form return karna zaroori hai
}
function openForm(form){
    let bg =  document.createElement('div');
    bg.appendChild(form);
    bg.style.position = 'absolute';
    bg.style.top = '0';
    bg.style.left = '0';
    bg.style.zIndex = '23393';
    bg.style.height='100vh';
    bg.style.width = '100vw';
    bg.style.display ='flex';
    bg.style.alignItems = 'center';
    bg.style.justifyContent='center';
    bg.style.backgroundColor = 'rgba(0, 0, 50, 0.85)';
    document.body.appendChild(bg);
}
let planet_price={
        mars : 2000,
        moon: 1000,
        titan: 3000,
        europa: 5000
}
let cost = Number(localStorage.getItem('cost')) || 0;;
if (window.location.pathname.includes('destinations.html')) {
    let parent = document.getElementsByClassName('container')[0];
    parent.addEventListener('click',(event)=>{
        let clicked = event.target.closest('.box');
        if (!clicked) return; // agar box pe click nahi hua to exit
        let planet = clicked.id;
        if(planet_price.hasOwnProperty(planet)){
           let form = createform();
           openForm(form);
           form.addEventListener('submit',(e)=>{
                e.preventDefault();
                let num = Number(form.elements['num'].value);
                localStorage.setItem('cost', (cost += planet_price[planet] * num));
                localStorage.setItem('planet',planet);
                window.location.href = "../Adds_On/invoice.html";
           })
        }
    })
}

if (window.location.pathname.includes('index.html')) {
    let parent = document.getElementsByClassName('container')[0];
    parent.addEventListener('click',(event)=>{
        let clicked = event.target.closest('.box');
        if (!clicked) return; // agar box pe click nahi hua to exit
        let vehicalCost = 0;
        if(clicked.id ==='FalconX'){
            vehicalCost = 10000;
            cost+=10000;
            localStorage.setItem('vehical',`${clicked.id}`);
            localStorage.setItem('cost',cost);
            window.location.href = "./Destination/destinations.html";
            console.log('clicked');
        }
        else if(clicked.id == 'Starliner-5000'){
            cost+=30000;
            localStorage.setItem('vehical',`${clicked.id}`);
            vehicalCost = 30000;
            localStorage.setItem('cost',cost);
            window.location.href = "./Destination/destinations.html";
        }
        else if(clicked.id == 'Nebula-Cruiser'){
            cost+=50000;
            localStorage.setItem('vehical',`${clicked.id}`);
            localStorage.setItem('cost',cost);
            vehicalCost = 50000;
            window.location.href = "./Destination/destinations.html";
        }
        localStorage.setItem('vehicalCst',vehicalCost);
    })
}

function getInvoice(){
    let invoice = document.createElement('div');
    invoice.className = 'invoice';
    let vehicalCost =document.createElement('p');
    const vehical = localStorage.getItem('vehical'); 
    vehicalCost.innerText= `Cost of ${vehical} : ${localStorage.getItem('vehicalCst')}`
    invoice.appendChild(vehicalCost);
    let fair = document.createElement('p');
    fair.innerText=`Travel cost for 1 person is ${planet_price[localStorage.getItem('planet')]}`;
    invoice.appendChild(fair);
    let totalFair = document.createElement('p');
    let planetPrice = planet_price[localStorage.getItem('planet')];
    let vehicalCstVal = Number(localStorage.getItem('vehicalCst'));
    let TotalCst = Number(localStorage.getItem('cost'));
    const tf = TotalCst-vehicalCstVal;
    const n = tf/planetPrice;
    console.log(tf);
    totalFair.innerText = `The travel cost for ${n} person is ${tf}`;
    invoice.appendChild(totalFair);
    let tripCost = Number(localStorage.getItem('cost'));
    let tripCost_html = document.createElement('p');
    tripCost_html.innerText=`The Total Cost for trip is ${tripCost}`;
    invoice.appendChild(tripCost_html)
    return invoice ; 
}
if(window.location.pathname.includes('invoice.html')){
    let price=document.getElementById('cost');
    let cost = localStorage.getItem('cost');
    price.innerText=`$ ${cost}`;
    // localStorage.setItem('cost',0);
    const invoicebtn = document.getElementsByClassName('invoice-btn')[0];
    invoicebtn.addEventListener('click',()=>{
        let invoice = getInvoice();
        displayInvoice(invoice);
    })
    console.log(`${localStorage.getItem('cost')}`);

    let home = document.getElementById('homeBtn');
    home.addEventListener('click',()=>{
        localStorage.setItem('cost',0);
        window.location.href = "/index.html";
    })
}

function displayInvoice(invoice) {
    // Create overlay background
    let overlay = document.createElement('div');
    overlay.className = 'invoice-overlay';
    let closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close Invoice';
    closeBtn.style.marginTop = '10px';

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        // Reset cost only after invoice closed
        // localStorage.setItem('cost', 0);
    });
    invoice.appendChild(closeBtn);
    // Center the invoice inside overlay
    overlay.appendChild(invoice);

    // Append overlay to body
    document.body.appendChild(overlay);
}