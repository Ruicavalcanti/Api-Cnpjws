using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ConsumirCNPJReceita.Models
{
    public class CNPJWS
    {
        // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
        public class AtividadePrincipal
        {
            public string id { get; set; }
            public string secao { get; set; }
            public string divisao { get; set; }
            public string grupo { get; set; }
            public string classe { get; set; }
            public string subclasse { get; set; }
            public string descricao { get; set; }
        }

        public class AtividadesSecundaria
        {
            public string id { get; set; }
            public string secao { get; set; }
            public string divisao { get; set; }
            public string grupo { get; set; }
            public string classe { get; set; }
            public string subclasse { get; set; }
            public string descricao { get; set; }
        }

        public class Cidade
        {
            public int id { get; set; }
            public string nome { get; set; }
            public int ibge_id { get; set; }
            public string siafi_id { get; set; }
        }

        public class Estabelecimento
        {
            public string cnpj { get; set; }
            public List<AtividadesSecundaria> atividades_secundarias { get; set; }
            public string cnpj_raiz { get; set; }
            public string cnpj_ordem { get; set; }
            public string cnpj_digito_verificador { get; set; }
            public string tipo { get; set; }
            public string nome_fantasia { get; set; }
            public string situacao_cadastral { get; set; }
            public string data_situacao_cadastral { get; set; }
            public string data_inicio_atividade { get; set; }
            public object nome_cidade_exterior { get; set; }
            public string tipo_logradouro { get; set; }
            public string logradouro { get; set; }
            public string numero { get; set; }
            public string complemento { get; set; }
            public string bairro { get; set; }
            public string cep { get; set; }
            public string ddd1 { get; set; }
            public string telefone1 { get; set; }
            public object ddd2 { get; set; }
            public object telefone2 { get; set; }
            public object ddd_fax { get; set; }
            public object fax { get; set; }
            public object email { get; set; }
            public object situacao_especial { get; set; }
            public object data_situacao_especial { get; set; }
            public DateTime atualizado_em { get; set; }
            public AtividadePrincipal atividade_principal { get; set; }
            public Pais pais { get; set; }
            public Estado estado { get; set; }
            public Cidade cidade { get; set; }
            public object motivo_situacao_cadastral { get; set; }
            public List<InscricoesEstaduai> inscricoes_estaduais { get; set; }
        }

        public class Estado
        {
            public int id { get; set; }
            public string nome { get; set; }
            public string sigla { get; set; }
            public int ibge_id { get; set; }
        }

        public class InscricoesEstaduai
        {
            public string inscricao_estadual { get; set; }
            public bool ativo { get; set; }
            public DateTime atualizado_em { get; set; }
            public Estado estado { get; set; }
        }

        public class NaturezaJuridica
        {
            public string id { get; set; }
            public string descricao { get; set; }
        }

        public class Pais
        {
            public string id { get; set; }
            public string iso2 { get; set; }
            public string iso3 { get; set; }
            public string nome { get; set; }
            public string comex_id { get; set; }
        }

        public class Porte
        {
            public string id { get; set; }
            public string descricao { get; set; }
        }

        public class QualificacaoDoResponsavel
        {
            public int id { get; set; }
            public string descricao { get; set; }
        }

        public class Root
        {
            public string cnpj_raiz { get; set; }
            public string razao_social { get; set; }
            public string capital_social { get; set; }
            public string responsavel_federativo { get; set; }
            public DateTime atualizado_em { get; set; }
            public Porte porte { get; set; }
            public NaturezaJuridica natureza_juridica { get; set; }
            public QualificacaoDoResponsavel qualificacao_do_responsavel { get; set; }
            public List<object> socios { get; set; }
            public object simples { get; set; }
            public Estabelecimento estabelecimento { get; set; }
        }


    }
}