using System;


namespace Aliraqusedcars
{
    /// <summary>
    /// Summary description for DateConversion
    /// </summary>
    public static class DateConversion
    {
        static readonly log4net.ILog log = log4net.LogManager.GetLogger
                    (System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// Get DateTime from string like date in d/M/yyyy format.
        /// </summary>
        /// <param name="CurrentDateStr">Date as string</param>
        /// <param name="CurrentFormat">Current date format</param>
        /// <returns>Datetime?</returns>
        public static DateTime? FormalDate(string CurrentDateStr, string CurrentFormat)
        {
            // empty string
            if (string.IsNullOrEmpty(CurrentDateStr))
                return null;

            // default date format
            CurrentFormat = string.IsNullOrEmpty(CurrentFormat) ? "d/M/yyyy" : CurrentFormat;

            try
            {
                // Default website culture and date format like (20/02/2017)
                //IFormatProvider culture = new CultureInfo("en-GB", true);
                var newDate = DateTime.ParseExact(CurrentDateStr, CurrentFormat, null); //culture, DateTimeStyles.None);

                return newDate;
            }
            catch (Exception ex)
            {
                log.Error("CarDetails error", ex);
                return null;
            }
        }

        /// <summary>
        /// Formal Date d/m/y or /m/d/y
        /// </summary>
        /// <param name="CurrentDateStr">Current datetime in d/M/yyyy as default format</param>
        /// <returns>Datetime?</returns>
        public static DateTime? FormalDate(string CurrentDateStr)
        {
            // empty string
            if (string.IsNullOrEmpty(CurrentDateStr))
                return null;

            // default date format
            string CurrentFormat = "d/M/yyyy";

            try
            {
                // Default website culture and date format like (20/02/2017)
                var newDate = DateTime.ParseExact(CurrentDateStr, CurrentFormat, null);

                return newDate;
            }
            catch (Exception ex)
            {
                log.Error("CarDetails error", ex);
                return null;
            }
        }
    }
}