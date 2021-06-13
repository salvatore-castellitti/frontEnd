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

let bookButton = {
  customCssClass: null,
  text: 'Book',
  icon: 'lock',
}


let actions = [bookButton]

export var tableConfig_Vehicle_Customer = {
  headers: [
    {key: "type", label: "Type",},
    {key: "houseProducer", label: "House Producer",},
    {key: "model", label: "Model",},
    {key: "taxCode", label: "Tax Code",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
