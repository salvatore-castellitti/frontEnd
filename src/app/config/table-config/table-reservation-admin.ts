
let pagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4,8,12]
}

let order = {
  defaultColumn: "type",
  orderType:"asc"
}

let search = {
  columns: ["customer", "startDate", "endDate", "vehicle"]
}

let deleteButton = {
  customCssClass: 'btn btn-danger',
  text: 'Delete',
  icon: 'delete',
}

let approveButton = {
  customCssClass: 'btn btn-success',
  text: 'Approve',
  icon: 'done',
}

let actions = [approveButton ,deleteButton]

export var tableConfig_Reservation = {
  headers: [
    {key: "id", label: "Id",},
    {key: "user", label: "Customer",},
    {key: "startDate", label: "Start Date",},
    {key: "endDate", label: "End Date",},
    {key: "vehicle", label: "Vehicle",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
