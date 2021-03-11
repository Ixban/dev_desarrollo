<template>
  <div>
    <div id="screen" class="screen">
      <div class="col-lg-12 col-md-offset-2">
        <div class="row">
          <div class="col-lg-6">
            <div class="card" style="border: 1px solid rgb(0 0 0 / 50%)">
              <div id="menubar">
                <div class="mac-btn" id="mac-btn-one"></div>
                <div class="mac-btn" id="mac-btn-two"></div>
                <div class="mac-btn" id="mac-btn-three"></div>
              </div>
              <div
                class="card-header"
                style="background-color: rgb(41 60 88 / 42%)"
              >
                <div style="margin-left: 50px">Elementos Existentes</div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <div class="auto" id="auto" style="display: none">
                    <!-- Contador -->
                    {{ (i = 0) }}
                  </div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Texto</th>
                        <th scope="col">Source</th>
                        <th scope="col">Source URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Recorrido al arreglo Items -->
                      <tr v-for="Element of items">
                        <td>{{ (i = i + 1) }}</td>
                        <td>{{ Element.id }}</td>
                        <td>{{ Element.text }}</td>
                        <td>{{ Element.source }}</td>
                        <td>{{ Element.source_url }}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                          <!-- Definir funcion Boton Borrar -->
                          <button
                            @click="Delete(Element._id)"
                            class="btn btn-danger"
                          >
                            Eliminar
                          </button>
                          <!-- Definir Editar Boton Borrar -->
                          <button
                            @click="Edit(Element._id)"
                            class="btn btn-secondary"
                          >
                            Editar
                          </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div
              class="card my-fixed-item"
              style="width: 28rem; border: 1px solid rgb(0 0 0 / 50%)"
            >
              <div id="menubar">
                <div class="mac-btn" id="mac-btn-one"></div>
                <div class="mac-btn" id="mac-btn-two"></div>
                <div class="mac-btn" id="mac-btn-three"></div>
              </div>
              <div
                class="card-header"
                style="background-color: rgb(41 60 88 / 42%)"
              >
                <div style="margin-left: 50px">Generar</div>
              </div>
              <div class="card-body">
                <form accept-charset="UTF-8" @submit.prevent="getAPI">
                  <fieldset>
                    <div class="form-group" style="margin-bottom: 5px">
                      <label for="Label1">ID</label>
                      <input
                        class="form-control"
                        placeholder="Id"
                        name="ID"
                        type="text"
                        v-model="model.id"
                      />
                    </div>

                    <div class="form-group" style="margin-bottom: 5px">
                      <label for="Label1">Texto</label>
                      <input
                        class="form-control"
                        placeholder="Text"
                        name="Texto"
                        type="text"
                        v-model="model.text"
                      />
                    </div>

                    <div class="form-group" style="margin-bottom: 5px">
                      <label for="Label1">Source</label>
                      <input
                        class="form-control"
                        placeholder="Source"
                        name="Source"
                        type="text"
                        v-model="model.source"
                      />
                    </div>

                    <div class="form-group" style="margin-bottom: 5px">
                      <label for="Label1">Source</label>
                      <input
                        class="form-control"
                        placeholder="Source_URL"
                        name="Source_URL"
                        type="text"
                        v-model="model.source_url"
                      />
                    </div>

                    <div
                      class="form-group"
                      style="margin-bottom: 5px; margin-top: 15px"
                    >
                      <template v-if="edit === false">
                        <button
                          class="btn btn-lg btn-success btn-block"
                          value="Login"
                        >
                          <span
                            class="glyphicon btn-glyphicon glyphicon-plus img-circle text-success"
                          ></span>
                          Generar
                        </button>
                      </template>

                      <template v-else="edit === true">
                        <button
                          class="btn btn-lg btn-success btn-block"
                          value="Login"
                        >
                          <span
                            class="glyphicon btn-glyphicon glyphicon-plus img-circle text-success"
                          ></span>
                          Actualizar
                        </button>
                      </template>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

//crear clase del modelo
class Model {
  constructor(id, text, source, source_url) {
    this.id = id;
    this.text = text;
    this.source = source;
    this.source_url = source_url;
  }
}

//Crear Modulos de funciones
export default {
  data() {
    return {
      model: new Model(),
      items: [],
      edit: false,
      itemEdit: "",
    };
  },

//Funcion created
  created() {
    this.GetElements();
  },

  methods: {

    //Obtiene la informacion de una API, dependiento del valor Edit editara el registro
    getAPI() {
      if (this.edit === false) {
        fetch("https://uselessfacts.jsph.pl/random.json")
          .then((res) => res.json())
          .then((data) => {
            this.model.id = data.id;
            this.model.text = data.text;
            this.model.source = data.source;
            this.model.source_url = data.source_url;
            console.log(data);
            this.SaveItem();
          });
      } else {
        fetch("/api/update/" + this.itemEdit, {
          method: "PUT",
          body: JSON.stringify(this.model),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.GetElements();
            this.model.id = "";
            this.model.text = "";
            this.model.source = "";
            this.model.source_url = "";
            this.edit = false;
          });
      }
    },

    //Obtienen todos los registros de la base de datos
    GetElements() {
      fetch("/api/get")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.items = data;
        });
    },

    //Editar el registro
    Edit(id) {
      fetch("/api/getId/" + id)
        .then((res) => res.json())
        .then((data) => {
          this.model = new Model(
            data.id,
            data.text,
            data.source,
            data.source_url
          );
          this.edit = true;
          this.itemEdit = data._id;
          console.log(data);
        });
    },

    //Eliminar los registros
    Delete(id) {
      fetch("/api/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.GetElements();
          this.edit = false;
        });
    },

    //Guardar nuevo Elemento
    SaveItem() {
      fetch("/api/add", {
        method: "POST",
        body: JSON.stringify(this.model),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.GetElements();
        });
    },
  },
};
</script>