
import React from 'react';

import Task from './Task';
import PropTypes from "prop-types";

export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
    const events = {
        onPinTask,
        onArchiveTask,
    };
    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
        </div>
    );
    if (loading) {
        return (
            <div className="list-items" data-testid="loading" key={"loading"}>
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }
    if (tasks.length === 0) {
        return (
            <div className="list-items" key={"empty"} data-testid="empty">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <p className="title-message">할일 목록이 없습니다</p>
                    <p className="subtitle-message">휴식을 취하셔도 좋아요</p>
                </div>
            </div>
        );
    }

    const tasksInOrder = [
        ...tasks.filter((t) => t.state === 'TASK_PINNED'),
        ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    return (
        <div className="list-items">
            {tasksInOrder.map((task) => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}

TaskList.prototype = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.prototype.task).isRequired,
    onPinTask: PropTypes.func,
    onArchiveTask: PropTypes.func,
}
TaskList.defaultProps = {
    loading: false,
}