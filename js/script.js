{
    let tasks = [
    ];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent},
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    }

    const doneTask = (index) => {
        tasks = [
        ...tasks.slice(0, index),
        {...tasks[index], done: !tasks[index].done},
        ...tasks.slice(index + 1),
        ];
        render();
    }

    const hideTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const madeTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };


    const addRosol = () => {
        tasks = [
            ...tasks,
            {content: "Włoszczyzna"},
            {content: "3 udka z kurczaka"},
        ];
        render();
    }

    const addOgorkowa = () => {
        tasks = [
            ...tasks,
            {content: "Przecier z ogórków"},
            {content: "Śmietana 18%"},
        ];
        render();
    }

    const addBigos = () => {
        tasks = [
            ...tasks,
            {content: "Cebula"},
            {content: "Przecier pomidorowy"},
            {content: "Mięso - kiełbasa, boczek, schab"},
        ];
        render();
    }


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                doneTask(index); 
            });
        });

    }

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class ="
            list__item list__item--row ${task.done && hideDoneTasks ? " tasks__item--hidden" : ""}
                 ">
              <button 
                class="button_done_unchecked js-done"> ${task.done ?  "✓" : ""}</button 
              >
              <span class=" ${task.done ? " list__item--done" : ""}">
               ${task.content}</span>
              <button class="js-remove button__remove">🗑</button>
            </li>
            `;
        
        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {

        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
           buttonsElement.innerHTML = `
           <div>Lista zadań</div>`
           ;
           return;
    }

        buttonsElement.innerHTML = `
            <div class="new__buttons">
            Lista zadań
              <button class="small__buttons js-hide"> 
              ${hideDoneTasks ? "Pokaż" : "Ukryj"}  ukończone
              </button>
              <button 
              class=" small__buttons js-made ${ tasks.every(({ done }) => done) ? "disabled__button" : ""}" ${ tasks.every(({ done }) => done) ? "disabled" : ""}
              >Ukończ wszystkie</button>
            </div>
            `;
    };

    const bindButtonsEvents = () => {
        const hideButtons = document.querySelectorAll(".js-hide");

        hideButtons.forEach((hideButton, index) => {
            hideButton.addEventListener("click", () => {
                hideTasks(index); 
            });
        });

        const madeButtons = document.querySelectorAll(".js-made");

        madeButtons.forEach((madeButton, index) => {
            madeButton.addEventListener("click", () => {
                madeTasks(index); 
            });
        });
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}