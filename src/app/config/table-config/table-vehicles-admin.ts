import {CustomTableComponent} from "../../custom-component/custom-table/custom-table.component";

let pagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4,8,12]
}

let order = {
  defaultColumn: "type",
  orderType:"asc"
}

let search = {
  columns: ["id", "type", "houseProducer", "model"]
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

export var tableConfig_Vehicle = {
  headers: [
    {key: "id", label: "Id",},
    {key: "type", label: "Type",},
    {key: "houseProducer", label: "Huse Producer",},
    {key: "model", label: "Model",},
    {key: "licensePlate", label: "License Plate",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
