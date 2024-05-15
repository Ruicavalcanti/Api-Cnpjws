using ConsumirCNPJReceita.Models;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Mvc;
using static ConsumirCNPJReceita.Models.CNPJWS;

namespace ConsumirCNPJReceita.Controllers
{
    public class HomeController : Controller
    {  
        HttpClient cnpjws = new HttpClient();

        public HomeController()
        {
            cnpjws.BaseAddress = new Uri("https://publica.cnpj.ws/cnpj/");
            cnpjws.DefaultRequestHeaders.Accept.Clear();
            cnpjws.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

            public ActionResult Index()
        {
            string cnpj = Request["cnpj"];
            if (cnpj != null)
            {

                try
                {
                    HttpResponseMessage resposta = cnpjws.GetAsync(cnpj).Result;
                    if (resposta.IsSuccessStatusCode)
                    {
                        var empresa = resposta.Content.ReadAsAsync<PessoaJuridica>().Result;
                        return View(empresa);
                    }
                    else
                    {
                        ViewBag.Error = resposta.StatusCode;
                        return View();
                    }

                }
                catch (Exception)
                {


                    return View();

                }
            }
            return View();
        }


        public ActionResult BuscarCNPJ()
        {
            try
            {
                //Pegar o cnpj enviado
                string cnpj = Request["cnpj"];

                //Requisição passando o Cnpj 
                HttpResponseMessage resposta = cnpjws.GetAsync(cnpj).Result;

                //Se a resposta for positiva
                if (resposta.IsSuccessStatusCode)
                {
                    //Desserializa o conteudo da resposta para uma variavel
                    var empresa = resposta.Content.ReadAsAsync<Root>().Result;

                    //Retorna a variavel json
                    return Json(new { Resultado = empresa }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    // Se a Requsição falhar retorne o código de Erro
                    ViewBag.Error = resposta.StatusCode;
                    return View();
                }

            }
            catch (Exception e)
            {
                var error = e.Message;

                return View();

            }
        }
    }
}