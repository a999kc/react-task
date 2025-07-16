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

src/
├── app/                        # Инициализация приложения
│   ├── App.tsx                 # Корневой компонент
│   ├── store.ts                # Создание стора (state management)
│   ├── persistStorage.ts       # Работа с localStorage
│            
│
├── entities/                   # Сущности 
│   └── task/
│       ├── api.ts              # API-интерфейсы
│       └── types.ts            # Типизация сущности задачи
│
├── features/                   # Отдельные фичи 
│   ├── models/
│   │   └── taskSlice.ts        # Slice Redux
│   └── ui/
│       ├── CreateTaskForm.tsx  # Форма создания
│       ├── Header.tsx          # Заголовок
│       ├── TaskDetails.tsx     # Страница редактирования
│       ├── TaskItem.tsx        # Карточка задачи
│       └── TaskList.tsx        # Список задач
│
├── pages/                      # Страницы (Pages Layer)
│   └── ...                     # Комбинируют фичи и сущности в страницы
│
├── shared/                     # Переиспользуемые части (Shared Layer)
│   ├── styles/
│   │   ├── normalize.css       # Сброс стилей
│   │   └── theme.ts            # Темизация/переменные
│   └── ui/
│       └── logo.svg            # Общие иконки, компоненты и т.п.


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




