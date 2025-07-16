# react-task

Таск трекер для создания, отображения и редактирования задач с возможностью фильтрации по категориям, статусу и приоритету. Построен с использованием React, TypeScript, Vite и Material UI (MUI). Данные хранятся в localStorage.

## Технологии

- React
- TypeScript
- Vite
- Material UI (MUI)
- CSS Grid

## Архитектура проекта
Эта структура построена по принципам FSD (Feature-Sliced Design) — архитектурного подхода к проектированию фронтенд-приложений. Он разделяет проект на логические слои:

<img width="693" height="591" alt="image" src="https://github.com/user-attachments/assets/f9eaf026-9b0e-4e4a-9a89-d9651d497b92" />


Вся логика управления задачами вынесена в стор, содержащий:
addTask() — добавление задачи
updateTask(id) — редактирование задачи
deleteTask(id) — удаление задачи
loadTasks() и saveTasks() — взаимодействие с localStorage




## Компоненты
TaskList
- Отображает задачи в виде адаптивной сетки (Grid).
- Каждая задача — TaskItem.

TaskItem
Карточка задачи с:
- Заголовком
- Описанием (опционально)
-Метками:
  -Категория: Bug / Feature / Documentation / Refactor / Test
  - Статус: To Do / In Progress / Done
  - Приоритет: Low / Medium / High
-Датой создания
-Кнопкой удаления
-Кнопкой редактировая (открывает форму редактирования /task/:id.)

СreateTaskForm и TaskDetails
Формы создания и редактирования задачи соответственно




