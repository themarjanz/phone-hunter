// spinner loading
const loadSpinner=(show)=>{
  document.getElementById('loading-spinner').style.display=show;
};
// load Searching data 
const loadSearchData =()=>{
    const searchFiled=document.getElementById('input-filed');
    const searchText=searchFiled.value;
    const errorContainer=document.getElementById('error-container').innerHTML='';
    // show spinner
    loadSpinner('inline-block')
    if(searchText ==''){
      const errorContainer=document.getElementById('error-container');
      const phoneContainer=document.getElementById('phone-container').innerHTML='';
      const detailsContainer=document.getElementById('details-container').innerHTML='';
      const p=document.createElement('p');
      p.innerHTML=`
      Sorry sir,Search a phone name
      `;
      p.classList.add('text-danger','fs-3');
      errorContainer.appendChild(p);
      // none spinner
      loadSpinner('none')
    }
    else if(isNaN(searchText)==false){
      const errorContainer=document.getElementById('error-container');
      const phoneContainer=document.getElementById('phone-container').innerHTML='';
      const detailsContainer=document.getElementById('details-container').innerHTML='';
      const p=document.createElement('p');
      p.innerHTML=`
      Sorry sir,Search a phone name
      `;
      p.classList.add('text-danger','fs-3');
      errorContainer.appendChild(p);
       // none spinner
       loadSpinner('none')
    }
    else{
      const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res =>res.json())
    .then(data => displayResult(data.data.slice(0,20)))
    const phoneContainer=document.getElementById('phone-container').innerHTML='';
    const errorContainer=document.getElementById('error-container').innerHTML='';
    
    }
    searchFiled.value='';
    
    // data calling
    
}
// dispaly in searching Data
const displayResult=(phones)=>{
  if(phones ==0){
    const errorContainer=document.getElementById('error-container');
    const phoneContainer=document.getElementById('phone-container').innerHTML='';
    const detailsContainer=document.getElementById('details-container').innerHTML='';
    const p=document.createElement('p');
    p.innerHTML=`
    Sorry sir,No Found this Phone!!try againg...
    `;
    p.classList.add('text-danger','fs-3');
    errorContainer.appendChild(p);
    loadSpinner('none')
  }
   else{
      
        phones.forEach(phone => {
          const phoneContainer=document.getElementById('phone-container');
          const detailsContainer=document.getElementById('details-container').innerHTML='';
          const div=document.createElement('div');
          div.innerHTML=`
          <div class="col">
            <div class="card shadow-lg rounded p-3">
              <img src="${phone.image}" class="h-50 w-50 mx-auto " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Name:${phone.phone_name}</h5>
                <h5>Brand:${phone.brand}</h5>
                <button class="phone-btn bg-primary" onclick="loadPhoneDetails('${phone.slug}')">Details</button>
              </div>
            </div>
          </div>
          `;
          phoneContainer.appendChild(div);
          // none spinner
        loadSpinner('none')
      });
   }
}
// loading phones details
const loadPhoneDetails=(phoneID)=>{

  // show spinner
    loadSpinner('inline-block')
    const url=`https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
    .then(res =>res.json())
    .then(data => displayPhoneDetails(data.data))
}
// dispaly phone details
const displayPhoneDetails =(phone)=>{
    const detailsContainer=document.getElementById('details-container');
    const phoneContainer=document.getElementById('phone-container').innerHTML='';
    const div=document.createElement('div');
    div.innerHTML=`
            <div class="table-area table-responsive-sm shadow-lg p-3 rounded">
              <div class="img-area text-center">
                <img src="${phone.image}" class="h-50 w-25" alt="img not found" />
              </div>
              <div class="table-content">
              <table class="table table-hover">
                    <tbody>
                        <div class="row">
                        <div class="col-sm-12">
                        <tr>
                        <td colspan="2">Name:</td>
                        <td>${phone.name}</td>
                        </tr>
                        </div>
                        </div>
                        <tr>
                        <td colspan="2">Brand:</td>
                        <td>${phone.brand}</td>
                        </tr>
                        <tr>
                        <td colspan="2">Launch:</td>
                        <td>${phone.releaseDate ? phone.releaseDate:'no date find'}</td>
                        </tr>
                        <tr>
                        <td colspan="2">Chip:</td>
                        <td>${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet:'no found'}</td>
                        </tr>
                        <tr>
                        <td colspan="2">Display:</td>
                        <td>${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize:'no found'}</td>
                        </tr>
                        <tr>
                        <td colspan="2">Memory:</td>
                        <td>${phone.mainFeatures.memory ? phone.mainFeatures.memory:'no found'}</td>
                        </tr>
                        <tr>
                        <td colspan="2">Storage:</td>
                        <td>${phone.mainFeatures.storage? phone.mainFeatures.storage:'no found'}</td>
                        </tr>
                        <tr>
                        <td colspan="2">Sensors:</td>
                        <td><P>
                        ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[0]:'no found'},
                        ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[1]:'no found'},
                        ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[2]:'no found'},
                        ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[3]:'no found'},
                        ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[4]:'no found'},
                        ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[5]:'no found'},
                        </P></td>
                        </tr>
                        <tr>
                        <td colspan="2">others:</td>
                        <td><p>
                        Bluetooth(${phone.others?.GPS ? phone.others.GPS:'no found'}),
                        <br>NFC(${phone.others?.NFC ? phone.others.NFC:'no found'}),
                        <br>Radio(${phone.others?.Radio ? phone.others.Radio:'no found'}),
                        <br>USB(${phone.others?.USB ? phone.others.USB:'no found'}),
                        <br>WLAN(${phone.others?.WLAN ?phone.others.WLAN:'no'})
                        </p></td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
        `;
        detailsContainer.appendChild(div);
        // none spinner
        loadSpinner('none')

}




