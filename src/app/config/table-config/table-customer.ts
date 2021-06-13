export class TableCustomer{
  tableConfig = {
    headers: [
      {key: "name", label: "First Name",},
      {key: "surname", label: "Last Name",},
      {key: "taxCode", label: "Tax Code",},
    ],
    order: order,
    search: search,
    pagination: pagination,
    actions: actions
  }
}

let pagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4,8,12]
}

let order = {
  defaultColumn: "name",
  orderType:"asc"
}

let search = {
  columns: ["name", "surname"]
}

let deleteButton = {
  customCssClass: null,
  text: 'Delete',
  icon: 'delete',
}

let updateButton = {
  customCssClass: null,
  text: 'Update',
  icon: 'settings',
}

let actions = [updateButton,deleteButton]

export var tableConfig = {
  headers: [
    {key: "id", label: "Id",},
    {key: "name", label: "Name",},
    {key: "surname", label: "Surname",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
