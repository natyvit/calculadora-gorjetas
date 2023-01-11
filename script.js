const valorConta = document.querySelector('.conta');
const porcentagem = document.querySelectorAll('#btnsPorcent button');
const numPessoas = document.querySelector('#numPessoas');
const valorGorjeta = document.querySelector('.valor-gorjeta');
const valorTotal = document.querySelector('.valor-total');
const btnCustom = document.querySelector('#custom');
const verificaPessoas = document.querySelector('#verifica-pessoas');
const valorPorcentAtualizado = document.querySelector('#input-values');

const limpaValorConta = () => {
  const valorLimpo = valorConta.value
  .replaceAll('.', '')
  .replace(',', '.')
  .replace('R$ ', '');
  return +valorLimpo;
};

const calculaGorPessoa = () => {
  const totalComPorcentPessoa = ((limpaValorConta() * valorPorcentAtualizado.value) / numPessoas.value);
  return totalComPorcentPessoa;
};

const calculaGorTotal = () => {
  const totalComPorcent = (limpaValorConta() * valorPorcentAtualizado.value);
  return totalComPorcent;
};

const atualizaInputValues = (valor = 0) => {
  valorPorcentAtualizado.value = valor;
};

const limpaCampos = () => {
  const btnReset = document.querySelector('.btn-reset');
  btnReset.addEventListener('click', event => {
    event.preventDefault();
    valorConta.value = '';
    numPessoas.value = '1';
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

const actives = (currentBtn) => {
  porcentagem.forEach(btn => {
    btn.classList.remove('active');
  });
  btnCustom.classList.remove('active');
  currentBtn.classList.add('active');
};

const eventosPorcentagem = () => {
  porcentagem.forEach(btn => {
    btn.addEventListener('click', event => {
      actives(btn);
      event.preventDefault();
      atualizaInputValues(btn.value);
      verificaValorConta();
      if(!verifica() || !verificaNumPessoas()) return;
      calculaPorcentagem();
    });
  });

  btnCustom.addEventListener('click', event => {
    event.preventDefault();
    atualizaInputValues();
    actives(btnCustom);
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