//import Cookies from 'js-cookie'


const TheCookiePb     = { // Pb = parameter block.
  bIsValidated        : false, // bIsValidated -- Need to initialize or recompute before using.
  bCookiesEnabled     : false,
  // ----
  IsReady             : function(){ if (! this.bIsValidated) ResetTheCookiePb(); return this.bIsValidated; }
};
//var oFromTheThing = Cookies.get();

// define variables that reference elements on our page
const TheForm_01               = document.getElementById("TheForm_01");
//const TheForm_01_ResultList  = document.getElementById("TheForm_01_ResultList");
const TheForm_02               = document.getElementById("TheForm_02");
const TheForm_02_CookieName    = document.getElementById("TheForm_02_CookieName");
const TheForm_02_CookieValue   = document.getElementById("TheForm_02_CookieValue");
const TheForm_03               = document.getElementById("TheForm_03");
const TheForm_03_CookieName    = document.getElementById("TheForm_03_CookieName");
const TheForm_03_CookieValue   = document.getElementById("TheForm_03_CookieValue");
const TheForm_03_CookieDomain  = document.getElementById("TheForm_03_CookieDomain");
const TheForm_03_CookiePath    = document.getElementById("TheForm_03_CookiePath");


// ---------
// Define some functions
// ---------

function Submit_TheForm_01(inEvent){
  // stop our form submission from refreshing the page
  inEvent.preventDefault();
  
  let objCookieList = Cookies.get(); // Object with each cookie as a property
  let arrCookieList = Object.entries(objCookieList); // to array

  // do stuff
  console.log(  "TheForm_01"
    +           ", bCookiesEnabled " + TheCookiePb.bCookiesEnabled
    +           ", Cookies.get() "   + JSON.stringify(arrCookieList)
    +           ", length "          + arrCookieList.length // array length     
  );

  // reset form
  //TheForm_01.reset();
}


function Submit_TheForm_02(inEvent){
  // stop our form submission from refreshing the page
  inEvent.preventDefault();
  
  Cookies.set(TheForm_02_CookieName.value, TheForm_02_CookieValue.value);
  
  console.log(  "TheForm_02 Cookies.set()"
    +           ", name "   + TheForm_02_CookieName.value
    +           ", value "  + TheForm_02_CookieValue.value
  );

  // reset form
  TheForm_02.reset();
}


function Submit_TheForm_03(inEvent){
  let strDomain    = TheForm_03_CookieDomain.value;
  let strPath      = TheForm_03_CookiePath.value;
  let strAttrAccum = "";

  // stop our form submission from refreshing the page
  inEvent.preventDefault();

  if ( (!! strDomain) || (!! strPath) ){
    strAttrAccum += "{ ";
    
    if (!! strDomain){
      strAttrAccum += "domain: " + strDomain;
      
      if (!! strPath){
        strAttrAccum += ", ";
      }
    }
    
    if (!! strPath){
      strAttrAccum += "path: " + strPath;
    }
    
    strAttrAccum += " }";
    
    Cookies.set(TheForm_03_CookieName.value, TheForm_03_CookieValue.value, strAttrAccum);
  }else{
    Cookies.set(TheForm_03_CookieName.value, TheForm_03_CookieValue.value);
  }
  
  console.log(  "TheForm_03 Cookies.set()"
    +           ", name "   + TheForm_03_CookieName.value
    +           ", value "  + TheForm_03_CookieValue.value
    +           ", domain " + TheForm_03_CookieDomain.value
    +           ", path "   + TheForm_03_CookiePath.value
    +           ", attr "   + strAttrAccum
  );

  // reset form
  TheForm_03.reset();
}


// Adding DOM object listeners
function InitDomListeners(){
  TheForm_01.addEventListener("submit", Submit_TheForm_01 );
  TheForm_02.addEventListener("submit", Submit_TheForm_02 );
  TheForm_03.addEventListener("submit", Submit_TheForm_03 );
}// InitDomListeners




// See navigator.cookieEnabled property  --  https://www.w3schools.com/js/js_window_navigator.asp
// See document.cookie property          --  https://www.w3schools.com/js/js_cookies.asp
// + -- https://www.freecodecamp.org/news/everything-you-need-to-know-about-cookies-for-web-development/
// + -- https://html.com/resources/cookies-ultimate-guide/

function ResetTheCookiePb (){
  // Invalidate old parameter block fields.
  TheCookiePb.bIsValidated        = false;
  
  // Set things up.
  let bCheckCookiesEnabled = !! navigator.cookieEnabled;
 
  // Ready now.
  TheCookiePb.bIsValidated        = true;
  TheCookiePb.bCookiesEnabled = bCheckCookiesEnabled;
  
  // Write diagnostics.
  if (TheCookiePb.bIsValidated){
    console.log(  "ResetTheCookiePb() - "
      +           ", bCookiesEnabled " + TheCookiePb.bCookiesEnabled
      +           ", TheCookiePb is ready."
    );
  } else {
    console.log(  "ResetTheCookiePb() - "
      +           ", TheCookiePb is not ready."
    );
  }
} // ResetTheCookiePb



// ---------
// Kick off
// ---------
InitDomListeners();
ResetTheCookiePb();

