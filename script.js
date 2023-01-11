const valorConta = document.querySelector('#conta');
const porcentagem = document.querySelectorAll('#btnsPorcent button');
const numPessoas = document.querySelector('#numPessoas');
const valorGorjeta = document.querySelector('.valor-gorjeta');
const valorTotal = document.querySelector('.valor-total');
const btnCustom = document.querySelector('#custom');
const verificaPessoas = document.querySelector('#verifica-pessoas');
const valorPorcentAtualizado = document.querySelector('#input-values');

const calculaGorPessoa = () => {
  const totalComPorcentPessoa = ((valorConta.value * valorPorcentAtualizado.value) / numPessoas.value);
  return totalComPorcentPessoa;
};

const calculaGorTotal = () => {
  const totalComPorcent = (valorConta.value * valorPorcentAtualizado.value);
  return totalComPorcent;
};

const atualizaInputValues = (valor) => {
  console.log(valor, valorPorcentAtualizado);
  valorPorcentAtualizado.value = valor;
};

const limpaCampos = () => {
  const btnReset = document.querySelector('.btn-reset');
  btnReset.addEventListener('click', event => {
    event.preventDefault();
    valorConta.value = '';
    numPessoas.value = '';
    btnCustom.value = '';
    valorGorjeta.innerHTML = 'R$0.00';
    valorTotal.innerHTML = 'R$0.00';
    verificaPessoas.style.display = 'none';
  });
};

const verificaNumPessoas = () => {
  if (numPessoas.value < 0 || numPessoas.value === '0') {
    verificaPessoas.style.display = 'block';
    return false;
  }
  return true;
};

const verificaValorConta = () => {
  if (valorConta.value < 0) {
    alert('Valor da conta não pode ser negativo ou 0');
    return false;
  }
  return true;
};

const verifica = () => (valorConta.value === '' || numPessoas.value === '') ? false : true;

const calculaPorcentagem = () => {
  valorGorjeta.innerHTML = `R$${calculaGorPessoa().toFixed(2)}`;
  valorTotal.innerHTML = `R$${calculaGorTotal().toFixed(2)}`;
};

const eventosPorcentagem = () => {
  porcentagem.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      atualizaInputValues(btn.value);
      verificaValorConta();
      if(!verifica() || !verificaNumPessoas()) return;
      calculaPorcentagem();
    });
  });

  btnCustom.addEventListener('keyup', event => {
    event.preventDefault();
    const valorCustomPorcent = btnCustom.value * 0.01;
    atualizaInputValues(valorCustomPorcent);
    verificaValorConta();
    if(!verifica() || !verificaNumPessoas()) return;
    calculaPorcentagem();
  });

  numPessoas.addEventListener('keyup', event => {
    event.preventDefault();
    verificaValorConta();
    if(!verifica() || !verificaNumPessoas()) return;
    calculaPorcentagem();
  });

  valorConta.addEventListener('keyup', event => {
    event.preventDefault();
    verificaValorConta();
    if(!verifica() || !verificaNumPessoas()) return;
    calculaPorcentagem();
  });
  
  limpaCampos();
};

const init = () => {
  eventosPorcentagem();
}

init();