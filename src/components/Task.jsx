import PropTypes from "prop-types";

export default function Task({
  task: { id, title, state },
  onPinTask,
  onArchiveTask,
}) {
  return (
    <div className={`list-item ${state}`}>
      <label htmlFor="checked" className="checkbox">
        <input type="checkbox" name="checked" id={`archiveTask-${id}`} />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          aria-label={`archiveTask-${id}`}
        ></span>
      </label>
      <label htmlFor="title" className="title" aria-label="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input Title"
        />
      </label>
      {state !== "TASK_ARCHIVED" && (
        <button
          className="pin-button"
          id={`pinTask-${id}`}
          aria-label={`pinTask-${id}`}
          onClick={() => onPinTask(id)}
        >
          <span className="icon-star"></span>
        </button>
      )}
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    onPinTask: PropTypes.func,
    onArchiveTask: PropTypes.func,
  }),
};
