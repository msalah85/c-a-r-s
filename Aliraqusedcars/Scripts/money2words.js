
// using
// var words =  toWords(1532323);

// American Numbering System
//var th = ['', '', 'million', 'billion', 'trillion'];
// uncomment this line for English Number System
var th = ['', 'ألفا', 'مليونا', 'بليون', 'تريليون'],
dg = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'],
tn = ['عشرة', 'إحدي عشر', 'إثني عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'],
tw = ['عشرين', 'ثلاثين', 'أربعين', 'خمسين', 'ستين', 'سبعين', 'ثمانين', 'تسعين'],

hd = ['مائه', 'مائتان', 'ثلاثمائه', 'أربعمائه', 'خمسمائه', 'ستمائه', 'سبعمائه', 'ثمانمائه', 'تسعمائه'],

//var th = ["", "Thousand", "Million", "Billion", "Trillion"],
//dg = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"],
//tn = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"],
//tw = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],

toWords = function (inputNumber) {

    inputNumber = inputNumber.toString();
    inputNumber = inputNumber.replace(/[\, ]/g, '');

    var x = s.indexOf('.');





    return inputNumber.replace(/\s+/g, ' ');

    ////////////////////


    //s = s.toString(); s = s.replace(/[\, ]/g, '');
    //if (s != parseFloat(s)) return '';
    //var x = s.indexOf('.');
    //if (x == -1) x = s.length; if (x > 15) return 'رقم كبير جداً'; var n = s.split(''); var str = ''; var sk = 0; for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += tn[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += tw[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += dg[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'مائه '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += th[(x - i - 1) / 3] + ' '; sk = 0; } } if (x != s.length) { var y = s.length; str += '. '; for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' '; }

    //return str.replace(/\s+/g, ' ');
};



//////////////////////////////////////////////////////////////////////////
//function numinwrd() {
//    var numbr = document.getElementById('num').value;
//    var str = new String(numbr)
//    var splt = str.split("");
//    var rev = splt.reverse();
//    var once = ['Zero', ' One', 'Two', 'Three', 'Four',
//    'Five', 'Six', 'Seven', 'Eight', 'Nine'];var twos=['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];var tens=[ '', 'Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety' ];numlen=rev.length;var word=new Array();var j=0;
//    for(i=0;i<numlen;i++){switch(i){case 0:if((rev[i]==0) || (rev[i+1]==1)){word[j]='';
//    }else{word[j]=once[rev[i]];}word[j]=word[j] ;break;case 1:abovetens();
//        break;case 2:if(rev[i]==0){word[j]='';} else if((rev[i-1]==0) || (rev[i-2]==0) ){word[j]=once[rev[i]]+"Hundred ";
//        }else {word[j]=once[rev[i]]+"Hundred and";} break;case 3:if(rev[i]==0 || rev[i+1]==1){word[j]='';
//        } else{word[j]=once[rev[i]];}if((rev[i+1]!=0) || (rev[i] > 0)){word[j]= word[j]+" Thousand";}break;
//        case 4:abovetens(); break;
//        case 5:if((rev[i]==0) || (rev[i+1]==1)){word[j]='';
//        } else{word[j]=once[rev[i]];}word[j]=word[j]+"Lakhs";break;
//        case 6:abovetens(); break;case 7:if((rev[i]==0) || (rev[i+1]==1)){word[j]='';
//        } else{word[j]=once[rev[i]];}word[j]= word[j]+"Crore";break;
//        case 8:abovetens(); break;
//        default:break;}j++;
//    } function abovetens()
//    {if(rev[i]==0){word[j]='';} else if(rev[i]==1){word[j]=twos[rev[i-1]];}else{word[j]=tens[rev[i]];}
//    }
//    word.reverse();
//    var finalw='';
//    for(i=0;i<numlen;i++)
//    {finalw= finalw+word[i];
//    }
//    document.getElementById('number').innerHTML=finalw;
//}

//function ctck() {
//    var sds = document.getElementById("dum");
//    if (sds == null) { alert("You are using a free package.\n You are not allowed to remove the tag.\n"); }
//    var sdss = document.getElementById("dumdiv");
//    if (sdss == null) { alert("You are using a free package.\n You are not allowed to remove the tag.\n"); }
//}

//document.onload ="ctck()";
