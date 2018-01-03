using System;
using System.Web;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqcars.Domain.Business;
using Minutesuae.AlIraq;
using Aliraqusedcars;

public partial class CarsModels : System.Web.UI.Page
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetModels()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc          
                                                           //var maker = Context.Request["maker"] ?? null;

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection}};

        // get all of data.
        var _ds = new Select().SelectLists("CarsMaker_SelectList", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows //.ToList()
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveModel(CarsModel scParam)
    {
        object data = new { };

        CarsModel item = new CarsModel() { ModelID = scParam.ModelID, MakerID = scParam.MakerID, TypeNameEn = scParam.TypeNameEn, TypeNameAr = scParam.TypeNameAr, CarSizeID = scParam.CarSizeID };

        bool status = new ModelsManager().SaveItem(item);
        if ((item.ModelID > 0 && item.TypeNameEn != null) || status)
        {
            //HttpContext.Current.Cache.Remove("Models");
            data = new
            {
                Status = true,
                Message = Resources.AdminResources_ar.SuccessSave
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorSave };


        return data;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FillDropList();
        }
    }

    private void FillDropList()
    {
        if (!IsPostBack)
        {
            HttpContext.Current.Cache.Remove("Models");
            FillLists.FillMakers(ddlMakerID);
        }
    }

    #endregion
}