let pagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4,8,12]
}

let order = {
  defaultColumn: "firstName",
  orderType:"asc"
}

let search = {
  columns: ["firstName", "lastName"]
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

export var tableConfig = {
  headers: [
    {key: "id", label: "Id",},
    {key: "firstName", label: "Name",},
    {key: "lastName", label: "Surname",},
    {key: "username", label: "Username",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
