var app = {
    todosList: [
      {
        text: 'Réviser JS',
        done: true,
      },
      {
        text: 'Réviser React',
        done: false,
      },
      {
        text: 'Apprendre Java',
        done: false,
      },      
      {
        text: 'Apprendre NodeJS',
        done: false,
      }
    ],

/* Je vais ici créer les différentes zones que je vais palcer dans ma div #todo 
    et j'ajoute le formulaire le compteur et la liste que je vais définir par la suite 
*/

    init: function () {
        app.todo = document.getElementById('todo');
        app.todo.innerHTML = '';
        app.createForm();
        app.createCount();
        app.createList();
      },

/* Je vais ici créer mon formulaire avec un input a l'intérieur. 
    Je vais ensuite créer dans mon app un id sur mon input pour y accéder en dehors de cette fonction.
    addEventListener vas me permettre de réagir au submit du form.
*/

    createForm: () => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        app.input = input;
        input.id = 'todo-input';
        input.placeholder = "Ajouter une tâche";
        form.addEventListener('submit', app.addItem);    
        form.appendChild(input);
        app.todo.appendChild(form);
    },

/* Je crée ici mon compteur */

    createCount: () => {
        app.counter = document.createElement('div');
        app.counter.id = 'todo-counter';
        app.updateCounter();
        app.todo.appendChild(app.counter);
    },

/* Je vais ici créer ma list dans un ul puis lui ajouter un id pour la modifier en css.
    Puis générer automatquement ma liste a partir du tableau qui se trouve dans app.todosList
*/

    createList: () => {
        app.list = document.createElement('ul');
        app.list.id = 'todo-list';
        app.todosList.forEach((todoObject) => {
        app.generateItem(todoObject);
    });
        app.todo.appendChild(app.list);
    },

    addItem: (evt) => {
        evt.preventDefault();
        const text = app.input.value;
    app.todosList.push({
      text: text,
      done: false,
    });
    app.init();
    app.input.value = '';
    app.updateCounter();
    },
    
    generateItem: (objectTodo) => {
        const { text: todoText, done } = objectTodo;
        const item = document.createElement('li');
        item.className = done ? 'todo todo--done' : 'todo';
    
        // Je veux faire une checkbox
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = done;
        check.addEventListener('change', (evt) => {
          objectTodo.done = !done;
          app.init();
        });
    
        // Je veux un texte de todo
        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = todoText;
    
        // Je veux mettre la checkbox et le texte dans le li
        item.appendChild(check);
        item.appendChild(text);
        // Je veux mettre le li dans le ul
        app.list.appendChild(item);
      },
      updateCounter: () => {
        // Trouver toutes les todos qui n'ont pas la class todo--done
        const total = app.todosList.filter(todo => !todo.done).length;
        let message;
        switch (total) {
          case 0:
            message = "0 tâche en cours";
            break;
          case 1:
            message = "1 tâche en cours"
            break;
          default:
            message = total + " tâches en cours"
            break;
        }
        app.counter.textContent = message;
      }
    }; 
document.addEventListener('DOMContentLoaded', app.init);
    