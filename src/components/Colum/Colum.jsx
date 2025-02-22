/* eslint-disable react/prop-types */
import { Task } from "../Task/Task";
import "./Colum.css";
import {
  horizontalListSortingStrategy,
  SortableContext,
  //   verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Colum = ({ tasks }) => {
  return (
    <div className="column  w-full">
      <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
        <div className="w-full  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {tasks.map((task) => (
            <Task key={task._id} id={task._id} task={task} />
            // console.log(task)
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Colum;
