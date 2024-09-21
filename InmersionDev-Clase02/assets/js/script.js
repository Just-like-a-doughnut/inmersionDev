let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripciones = [];
let modoEdicion = false;

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    if (valorGasto > 150) {
        alert("Estás registrando un gasto mayor a 150 dólares.")
    }

    if (descripcionGasto == '') {
        descripcionGasto = "Ninguna";
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripciones.push(descripcionGasto);

    console.log(listaDescripciones);
    
    actualizarListaGasto();
}

function actualizarListaGasto() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripciones[posicion];
        htmlLista += `<li>${elemento} - USD ${valorGasto} - Descripción: ${descripcionGasto}
                        <div>
                            <button id="botonEditar" onclick="editarGasto(${posicion});">Editar</button>
                            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                        </div>
                        </li>`;
        totalGastos += Number(valorGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function editarGasto(posicion) {
    let nombreGasto = document.getElementById('nombreGasto');
    let valorGasto = document.getElementById('valorGasto');
    let descripcionGasto = document.getElementById('descripcionGasto');

    nombreGasto.value = listaNombresGastos[posicion];
    valorGasto.value = listaValoresGastos[posicion];
    if (listaDescripciones[posicion] == 'Ninguna') {
        descripcionGasto.value = '';
    } else {
        descripcionGasto.value = listaDescripciones[posicion];
    }

    // Agregar un botón "Guardar" para implementar los cambios
    const botonGuardar = document.createElement('button');
    botonGuardar.textContent = 'Guardar cambios';
    botonGuardar.onclick = () => {
        // Obtener los nuevos valores (cambios que realice el usuario en los inputs)
        const nuevoNombreGasto = document.getElementById('nombreGasto').value;
        const nuevoValorGasto = document.getElementById('valorGasto').value;
        const nuevaDescripcionGasto = document.getElementById('descripcionGasto').value;

        // Actualizar los arrays de nombre, valor y descripción de gastos
        listaNombresGastos[posicion] = nuevoNombreGasto;
        listaValoresGastos[posicion] = nuevoValorGasto;
        listaDescripciones[posicion] = nuevaDescripcionGasto;

        // Actualizar la lista de gastos
        actualizarListaGasto();

        // Ocultar el botón "Guardar" y limpiar los inputs
        botonGuardar.remove();
        botonCancelar.remove();

        modoEdicion = false;
        document.getElementById('botonFormulario').disabled = false;
        document.getElementById('botonEditar').disabled = false;
        limpiar();
    };

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.onclick = () => {
        // Ocultar el botón "Guardar" y "Cancelar"
        botonGuardar.remove();
        botonCancelar.remove();

        // Restablecer los valores de los inputs a los originales
        document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
        document.getElementById('valorGasto').value = listaValoresGastos[posicion];
        document.getElementById('descripcionGasto').value = listaDescripciones[posicion];

        // Habilitar el botón "Agregar gasto"
        modoEdicion = false;
        document.getElementById('botonFormulario').disabled = false;
        document.getElementById('botonEditar').disabled = false;
        limpiar();
    };

    // Agregar el botón al DOM (por ejemplo, después del input de descripción)
    document.getElementById('descripcionGasto').parentNode.appendChild(botonGuardar);
    document.getElementById('descripcionGasto').parentNode.appendChild(botonCancelar);

    modoEdicion = true; // Activar modo edición

    // Deshabilitar el botón "Agregar gasto" para evitar confusiones al momento de editar
    document.getElementById('botonFormulario').disabled = true;
    document.getElementById('botonEditar').disabled = true;
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGasto();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}