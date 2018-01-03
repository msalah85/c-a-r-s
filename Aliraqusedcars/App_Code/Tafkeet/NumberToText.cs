using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tafkeet
{
    public class NumberToText
    {
        
        // =====================================================using it============
        // var valAlphabit = Tafkeet.NumberToText.ConvertToArabic(amountNumber); 
        // =====================================================using it============

        static string[] digit_1 = new string[] { "", "واحد", "إثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة" };
        static string[] digit_2 = new string[] { "", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون" };
        static string[] digit_3 = new string[] { "", "مئة", "مئتين", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمنمائة", "تسعمائة" };

        static public string ConvertToArabic(ulong number)
        {
            string num = string.Format("{0:N}", number);
            num = num.Remove(num.IndexOf('.'));
            string[] parts = num.Split(',');
            num = "";
            for (int i = 0; i < parts.Length; i++)
            {
                string t = "";
                ulong current_part = ulong.Parse(parts[i]);

                // الأعداد المفردة تأخذ تمييز الجمع وهي الأعداد من ثلاثة الي عشرة 
                bool b = (current_part > 2 && current_part < 11);
                //
                switch (parts.Length - i)
                {
                    case 2: t = (b ? " ألاف" : " ألف"); break;
                    case 3: t = (b ? " ملايين" : " مليون"); break;
                    case 4: t = (b ? " مليارات" : " مليار"); break;
                    case 5: t = (b ? " تريليونات" : " تريليون "); break;
                    case 6: t = (b ? " بليارات" : " بليار"); break;
                    case 7: t = (b ? " كوينتليونات" : " كوينتليون"); break;
                }
                num += (i != 0 && current_part != 0 ? " و " : "");
                if (current_part == 1 && parts.Length - i > 1)
                {
                    num += t;
                }
                else if (current_part == 2 && parts.Length - i > 1)
                {
                    num += t + "ان";
                }
                else
                {
                    switch (current_part.ToString().Length)
                    {
                        case 1:
                            num += convertOneDigits(current_part);
                            break;
                        case 2:
                            num += convertTwoDigits(current_part);
                            break;
                        case 3:
                            num += convertThreeDigit(current_part);
                            break;
                    }

                    //اضافة التمييز للعدد (هل هو الاف أم ملايين أم غير ذلك
                    num += (current_part != 0 ? t : "");
                }

            }
            return num;
        }

        static string convertOneDigits(ulong OneDigits)
        {
            return digit_1[OneDigits];
        }
        static string convertTwoDigits(ulong x)
        {
            if (x == 10)
                return "عشرة";
            if (x == 11)
                return "احدي عشر";
            if (x == 12)
                return "اثني عشر";
            else
            {
                if (x / 10 == 1)
                    return digit_1[x % 10] + " عشر";
                else
                    return digit_1[x % 10] + (x % 10 == 0 ? "" : " و ") + digit_2[x / 10];
            }
        }
        static string convertThreeDigit(ulong x)
        {
            ulong last_two = x % 100;
            return digit_3[x / 100] + (last_two == 0 ? "" : " و ") +
                (last_two < 10 ? convertOneDigits(last_two) : convertTwoDigits(last_two));
        }
        static bool custom(ulong x)
        {
            //you can extend this حتة
            return new ulong[] { 1, 2 }.Contains(x);
        }
    }
}
