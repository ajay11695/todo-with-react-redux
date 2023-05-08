import { connect } from "react-redux";

function App(props) {

    function handleClick(event) {
      if (event.keyCode === 13 && event.target.value) {
        if(props.state.filter(t=>t.todo.includes(event.target.value)).length>0){
            props.dispatch({ type: "search", todo: event.target.value });
            event.target.value = "";
        }else{
            props.dispatch({ type: "add", todo: event.target.value });
            event.target.value = "";
        }
      
      }
    }
    function handleRemove({ target }) {
      let { id } = target.dataset;
      props.dispatch({ type: "remove", id: id });
    }
  
    function handleCompleted({ target }) {
      let { id, completed } = target.dataset;
      props.dispatch({ type: "toggle", isCompleted: completed === "false" ? true : false, id: id })
    }
    return <div className="p-12 w-[50%] m-auto">
      <h1 className="text-center text-5xl font-bold tracking-widest">Todo App</h1>
      <div className="bg-green-300 p-8 flex flex-col items-center mt-12 ">
        <input type="text" placeholder="Enter todo & Search todo" className="w-[100%] p-2 rounded" onKeyUp={handleClick}/>
        <div className="w-5/6 ">
          <ul>
            {
              props.state && props.state.map((t, i) => {
                return <li key={i} className="flex justify-between w-[100%] bg-red-200 my-3 items-center text-2xl px-2 py-1">
                  <input  type="checkbox" onClick={handleCompleted} data-id={i} data-completed={t.isCompleted} className="h-" checked={t.isCompleted ? true : false} />
                  <h2 className={t.isCompleted ? "capitalize line-through text-slate-500" : "capitalize"}>{t.todo}</h2>
                  <span className="cursor-pointer text-xl" onClick={handleRemove} data-id={i} >❌</span>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  }

  function getState(state) {
    return {
      state: [...state]
    }
  }
  
  export default connect(getState)(App);
