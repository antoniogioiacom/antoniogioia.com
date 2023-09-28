import Draggable from "react-draggable";
import BlockCode from "./block-code";
import BlockRender from "./block-render";

export default (props) => {
  const onStartHandler = (e) => {
    let editors = document.getElementsByClassName("editor");
    let zindexes = [1];
    for (let i = 0; i < editors.length; i++) {
      zindexes.push(Number(editors[i].style.zIndex));
    }
    let higher = Math.max.apply(0, zindexes);
    e.currentTarget.style.zIndex = Number(higher) + 1;
  };

  return (
    <Draggable onStart={onStartHandler}>
      <div className={props.classes} draggable="auto">
        <span className="control"></span>
        <span className="control"></span>
        <span className="control"></span>
        {props.content === "code" ? (
          <BlockCode className="line-numbers" source={props.source} />
        ) : (
          <BlockRender />
        )}
      </div>
    </Draggable>
  );
};
