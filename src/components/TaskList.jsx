import React from 'react';

import Task from './Task';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {updateTaskState} from "../lib/store.js";

export default function TaskList() {

    const tasks = useSelector((state) => {
        const tasksInOrder = [
            ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
            ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
        ];

        const filteredTasks = tasksInOrder.filter(
            (t) => t.state === 'TASK_INBOX' || t.state === "TASK_PINNED"
        );
        return filteredTasks;
    });

    const { status } = useSelector((state) => state.taskbox);

    const dispatch = useDispatch();

    const pinTask = (value) => {
        dispatch(updateTaskState({id: value, newTaskState: 'TASK_PINNED'}))
    }

    const archiveTask = (value) => {
        dispatch(updateTaskState({id: value, newTaskState: 'TASK_ARCHIVED'}))
    }

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox"/>
            <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
        </div>
    );

    if (status === 'loading'){
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
                    <span className="icon-check"/>
                    <p className="title-message">할일 목록이 없습니다</p>
                    <p className="subtitle-message">휴식을 취하셔도 좋아요</p>
                </div>
            </div>
        );
    }

    return (
        <div className="list-items" data-testid="success" key={"success"}>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onArchiveTask={(task) => archiveTask(task)}
                    onPinTask={(task)=> pinTask(task)}
                />
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