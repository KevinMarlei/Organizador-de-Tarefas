const inputTarefa = document.querySelector('.tarefa');
const data = document.querySelector('.data');
const btnEnvio = document.querySelector('.enviar');

// seleção de elementos da caixa de tarefas
const textoTarefa = document.querySelector('.textoTarefa');
const inputData = document.querySelector('.inputData');
const btnChecado = document.querySelector('.checado');
const btnDeletar = document.querySelector('.deletar');
const caixaTarefas = document.querySelector('#caixaTarefas');
// criação dinâmica dos elementos das tarefas

btnEnvio.addEventListener('click', ()=>{
    const inputTarefaValue = inputTarefa.value;
    const dataValue = data.value;
    if(inputTarefaValue.trim()==='' || dataValue.trim()===''){
        alert('preencha adequadamente a tarefa e data.');
    }else{
        console.log(inputTarefaValue);
        console.log(dataValue);
        inputTarefa.value = '';
        data.value = ''
        inputData.value = dataValue;
        guardarLocalStorage(inputTarefaValue, dataValue);
        inputTarefa.focus();
        
        criarTarefa(inputTarefaValue, dataValue);
    }  
})

function criarTarefa(tarefa, data){
        const novaTarefa = document.createElement('div');
        novaTarefa.classList.add('tarefasCriadas');
    
        const novoTextoTarefa = document.createElement('p');
        novoTextoTarefa.classList.add('textoTarefa');
        novoTextoTarefa.textContent = tarefa;
    
        const dataRecebida = document.createElement('input');
        dataRecebida.classList.add('inputData');
        dataRecebida.readOnly = true;
        dataRecebida.value = data;

        const btnCheck = document.createElement('button');
        btnCheck.classList.add('icone', 'checado');

      
        const btnDelet = document.createElement('button');
        btnDelet.classList.add('icone', 'deletar');
        
        // textAREA
        const detalheTarefa = document.createElement('div');
        detalheTarefa.classList.add('detalheTarefa');
        
        const textArea = document.createElement('textarea');
        textArea.classList.add('detalhe');
        textArea.cols = '40';
        textArea.rows = '3';
        
        novaTarefa.appendChild(novoTextoTarefa);
        novaTarefa.appendChild(dataRecebida);
        // novaTarefa.appendChild(btnCheck);
        novaTarefa.appendChild(btnDelet);
        // detalheTarefa.appendChild(textArea);
        
        caixaTarefas.appendChild(novaTarefa);
        // caixaTarefas.appendChild(detalheTarefa);

        deletarTarefa(btnDelet, novaTarefa, detalheTarefa);
        btnCheckMudarCor(btnCheck, textArea, novaTarefa);
    }

function deletarTarefa(btnDelet,novaTarefa, detalheTarefa){
    const btnDeletClick = btnDelet;
    btnDeletClick.addEventListener('click', ()=>{
        novaTarefa.remove();
        detalheTarefa.remove();
        deletarLocalStorage(novaTarefa);
    });

}

function deletarLocalStorage(novaTarefa){
    const LocalStorage = localStorage.getItem('agenda');
    let objeto;
   
    if(LocalStorage){
        objeto = JSON.parse(LocalStorage);
        if(novaTarefa && novaTarefa.textContent){

            objeto = objeto.filter(tarefa => tarefa.descricao !== novaTarefa.textContent);
            localStorage.setItem('agenda', JSON.stringify(objeto))
        }else{
            console.error('Falhou');
        }
    }
}

function btnCheckMudarCor(btnCheck, textArea, novaTarefa){
    btnCheck.addEventListener('click', ()=>{
        
        if(btnCheck.style.backgroundColor === 'green'){
            btnCheck.style.backgroundColor = '';
            textArea.readOnly = false;
            novaTarefa.style.opacity = 1;                          
        }else{
            btnCheck.style.backgroundColor = 'green';
            textArea.readOnly = true;
            novaTarefa.style.opacity = 0.4;  
        }
    });
}

function guardarLocalStorage(inputTarefaValue, dataValue){
    // verifica se já existe algo no localStorage
   const memoriaLocalStorage = localStorage.getItem('agenda');
//    const objeto = memoriaLocalStorage ? JSON.parse(memoriaLocalStorage) : [];

// converte para Array
    let objeto;
    if(memoriaLocalStorage){
        objeto = JSON.parse(memoriaLocalStorage)
    }else{
        objeto = [];
    }
    // adiciona o novo objeto ao array
    objeto.push({
        descricao: inputTarefaValue,
        data: dataValue,
    });
    localStorage.setItem('agenda', JSON.stringify(objeto));
}


const exibir = localStorage.getItem('agenda');
const btnTrue = localStorage.getItem('btnCheckState');
if(exibir){
    const arrayObjetos = JSON.parse(exibir);
    arrayObjetos.forEach(objeto => {
        
        criarTarefa(objeto.descricao, objeto.data);
    }); 
}

