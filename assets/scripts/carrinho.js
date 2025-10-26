const produtos = document.querySelectorAll('.produto');
const quantidadeProd = document.getElementById('quantCarrinhoProd')
const valorProdutos = document.getElementById('valorProdutos')
const subTotal = document.getElementById('subTotal')

const descontoButton = document.getElementById("descontoButton")
const cupom = document.getElementById("cupom")
const textoPop = document.getElementById('popUpId')
descontoButton.addEventListener('click', cupomDesconto)

const cep = document.getElementById('cep')

let calcFrete = calculateFreight(cep.value)
let freteEconomicaCalc = calcFrete - 3
let fretePadraoCalc = (calcFrete + 4)
let freteExpressCalc = (calcFrete + 13)

const invalidFeed = document.getElementById('invalidFeed')

let total = 1;

produtos.forEach(produto => {
    const preco = parseFloat(produto.getAttribute('data-preco'));
    const quantidade = parseInt(produto.getAttribute('data-quantidade'));
    total += preco * quantidade;
});

valorProdutos.textContent  = "R$ " + total.toFixed(2) 
subTotal.textContent  = total.toFixed(2) 

function valorProd(idProduto) {
    const quantidadeProd = document.getElementById(`total-price-${idProduto}`);
    quantidadeProd.textContent = "R$ " + quantidadeProd.getAttribute("data-preco")
}  

valorProd('produto1')
valorProd('produto2')

function adicionarProduto(idProduto) {
    const produto = document.getElementById(idProduto);
    const preco = parseFloat(produto.getAttribute('data-preco'));
    let quantidade = parseInt(produto.getAttribute('data-quantidade'));
  
    quantidade += 1;
    produto.setAttribute('data-quantidade', quantidade);
    produto.querySelector('#quantCarrinhoProd').textContent = quantidade;
  
    const quantidadeProd = document.getElementById(`total-price-${idProduto}`);
    const novoTotal = (preco * quantidade).toFixed(2);
    quantidadeProd.textContent = "R$ "+ novoTotal;
    quantidadeProd.setAttribute('data-quantidade', quantidade);
  
    atualizarTotalCompra()
}

function removerProduto(idProduto) {
    const produto = document.getElementById(idProduto);
    const preco = parseFloat(produto.getAttribute('data-preco'));
    let quantidade = parseInt(produto.getAttribute('data-quantidade'));
  
    if (quantidade > 1) {
      quantidade -= 1;
      produto.setAttribute('data-quantidade', quantidade);
      produto.querySelector('#quantCarrinhoProd').textContent = quantidade;
  
      const totalPriceSpan = document.getElementById(`total-price-${idProduto}`);
      const novoTotal = (preco * quantidade).toFixed(2);
      totalPriceSpan.textContent = "R$ "+ novoTotal;
      totalPriceSpan.setAttribute('data-quantidade', quantidade);
  
      atualizarTotalCompra();
    }
  }
  
function atualizarTotalCompra() {
    const produtos = document.querySelectorAll('.produto');
    let total = 1;

    produtos.forEach(produto => {
    const preco = parseFloat(produto.getAttribute('data-preco'));
    const quantidade = parseInt(produto.getAttribute('data-quantidade'));
    total += preco * quantidade;
    });

    subTotal.textContent = total.toFixed(2);
}

function validar(input, id) {
    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    id.style.display = 'none'
}

function invalidar(input, id) {
    input.classList.add('is-invalid')
    id.style.display = 'block';
}

function cupomDesconto() {
    if(cupom.value === "MOTHER10") {
        descontoButton.setAttribute("data-bs-toggle", "modal")

        const produtos = document.querySelectorAll('.produto');
        let total = 1;
    
        produtos.forEach(produto => {
            const preco = parseFloat(produto.getAttribute('data-preco'));
            const quantidade = parseInt(produto.getAttribute('data-quantidade'));
            total += preco * quantidade;
        });

        let por10 = total * 0.10
        let cupom10 = (total - por10).toFixed(2)

        textoPop.textContent = "Cupom de 10% aplicado"
        validar(cupom, cupomInv)
        subTotal.textContent = "R$ "+ cupom10 

        descontoButton.click();

    } else if(cupom.value === "") {
        descontoButton.setAttribute("data-bs-toggle", "")

        subTotal.textContent = total.toFixed(2)
        cupom.classList.remove('is-valid')
        invalidar(cupom, cupomInv)
    
        setTimeout(() => {
          cupom.classList.remove('is-invalid');
          cupomInv.style.display = 'none'
        }, 2000);
    }else {
        descontoButton.setAttribute("data-bs-toggle", "")

        subTotal.textContent = total.toFixed(2)
        cupom.classList.remove('is-valid')
        invalidar(cupom, cupomInv)
    
        setTimeout(() => {
          cupom.classList.remove('is-invalid');
          cupomInv.style.display = 'none'
        }, 2000);
    }
}

const radioFrete1 = document.getElementById("radioFrete1")
const radioFrete2 = document.getElementById("radioFrete2")
const radioFrete3 = document.getElementById("radioFrete3")
const btnBuscar = document.getElementById('cepButton')

btnBuscar.addEventListener('click', buscarEnderecoPorCep)

radioFrete1.addEventListener("click", function() {
    valorProdsComFrete()
})

radioFrete2.addEventListener("click", function() {
    valorProdsComFrete()
})

radioFrete3.addEventListener("click", function() {
    valorProdsComFrete()
})

function valorProdsComFrete() {
    /* const tot = subTotal.textContent = total.toFixed(2) */

    let por10 = total * 0.10
    let cupom10 = total - por10

    if (radioFrete1.checked && cupom.value === "MOTHER10" && !cep.classList.contains("is-invalid")) {
        freteResumo.textContent = "R$ "+freteEconomicaCalc.toFixed(2)
        subTotal.textContent = (cupom10+freteEconomicaCalc).toFixed(2)
    } else if (radioFrete1.checked && !cep.classList.contains("is-invalid") && cep.value !== "") {
        freteResumo.textContent = "R$ "+freteEconomicaCalc.toFixed(2)
        subTotal.textContent = (total+freteEconomicaCalc).toFixed(2)
    }

    if (radioFrete2.checked && cupom.value === "MOTHER10" && !cep.classList.contains("is-invalid")) {
        freteResumo.textContent = "R$ "+fretePadraoCalc.toFixed(2)
        subTotal.textContent = (cupom10+fretePadraoCalc).toFixed(2)
    } else if (radioFrete2.checked && !cep.classList.contains("is-invalid")  && cep.value !== "") {
        freteResumo.textContent = "R$ "+fretePadraoCalc.toFixed(2)
        subTotal.textContent = (total+fretePadraoCalc).toFixed(2)
    }

    if (radioFrete3.checked && cupom.value === "MOTHER10" && !cep.classList.contains("is-invalid")) {
        freteResumo.textContent = "R$ "+freteExpressCalc.toFixed(2)
        subTotal.textContent = (cupom10+freteExpressCalc).toFixed(2)
    } else if (radioFrete3.checked && !cep.classList.contains("is-invalid")  && cep.value !== "") {
        freteResumo.textContent = "R$ "+freteExpressCalc.toFixed(2)
        subTotal.textContent = (total+freteExpressCalc).toFixed(2)
    }

}

function buscarEnderecoPorCep() {

    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado. Tente novamente.');
        } else {

            frete1.textContent = "Entrega Econômica R$ " + freteEconomicaCalc.toFixed(2)
            frete2.textContent = "Entrega Padrão R$ " + fretePadraoCalc.toFixed(2)
            frete3.textContent = "Entrega Express R$ " + freteExpressCalc.toFixed(2)
            valorProdsComFrete()

        }
      })
      .catch(error => {
        alert('Erro ao buscar o CEP:', error);
    });

}

function calculateFreight(cep) {
  return Math.random() * 20 + 5;
}

/* validação cep */
function validarCep() {
    if (cep.value.length < 9 ) {
        invalidar(cep, cepInv);
    }else {
        validar(cep, cepInv)
    }
}

function mascararCep() {
  let cepValue = cep.value.replace(/\D/g, '');

  if(cepValue.length > 0) {
    cepValue = cepValue.replace(/(\d{3})(\d{3})$/, "$1-$2");
  }

  cep.value = cepValue;
}

cep.addEventListener('input', () => {
  mascararCep();
  validarCep();
});

function validarInputs(id, idInv) {
  if(id.value === '') {
    invalidar(id, idInv)
  }else {
    validar(id, idInv)
  }
}



