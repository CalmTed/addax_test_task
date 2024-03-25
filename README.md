### PLAN
- [x] plan minimum needed state and components
- [x] create layout(header, body)
    - [x] header (title, search input)
    - [x] body (month-year title, grid, grid scrolling buttons)
- [x] reduser state managment
- [x] add/remove/modify tasks
- [x] fetch holidays from API
- [x] add reordering with d&d
    - [x] reorder inside wrapper
    - [x] reassign tasks between days
- [x] filtering tasks by filter input value

#### constraints
- no time zones (use browser time and zone)
- no animations
- no localStorage for now
- no week or day view, it would be nice but no

## STATE
    version: string
    selectedMonth: number // timestamp
    tasks: TaskModel[]
    filterText: string
    holidays: TaskModel[]

```
TaskModel{
    id: number
    order: number //for consistent reorder inside one cell
    isEditable: bool // for holidays
    isCompleted: bool
    planedDate: number
    labelText: string
}
```

### LOG
- 2024-03-22
    - 0920 plan
    - 0955 layout style & header & body
    - 1206 layout grid & state manager
    - 1811 scroll calendar & show month title
- 2024-03-25
    - 1038 edit tests list
    - 1359 fetching holidays and adding them as fixed
    - 1440 reordering with d&d
    - 1617 filtering tasks
    - 1620 done
