
let pagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4,8,12]
}

let order = {
  defaultColumn: "type",
  orderType:"asc"
}

let search = {
  columns: ["startDate", "endDate", "vehicle"]
}

let deleteButton = {
  customCssClass: 'btn btn-danger btn-sm',
  text: 'Delete',
  icon: 'delete',
}

let updateButton = {
  customCssClass: 'btn btn-primary btn-sm',
  text: 'Update',
  icon: 'settings',
}


let actions = [updateButton,deleteButton]

export var tableConfig_Reservation_Customer = {
  headers: [
    {key: "startDate", label: "Start Date",},
    {key: "endDate", label: "End Date",},
    {key: "vehicle", label: "Vehicle",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
