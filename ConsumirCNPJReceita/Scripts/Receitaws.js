//////////////////CNPJWS//////////////////////////
const botaoCnpj = document.querySelector("#buscarCnpj")
botaoCnpj.addEventListener("click", (e) => {

    //Desabilita os campos que serão atualizados
    desabilitaCampo();

    //Pega o cnpj
    const campoCnpj = document.querySelector("#cnpj").value;

    //Verifica se campo cnpj possui valor informado.
    if (campoCnpj !== "") {

        //Nova variável "cnpj" somente com dígitos.
        var cnpj1 = campoCnpj.replace("/", '');

        var cnpj = cnpj1.replace(".", '');

        //Expressão regular para validar o CNPJ.
        var validaCnpj = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/;

        //Valida o formato do CNPJ.
        if (validaCnpj.test(cnpj)) {

            fetch('Home/BuscarCNPJ/?cnpj=' + cnpj)

                .then((resp) => resp.json())
                .then(function (data) {
                    console.log(data)
                    callback_Receita(data)
                })
                .catch(function (error) {
                    console.log('Error ' + error.message);
                    limpa_formulario_cnpj();
                    document.getElementById("ErrorCnpj").innerText = error;

                });

        } else {
            limpa_formulario_cnpj();
            document.getElementById("ErrorCnpj").innerText = "CNPJ Inválido";
        }
    } else {
        limpa_formulario_cnpj();
        document.getElementById("ErrorCnpj").innerText = "CNPJ Não pode estar Vazio";
    }
});

function desabilitaCampo() {
    //Preenche os campos com "..." enquanto consulta webservice.
    document.getElementById('Razao_social').value = "...";
    document.getElementById('IE').value = "...";
    document.getElementById('IES').value = "...";
    document.getElementById('Fantasia').value = "...";
    document.getElementById('CEP').value = "...";
    document.getElementById('Endereco').value = "...";
    document.getElementById('Numero').value = "...";
    document.getElementById('Bairro').value = "...";
    document.getElementById('Complemento').value = "...";
    document.getElementById('Cidade').value = "...";
    document.getElementById('Telefone').value = "...";
    document.getElementById('Email').value = "...";
}
function callback_Receita(data) {
    if (!("erro" in data.Resultado)) {

        //Atualiza o campo inscrições estaduais

        //variavel pegando somente o campo de inscrições
        var inscricoes = data.Resultado.estabelecimento.inscricoes_estaduais;

        //Mostra o campo select com o array de inscrições
        var ele = document.getElementById('IES');
        ele.style.display = "block";

        //Verifica a quantidade de inscrições Estaduais
        for (var i = 0; i < inscricoes.length; i++) {
            //Insere dentro do select
            ele.innerHTML = ele.innerHTML + '<option value="' + inscricoes[i]['inscricao_estadual'] + '">' + inscricoes[i]['estado']['sigla'] + " " + inscricoes[i]['inscricao_estadual'] + '</option>';
        }
        //Esconde o input unico de inscrição estadual
        document.getElementById('IE').style.display = "none";

        //Atualiza os os outros campos com os valores.
        document.getElementById('Razao_social').value = data.Resultado.razao_social;
        document.getElementById('Fantasia').value = data.Resultado.estabelecimento.nome_fantasia;
        document.getElementById('CEP').value = data.Resultado.estabelecimento.cep;
        document.getElementById('Endereco').value = data.Resultado.estabelecimento.tipo_logradouro + " " + data.Resultado.estabelecimento.logradouro;
        document.getElementById('Numero').value = data.Resultado.estabelecimento.numero;
        document.getElementById('Bairro').value = data.Resultado.estabelecimento.bairro;
        document.getElementById('Complemento').value = data.Resultado.estabelecimento.complemento;
        document.getElementById('Cidade').value = data.Resultado.estabelecimento.cidade.nome;
        document.getElementById('Telefone').value = data.Resultado.estabelecimento.ddd1 + data.Resultado.estabelecimento.telefone1;
        document.getElementById('Email').value = data.Resultado.estabelecimento.email;
        document.getElementById("ErrorCnpj").innerText = "";
        console.log(data.Resultado.cnpj_raiz)
    }
    else {
        //Cnpj não Encontrado.
        limpa_formulario_cep();
        alert("CNPJ não encontrado.");
        document.getElementById('par').value = ("");
    }
}
function limpa_formulario_cnpj() {
    //Limpa valores do formulário do CNPJ.
    document.getElementById('Razao_social').value = "";
    document.getElementById('IE').value = "";
    document.getElementById('Fantasia').value = "";
    document.getElementById('CEP').value = "";
    document.getElementById('Endereco').value = "";
    document.getElementById('Numero').value = "";
    document.getElementById('Bairro').value = "";
    document.getElementById('Complemento').value = "";
    document.getElementById('Cidade').value = "";
    document.getElementById('Telefone').value = "";
    document.getElementById('Email').value = "";
}
/////////////////FIM CNPJWS//////////////////////////


//////////////////ESCONDE/MOSTRA CAMPOS CADASTRO CLIENTES//////////////////////////
const tipo = document.querySelector('select')
tipo.addEventListener("change", (e) => {
    switch (tipo.value) {
        case "Fisica":
            //MOSTRAR
            document.getElementById('divCPF').style.display = "block";
            document.getElementById('divRG').style.display = "block";
            document.getElementById('divNome').style.display = "block";
            document.getElementById('divNascimento').style.display = "block";
            document.getElementById('divApelido').style.display = "block";

            //ESCONDER
            document.getElementById('divCNPJ').style.display = "none";
            document.getElementById('divIE').style.display = "none";
            document.getElementById('divRazao').style.display = "none";
            document.getElementById('divFantasia').style.display = "none";

            break;
        case "Juridica":
            //MOSTRAR
            document.getElementById('divCNPJ').style.display = "block";
            document.getElementById('divIE').style.display = "block";
            document.getElementById('divRazao').style.display = "block";
            document.getElementById('divFantasia').style.display = "block";

            //ESCONDER
            document.getElementById('divCPF').style.display = "none";
            document.getElementById('divRG').style.display = "none";
            document.getElementById('divNome').style.display = "none";
            document.getElementById('divNascimento').style.display = "none";
            document.getElementById('divApelido').style.display = "none";
            break;
        case "Rural":
            //MOSTRAR
            document.getElementById('divCPF').style.display = "block";
            document.getElementById('divIE').style.display = "block";
            document.getElementById('divNome').style.display = "block";
            document.getElementById('divNascimento').style.display = "block";
            document.getElementById('divApelido').style.display = "block";

            //ESCONDER
            document.getElementById('divCNPJ').style.display = "none";
            document.getElementById('divRG').style.display = "none";
            document.getElementById('divRazao').style.display = "none";
            document.getElementById('divFantasia').style.display = "none";
            break;
    }

});
////////////////// FIM ESCONDE/MOSTRA CAMPOS//////////////////////////

///////////////////VALIDAÇÃO/////////////////////////////////////////
const cpf = document.getElementById('cpf');
cpf.addEventListener("blur", (e) => {
    var retirarPonto = cpf.value.replace(".", "")
    var retirarHifen = retirarPonto.replace("-", "")
    var strCPF = retirarHifen;
    var Soma;
    var Resto;
    Soma = 0;
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (strCPF == "00000000000") {
        document.getElementById("ErrorCnpj").innerText = "CPF Inválido";
        return false;
    }
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) {
        document.getElementById("ErrorCnpj").innerText = "CPF Inválido";
        return false;
    }
    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) {
        document.getElementById("ErrorCnpj").innerText = "CPF INVÁLIDO";
        return false;
    }
    document.getElementById("ErrorCnpj").innerText = "";
    alert("Validado");
    return true;

});
//////////////////FIM VALIDAÇÃO//////////////////////////////////////
