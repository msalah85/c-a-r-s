// JavaScript Document
//EMail Validation
function echeck(str) {

		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Invalid E-mail")
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Invalid E-mail")
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Invalid E-mail")
		    return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		    alert("Invalid E-mail")
		    return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Invalid E-mail")
		    return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    alert("Invalid E-mail")
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    alert("Invalid E-mail")
		    return false
		 }

		 var arrStr;
		 arrStr = str.split(".");
		 var strDotVal = arrStr[arrStr.length-1] 
		 if(strDotVal.length<2)
		 {
		    alert("Invalid E-mail")
		    return false
		 }

 		 return true					
	}


//Java script function trim string 
function JSTrim(str)
{
	return str=str.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
}

//Required field validation
function FieldIsNull(objField,strMessage)
{
	if (JSTrim(objField.value)=='')
	{
		alert(strMessage);
    	objField.focus();
    	return true;
    }
	return false;
 }
 
 //Minmum field length validation
function CheckLength(objField,intLength,strMaxMin,strAlertval)
{
	var str=objField.value
	if(strMaxMin=='Minimum')
	{
		if (str.length<intLength)
		{
			alert("Minimum " + intLength + " " + strAlertval);
			objField.focus();
			return true;
		}
	}
	else
	{
		if (str.length>intLength)
		{
			alert("Maximum " + intLength + " " + strAlertval);
			objField.focus();
			return true;
		}
	}
	return false;
 }

//Date validation
function checkDate(get)
{
   var rdate = get.value
   rdate = rdate.toString()
   if (rdate == "")    {return false;}
   if ((rdate.indexOf("/",0) != 2) ||
(rdate.indexOf("/",3) != 5))
   {
       alert("Please enter the date in DD/MM/YYYY format")
       get.focus();
       return false;
   }
   for (i=0; i<rdate.length; i++)
   {
       var oneChar = rdate.charAt(i)
       if (oneChar == "/")    {continue;}
       if (oneChar < "0" || oneChar > "9") 
       {
           alert(" Enter a valid number ");
           get.focus();
           return false
       }
   }
   var dt = rdate.substring(0,2)
   var mo = rdate.substring(3,5)
   var ye = rdate.substring(6,10)
   if (ye.length != 4)
   {
       alert("Year must be in 4 digits")
       get.focus();
       return false;
   }
   yr = parseInt(ye)
   var con = true
   if ((mo<="00" || mo>"12") || (dt<="00" || dt>"31") ||
yr<=0)
   {
       alert(" Enter a valid date ")
       con = false
   }
   if ((mo==4 || mo==6 || mo==9 || mo==11) && dt==31) 
   {
       alert("Month "+mo+" doesn't have 31 days!")
       con = false
   }
   if (mo == 2)
   {
       var isleap = (yr % 4 == 0 && (yr % 100 != 0 || yr % 400 == 0));
       if (dt>29 || (dt==29 && !isleap)) 
       {
           alert("February " + yr + " doesn't have " + dt + "days!");
           con = false
       }
   }
   if (con == false)
   {
       get.focus()
       return false;
   }
   return true;
}

var newwindow;
function popupWindowRisk(url,name)
{
	newwindow=window.open(url,name,'height=602,width=640,scrollbars=no,resizable=no');
	if (window.focus) {newwindow.focus()}
}

function popupWindowFinanceCalc(url,name)
{
	newwindow=window.open(url,name,'height=768,width=1024,scrollbars=no,resizable=no');
	if (window.focus) {newwindow.focus()}
}



var newwindow;
function popupWindow(url,name)
{
	newwindow=window.open(url,name,'height=600,width=1000,scrollbars=yes,resizable=yes');
	if (window.focus) {newwindow.focus()}
}

var newwindow;
function popupWindowNew(url,name)
{

	newwindow=window.open(url,name,'height=500,width=600,scrollbars=yes,resizable=no');
	if (window.focus) {newwindow.focus()}
}

var newwindow;
function PopupLink(url,name,height,width,sbars,resize)
{
	newwindow=window.open(url,name,'height='+ height +',width='+ width +',scrollbars='+ sbars +',resizable='+ resize);
	if (window.focus) {newwindow.focus()}
}

//Date diff function
function returnDays(startDate,endDate)
{

var SmonthDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var EmonthDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var sdate=startDate.value;
var sdt = parseInt(sdate.substring(0,2));
var smo = parseInt(sdate.substring(3,5));
var syr = parseInt(sdate.substring(6,10));
var edate=endDate.value;
var edt = parseInt(edate.substring(0,2));
var emo = parseInt(edate.substring(3,5));
var eyr = parseInt(edate.substring(6,10));


// since parseInt(09) or (08) gives 0 so this logic
if (sdate.substring(0,2)=="08")
sdt=8;
if (sdate.substring(0,2)=="09")
sdt=9;
if (sdate.substring(3,5)=="08")
smo=8;
if (sdate.substring(3,5)=="09")
smo=9;
if (edate.substring(0,2)=="08")
edt=8;
if (edate.substring(0,2)=="09")
edt=9;
if (edate.substring(3,5)=="08")
emo=8;
if (edate.substring(3,5)=="09")
emo=9;
// end of the parseInt logic 


// since month array starts from zero and month number starts from 1
smo=smo-1;
emo=emo-1;

var isLeapStartYear=(syr % 4 == 0 && (syr % 100 != 0 || syr % 400 == 0));
if (isLeapStartYear==true)
SmonthDays[1]=29;

var isLeapEndYear=(eyr % 4 == 0 && (eyr % 100 != 0 || eyr % 400 == 0));
if (isLeapEndYear==true)
EmonthDays[1]=29;

if (syr==eyr) // for same year 
{
	if(smo==emo) // both date in same month
	{
		return edt-sdt;
	}
				// else check for diff month 
	var nday=SmonthDays[smo]-sdt;
	var tempDays=0;
	smo=smo+1;
	while(emo > smo)
	{
		tempDays=tempDays+SmonthDays[smo];
		smo=smo+1;
	}
	nday=nday+tempDays+edt;
	return nday;
}




// check for diff in years
var Ydays=0
syr=syr+1;
while(eyr > syr)
{
	if(syr % 4 == 0 && (syr % 100 != 0 || syr % 400 == 0))
		{
		Ydays=Ydays+366; // add 366 days for leap year
		}
	else
		{
		Ydays=Ydays+365;  // add 365 days for non leap years
		}
	syr=syr+1
}


var sTempDays=SmonthDays[smo]-sdt;
smo=smo+1;

for(var i=smo;i<12;i++)
	sTempDays=sTempDays+SmonthDays[i];

var eTempDays=0

for(var j=0;j<emo;j++)
	eTempDays=eTempDays+EmonthDays[j];

eTempDays=eTempDays+edt;



return Ydays+sTempDays+eTempDays;


}

//Function to set combo selection
function SetComboSelect(objField,strValue)
{

	for(i=0;i<objField.length;i++)
	{
		if(objField.options[i].value==strValue)
		{
			objField[i].selected=true;
			
		}
	}
}

//Delete confirm Function
function fnConfirmDelete(strMessage)
{
	return confirm(strMessage);
}

// check is numeric
function FieldIsNumeric(objField)
{
	if(isNaN(objField.value)==true)
	{
		alert('Enter numeric value');
		objField.value="";
		objField.focus();
		return false;
	}
	return true;
}


function isSplChar(str)
{
iChars="!@#$%^&*()+=-\\\';,./{}|\":<>?~_";
for(var i=0;i<str.value.length;i++)
{
  if(iChars.indexOf(str.value.charAt(i))!=-1)
    {
    alert("special characters are not allowed");
    str.focus();
    return false;
    }
  }

}

function isSplCharCode(str)
{
iChars="!@#$%^&*()+=\\\';,./{}|\":<>?~";
for(var i=0;i<str.value.length;i++)
{
  if(iChars.indexOf(str.value.charAt(i))!=-1)
    {
    alert("special characters are not allowed");
    str.focus();
    return false;
    }
  }

}



// check is FieldIsZero
function FieldIsZero(objField)
{
	if(objField.value==0)
	{
		alert('Enter valid value');
		objField.focus();
		return true;
	}
	return false;
}



function OnKeypressNumericfilter(event,Reference)
{
     var keycode;
     if (document.all)
     {
      keycode=event.keyCode;
     }
     else
     {
      keycode=event.which;
     }

     if ( (keycode==0) || (keycode==8) || (keycode==9) || (keycode==127) || (keycode>47)&&(keycode<59))
     {
      return(true);
     }
     else
     {
      return(false);
     }
}


function OnKeypressAlphafilter(event,Reference)
{
	
     var keycode;
     if (document.all)
     {
      keycode=event.keyCode;
     }
     else
     {
      keycode=event.which;
     }
	if((keycode==0) || (keycode==8) || (keycode==9) || (keycode>=65 && keycode<=90))
     {
      return(true);
     }
	else if(keycode>=97 && keycode<=122)
     {
      return(true);
     }
	else if(keycode==32)
     {
      return(true);
     }
	else
     {
      return(false);
     }

}


function OnKeypressAlphaNumfilter(event,Reference)
{
	
     var keycode;
     if (document.all)
     {
      keycode=event.keyCode;
     }
     else
     {
      keycode=event.which;
     }
	if( (keycode==0) || (keycode==8) || (keycode==9) || (keycode>=65 && keycode<=90))
     {
      return(true);
     }
	else if(keycode>=97 && keycode<=122)
     {
      return(true);
     }
	else if(keycode>=48 && keycode<=57)
     {
      return(true);
     }
	else if(keycode==32)
     {
      return(true);
     }
	else
     {
      return(false);
     }

}


function clearError(objErr)
{
	var divErr;
	divErr=document.getElementById(objErr).style.visibility='hidden';
}

function takeme(sel)
{
                  if (sel.selectedIndex == 4 && sel.options[sel.selectedIndex].value == "#")
                  {
                  open_win2();
                  }else
                 //  if(sel.selectedIndex !=2 && sel.selectedIndex !=3)
                  {
                    location= sel.options[sel.selectedIndex].value
                  }
}

   function pdflink(mypdf)
    {
     if (mypdf.value == "" || mypdf.value == "#")
      {
       alert("Please select any value");
       mypdf.focus();
      }
     else
      {
       window.open(mypdf.value,"_blank","toolbar=no, location=no, status=no,width=800,resizable=yes")
      }
       event.returnValue = "";
       event.cancelbubble = true;
    }

function resetOffer(sect,sectname)
 {	
	var divs = document.getElementsByTagName('div'); 
	for(var i=0;i<divs.length;i++)
	{ 
	  var div=divs[i]
	  if(div.id.indexOf(sect)!= -1)
		{
		  if(div.id.indexOf(sectname)== -1)
		  {   div.style.display='none'; }
		}
   }
 }	
 		 	
function showOffer(value)
   { 
   
	 var div=document.getElementById(value);
	 if(div.style.display=='none')
	 
	  	{ div.style.display=''; }
      else
	 {   
	     div.style.display='none';
		 
	  } 
   }

function Popup_Offer(url,width,height)
{
	newwindow=window.open(url,'','height='+height+',width='+width+',resizable=yes');
	if (window.focus) {newwindow.focus()}
}

function OpenMaxWindow(url) {
    var options = 'scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no';
    options += ',width=' + screen.availWidth + ',height=' + screen.availHeight;
    options += ',screenX=0,screenY=0,top=0,left=0';
    var win = window.open(url, '', options);
    win.focus();
    // win.moveTo(0, 0);
    // win.resizeTo(screen.availWidth, screen.availHeight);
}

<!--  Begin ASK TO CONFIRM
function askToConfirm() {

if (confirm("By proceeding to view the materials to which this gatepost gives access, you warrant that you are not located in the United States and you agree that you will not transmit or otherwise send any information contained in this website to any person in the United States or to publications with a general circulation in the United States.")) {
window.location="http://www.adcb.com/Images/MGM_CC_TC_09_tcm7-10042.pdf"
}

else {
return false;
//window.location="http://www.adcb.com/aboutus/investorrelations/investorrelations.asp"
   }   

}

function ConfirmationLink(strConfirmationMessage,strConfirmLink,strUnconfirmLink,strUnconfirmMsg)
{
      if (confirm(strConfirmationMessage))
      {
            window.location = strConfirmLink;
      }
      else
      {
            if(strUnconfirmLink == "") 
            {

                    if(strUnconfirmMsg != "") 
                            {
                       alert(strUnconfirmMsg);
                             }
    
           return false;

            }
            else
            {
                  window.location = strUnconfirmLink;
            }
   }   

}



function ConfirmationLink2(strConfirmationMessage,strConfirmLink,strUnconfirmLink,strUnconfirmMsg)
{
      if (confirm(strConfirmationMessage))
      {
           conf2 =  window.open(strConfirmLink);
           conf2.focus();

      }
      else
      {
            if(strUnconfirmLink == "") 
            {

                    if(strUnconfirmMsg != "") 
                            {
                       alert(strUnconfirmMsg);
                             }
    
           return false;

            }
            else
            {
                  window.location = strUnconfirmLink;
            }
   }   

}

function validateEmail(form_id,email)
{
	var reg=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address=document.forms[form_id].elements[email].value;
	if(reg.test(address)==false)
	 {
		alert("Invalid E-mail");
		return false;
 	}
}

// End ASK TO CONFIRM -->