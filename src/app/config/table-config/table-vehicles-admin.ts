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

export var tableConfig_Vehicle = {
  headers: [
    {key: "id", label: "Id",},
    {key: "type", label: "Type",},
    {key: "houseProducer", label: "Huse Producer",},
    {key: "model", label: "Model",},
    {key: "taxCode", label: "Tax Code",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
