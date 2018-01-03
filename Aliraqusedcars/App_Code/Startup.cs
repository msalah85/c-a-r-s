using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Aliraqusedcars.Startup))]
namespace Aliraqusedcars
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
